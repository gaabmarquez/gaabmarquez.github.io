---
title: "How to Setup Your Mac for Software Development (Java and React)"
date: "2025-01-05"
tags: ["Java", "React", "Mac", "NVM", "Docker"]
categories: ["Software Development", "Java", "React", "Setup Guide"]
description: "Step-by-step guide to setting up your Mac for Java and React development."
---

Congratulations on your new Mac! Whether you're building robust backends in Java or crafting sleek UIs with React, getting your development environment right is the key to success. This guide will help you set up your Mac, step-by-step, turning it into a powerhouse for Java and React programming.

Let's dive in!

---

### Step 1: Homebrew – The Foundation of macOS Development

Homebrew is your Swiss army knife for macOS. It's a package manager that simplifies installing and managing software.

#### Why Use Homebrew?

- **No System File Headaches:** Keeps installations isolated, avoiding conflicts.
- **Easy Updates:** A single command updates your tools.
- **Dependency Management:** Automatically handles dependencies for you.

#### Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Before using Brew, ensure you have Xcode Command Line Tools installed:

```bash
xcode-select --install
```

Once installed, verify everything is ready:

```bash
brew doctor
```

---

### Step 2: iTerm2 – A Better Terminal Experience

```bash
brew install --cask iterm2
```

#### Step 2.1: Oh My Zsh – Supercharge Your Terminal

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

##### Add Useful Plugins

Open your `~/.zshrc` file and add these plugins:

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

Install the additional plugins:

```bash
brew install zsh-autosuggestions zsh-syntax-highlighting
```

Reload your shell:

```bash
source ~/.zshrc
```

---

### Step 3: Install Node.js with NVM

```bash
brew install nvm
mkdir ~/.nvm
```

Add the following lines to your `~/.zshrc` file:

```bash
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh
```

Reload your shell and install Node:

```bash
source ~/.zshrc
nvm install 20
nvm alias default 20
node -v
```

---

### Step 4: SDKMAN! – Manage Java and JVM Tools

```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
```

#### Install Amazon Corretto 21

```bash
sdk list java
sdk install java 21.0.0-amzn
sdk default java 21.0.0-amzn
java -version
```

#### Install Gradle

```bash
sdk install gradle 7.6
sdk default gradle 7.6
gradle -v
```

---

### Step 5: Docker – Containerized Environments

```bash
brew install --cask docker
docker --version
```

---

### Step 6: Set Up a React Project

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

Your app is now live at `http://localhost:3000`.

---

### Step 7: Bonus Tools for Productivity

```bash
brew install --cask visual-studio-code
brew install --cask postman
```

Add VS Code extensions like Java Extension Pack, ESLint, Prettier, and Docker.

---

### Conclusion

With Homebrew, iTerm2, Oh My Zsh, SDKMAN!, NVM, Docker, and React set up, your Mac is now a programming powerhouse. Whether you're building the next great backend service or a cutting-edge frontend app, you're ready to hit the ground running.
