---
title: "Git Reset --soft: The Simplest Way to Squash Commits"
date: "2026-03-04"
tags: ["Git", "Version Control", "Workflow", "Developer Tools"]
categories: ["Software Development", "Git", "Tutorials"]
description: "Learn how git reset --soft lets you squash multiple commits into one clean commit without interactive rebase, editors, or merge conflicts."
---

You've been working on a feature branch. Nine commits deep, one per fix, nice and organized during development. But now it's PR time, and your reviewer doesn't want to wade through nine commits just to understand what changed. You need one clean commit.

If you've ever used `git rebase -i` for this, you know the drill: open an editor, mark commits as `squash` or `fixup`, resolve conflicts that pop up at each step, and hope you don't accidentally drop something important.

There's a simpler way. Enter `git reset --soft`.

---

## How Git Tracks Changes

Before we get into the trick, let's quickly review how Git organizes your code. Git has three "areas" where your changes live:

1. **Working directory**: your actual files on disk, what you see in your editor.
2. **Staging area (index)**: what's queued up and ready for the next commit.
3. **HEAD**: the last commit on your current branch.

When you run `git commit`, Git takes everything in the staging area and creates a new commit, moving HEAD forward. Think of it like a conveyor belt. Files move from your editor, to the staging area, and finally into a commit.

---

## The Three Flavors of Reset

`git reset` moves HEAD backward to a previous commit. The flag you pass determines what happens to the changes from the "removed" commits:

- **`--hard`**: Throws away everything. Working directory and staging area are wiped clean. Destructive. Handle with care.
- **`--mixed`** (default): Keeps changes in your working directory but unstages them. You'd need to `git add` again.
- **`--soft`**: Keeps changes staged and ready to commit. Your working directory is untouched.

That last one is the key. With `--soft`, Git only moves the HEAD pointer. Your files and staging area stay exactly as they are. All those changes are still there, just waiting to be committed again as one.

---

## Squashing With --soft

Say your branch looks like this:

```
A - B - C - D - E - F - G - H - I - J
        ^                           ^
    base commit                   HEAD
    (0bdf85c)               (9 commits later)
```

Commits C through J are your nine feature commits. You want them as one.

```bash
git reset --soft 0bdf85c
```

Now your history looks like this:

```
A - B
    ^
   HEAD
```

But here's the catch: every change from C through J is **still staged**. Git didn't touch your files or the index. It only moved the HEAD pointer backward.

Now commit:

```bash
git commit -m "Add user authentication with OAuth2 support"
```

```
A - B - K
        ^
       HEAD
```

Commit K contains the exact same file changes as C+D+E+F+G+H+I+J combined. One commit, clean history. That's it.

---

## The Full Squash Workflow

Here's the workflow I use every time I need to clean up a branch before opening a PR:

```bash
# 1. Create a new branch (so you don't lose the original commits)
git checkout -b clean-branch original-branch

# 2. Reset back to the base commit, keeping all changes staged
git reset --soft <base-sha>

# 3. Commit everything as one
git commit -m "your squashed commit message"

# 4. Push
git push -u origin clean-branch
```

### Key points:

- **Step 1** is a safety net. By creating a new branch first, your original commits are still there on `original-branch` if you need them.
- **Step 2** is where the magic happens. All the changes from your commits are preserved in the staging area.
- **Step 3** wraps everything into a single, clean commit.
- **Step 4** pushes your clean branch, ready for a PR.

---

## Why Not Interactive Rebase?

`git rebase -i` is the "official" way to squash, and it's a powerful tool. But for the simple case of "I want all these commits as one," it's overkill:

- It opens an editor where you mark commits as `squash` or `fixup`
- It can trigger merge conflicts **at each step**
- It requires more manual interaction
- It's easier to make mistakes

`git reset --soft` skips all of that. No editor, no conflict resolution, no marking individual commits. Just: move the pointer back, commit once. Done.

---

## When To Use Each

| Scenario | Use |
|---|---|
| Squash **all** commits into one | `git reset --soft` |
| Squash some, keep others | `git rebase -i` |
| Reorder commits | `git rebase -i` |
| Edit a commit message mid-history | `git rebase -i` |

If you just want one clean commit from many, `reset --soft` is the fastest path. If you need surgical precision over individual commits, reach for `rebase -i`.

---

## Beyond PRs: Where This Really Shines

Squashing before a PR is the obvious use case, but there are two scenarios where `git reset --soft` becomes even more valuable.

### Cherry-Picking Made Easy

Say you built a feature on `branch-a` across 12 commits, and now you need to bring that work into `branch-b`. Cherry-picking 12 individual commits is painful. Conflicts can pile up at each step, and if one fails midway, you're stuck in a messy state.

Instead, squash first on a temporary branch, then cherry-pick the single result:

```bash
# Squash the 12 commits into one
git checkout -b temp-branch branch-a
git reset --soft <base-sha>
git commit -m "Complete feature X"

# Now cherry-pick just one commit
git checkout branch-b
git cherry-pick temp-branch

# Clean up the temporary branch since you no longer need it
git branch -D temp-branch
```

One cherry-pick instead of twelve. Clean and predictable. Notice that last line: once the cherry-pick is done, `temp-branch` has served its purpose. Delete it so it doesn't clutter your branch list. It won't cause issues if you forget, but keeping things tidy is always a good habit.

### Cleaning Up After AI-Assisted Development

If you use AI coding tools like Claude Code, Cursor, or any agent-driven workflow, you've probably seen this: the AI works in rapid loops. Fix, commit, fix, commit, adjust, commit. Before you know it, your branch has 20+ micro-commits like "fix import," "update test," "add missing type."

So what does "rapid loops" actually mean? Most AI coding agents don't write your entire feature in one shot. They work iteratively. They'll write some code, run the tests, see a failure, fix the import, run again, tweak a type, run again. Each iteration often produces a commit, either automatically or because you're saving checkpoints along the way. The result is a branch that tells the story of the AI's debugging process rather than the story of your feature.

That's actually fine during development. Let the AI iterate fast. But when it's time to merge, those 20 commits are noise. This is where `git reset --soft` comes to the rescue. One command and you collapse all that iterative work into a single, meaningful commit that tells the story of *what* was built, not *how* the AI got there.

```bash
# After your AI agent is done iterating
# Replace "main" with whatever your base branch is (master, develop, etc.)
git reset --soft main
git commit -m "Add payment processing with Stripe integration"
```

One thing to watch out for: `git reset --soft main` assumes your feature branch was created from `main`. If your project uses `master`, `develop`, or any other base branch, replace `main` with that. You can always double check with `git log --oneline` to find the exact commit where your feature work started.

The rapid loop commits served their purpose during development. The squashed commit serves its purpose in your project's history.

---

## Wrapping Up

`git reset --soft` is one of those Git commands that feels like a cheat code once you learn it. No editors, no conflict resolution, no multi-step rebase workflows. Just a clean, one-step squash.

Next time you're staring at a branch with a dozen commits and a PR deadline approaching, give it a try. Your reviewers will thank you.
