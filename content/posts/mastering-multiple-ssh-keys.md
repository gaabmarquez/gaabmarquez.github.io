---
title: "Mastering Multiple SSH Keys"
date: "2025-01-02"
tags: ["SSH Management", "Git", "Version Control"]
categories: ["Software Development", "Version Control", "SSH", "Git"]
description: "A practical guide to managing multiple SSH keys for different projects and clients."
---

Managing multiple SSH keys can seem overwhelming at first, especially if you're working across various projects that require different keys for secure access. Without proper configuration, switching between keys can lead to frustrating errors. This guide provides a clear and practical approach to handling multiple SSH keys effectively, ensuring seamless workflows across repositories.

## Why Manage Multiple SSH Keys?

Using multiple SSH keys is common for developers working on:

- Personal projects.
- Employer repositories.
- Client repositories (freelance work).

Each organization might require a unique SSH key for security and access control, and managing these keys properly ensures smooth sailing between repositories.

## Setting Up Multiple SSH Keys

### 1. Generate SSH Keys

Start by generating unique SSH keys for each account or client.

```bash
# Generate a new SSH key for Client A
ssh-keygen -t ed25519 -C "client_a@example.com" -f ~/.ssh/id_client_a

# Generate another key for Client B
ssh-keygen -t ed25519 -C "client_b@example.com" -f ~/.ssh/id_client_b
```

- The `-C` flag adds a comment for easy identification.
- The `-f` flag specifies the file name to avoid overwriting existing keys.

### 2. Add SSH Keys to the SSH Agent

```bash
# Start the SSH agent
eval $(ssh-agent -s)

# Add the keys
ssh-add ~/.ssh/id_client_a
ssh-add ~/.ssh/id_client_b
```

### Example: Using an Added Key

Once you've added a key to the agent, test its usage:

```bash
# Clone a repository using the key added for Client A
git clone git@client_a:username/repo.git
```

If you need to ensure the correct key is being used:

```bash
ssh -T git@client_a
# Output: Hi client_a! You've successfully authenticated.
```

### 3. Configure the SSH Config File

The SSH config file (`~/.ssh/config`) allows you to map each SSH key to its corresponding host:

```
# Configuration for Client A
Host client_a
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_client_a

# Configuration for Client B
Host client_b
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_client_b
```

### 4. Test the Configuration

```bash
ssh -T git@client_a
ssh -T git@client_b
```

You should see:

```
Hi client_a! You've successfully authenticated.
Hi client_b! You've successfully authenticated.
```

## Switching Between Keys in Git

### Cloning Repositories

```bash
git clone git@client_a:username/repo.git
```

### Updating Remote URLs for Existing Repositories

```bash
git remote set-url origin git@client_a:username/repo.git
```

### Pull Changes

```bash
git pull origin branch_name
```

## Wrapping Up

Managing multiple SSH keys doesn't have to be daunting. With the right setup and a solid understanding of common pitfalls, you'll switch between repositories seamlessly and troubleshoot issues with confidence.
