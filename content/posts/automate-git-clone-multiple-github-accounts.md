---
title: "Automate Git Clone for Multiple GitHub Accounts with a Simple Shell Wrapper"
date: "2026-02-20"
tags: ["Git", "SSH", "Zsh", "Shell Scripting", "Automation"]
categories: ["Software Development", "Git", "Automation", "Shell"]
description: "A simple zsh function that automatically rewrites remote URLs and sets the correct SSH key and git identity when cloning repos from different GitHub accounts."
---

If you work with multiple GitHub accounts — say one for work and one for personal projects — you've probably run into this: you clone a repo, push a commit, and realize it went out with the wrong email. Or worse, authentication fails because SSH picked the wrong key.

In a [previous post](/posts/mastering-multiple-ssh-keys), I covered how to set up multiple SSH keys with host aliases in your `~/.ssh/config`. That solves the authentication problem, but it still requires you to remember to use the right host alias every time you clone and manually configure `user.email` afterward.

In this post, I'll show you how to automate all of that with a simple zsh function.

## The Problem

Let's say you have two GitHub accounts with SSH configured like this:

```
# ~/.ssh/config

Host work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
    IdentitiesOnly yes

Host personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_personal
    IdentitiesOnly yes
```

This works great — but only if you remember to clone using the alias:

```bash
# This uses the correct key
git clone git@personal:myuser/my-repo.git

# This does NOT — SSH doesn't know which key to use
git clone git@github.com:myuser/my-repo.git
```

And even when you clone correctly, you still need to set the local git identity:

```bash
cd my-repo
git config user.email "me@personal.com"
git config user.name "My Name"
```

Forget any of these steps and you end up with commits under the wrong identity or failed pushes. It's a small friction that adds up.

## The Solution: A Git Clone Wrapper

The idea is simple: override the `git` command in your shell with a function that intercepts `clone` commands, detects which account the repo belongs to, and rewrites the URL automatically.

Add this to your `~/.zshrc`:

```bash
git() {
    if [[ "$1" == "clone" ]]; then
        local url="$2"
        local repo_path=""
        local ssh_host=""
        local label=""
        local set_email=""
        local set_name=""

        # Detect account from URL (case-insensitive)
        local url_lower="${url:l}"
        if [[ "$url_lower" == *"my-personal-org"* ]]; then
            ssh_host="personal"
            label="personal"
            set_email="me@personal.com"
            set_name="My Name"
        elif [[ "$url_lower" == *"my-work-org"* ]]; then
            ssh_host="work"
            label="work"
            set_email="me@company.com"
            set_name="My Name"
        fi

        # No match — pass through unchanged
        if [[ -z "$ssh_host" ]]; then
            command git "$@"
            return $?
        fi

        # Already using the correct host alias
        if [[ "$url" == git@${ssh_host}:* ]]; then
            command git "$@"
            local ret=$?
            if [[ $ret -eq 0 ]]; then
                repo_path="${url#git@${ssh_host}:}"
                repo_path="${repo_path%.git}"
                local dir="${3:-$(basename "$repo_path")}"
                command git -C "$dir" config user.email "$set_email"
                command git -C "$dir" config user.name "$set_name"
                echo "Set local git user to $set_email"
            fi
            return $ret
        fi

        # Extract org/repo from HTTPS or SSH URLs
        if [[ "$url" == https://github.com/* ]]; then
            repo_path="${url#https://github.com/}"
            repo_path="${repo_path%.git}"
        elif [[ "$url" == git@github.com:* ]]; then
            repo_path="${url#git@github.com:}"
            repo_path="${repo_path%.git}"
        else
            command git "$@"
            return $?
        fi

        local rewritten="git@${ssh_host}:${repo_path}.git"
        echo "Rewriting remote URL for ${label} account:"
        echo "  ${url} -> ${rewritten}"

        # Forward any extra args (target dir, --depth, etc.)
        shift 2
        command git clone "$rewritten" "$@"
        local ret=$?

        if [[ $ret -eq 0 ]]; then
            local dir="${1:-$(basename "$repo_path")}"
            command git -C "$dir" config user.email "$set_email"
            command git -C "$dir" config user.name "$set_name"
            echo "Set local git user to $set_email"
        fi
        return $ret
    else
        command git "$@"
    fi
}
```

## How It Works

The function does the following whenever you run `git clone`:

1. **Matches the org/username** in the URL against your known accounts using case-insensitive matching
2. **Rewrites the remote URL** from `git@github.com:org/repo.git` (or HTTPS) to `git@<ssh-host-alias>:org/repo.git`
3. **Clones the repo** using the rewritten URL, which routes through the correct SSH key via your `~/.ssh/config`
4. **Sets `user.email` and `user.name`** locally in the cloned repo so commits go out with the right identity
5. **Passes through** any non-matching URLs or non-clone commands untouched

The key line is `command git` — this calls the real `git` binary instead of recursing into the wrapper function.

## Usage

Once the function is in your `~/.zshrc` and you reload your shell (`source ~/.zshrc`), just clone normally:

```bash
# Paste any URL format — it just works
git clone https://github.com/my-personal-org/some-repo.git
git clone git@github.com:my-work-org/another-repo.git
```

Output:

```
Rewriting remote URL for personal account:
  https://github.com/my-personal-org/some-repo.git -> git@personal:my-personal-org/some-repo.git
Cloning into 'some-repo'...
Set local git user to me@personal.com
```

No extra steps. The correct SSH key is used and the local git identity is configured automatically.

## Extending It

Adding a new account is just adding another `elif` block:

```bash
elif [[ "$url_lower" == *"freelance-client"* ]]; then
    ssh_host="freelance"
    label="freelance"
    set_email="me@freelance.com"
    set_name="My Name"
```

Just make sure you have a matching host alias in `~/.ssh/config`.

## Why Not Use Git's `insteadOf` Config?

Git supports URL rewriting via `insteadOf`:

```bash
git config --global url."git@personal:".insteadOf "git@github.com:"
```

The problem is that this rewrites **all** `git@github.com` URLs globally — you can't scope it to a specific org. If you have multiple accounts on the same host, `insteadOf` won't help you distinguish between them.

The shell wrapper approach gives you per-org control with zero ambiguity.

## Wrapping Up

This is a small quality-of-life improvement, but it removes an entire class of mistakes. No more wrong emails in commit history, no more failed pushes, and no more manual `git config` after every clone.

Pair this with the SSH config from [Mastering Multiple SSH Keys](/posts/mastering-multiple-ssh-keys) and you'll have a setup that handles multiple GitHub accounts seamlessly.
