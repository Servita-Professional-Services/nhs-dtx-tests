# Mac OS Universal Setup and Configuration

## 1. Software Requirements

Mac OS:
- [VSCode IDE](https://code.visualstudio.com/download)
- [Warp Terminal](https://www.warp.dev) - You can also use your default terminal app or integrated terminal in the IDE

## 2. Mac OS Configurations:

Before moving on to the rest of the sections, you need to ensure you have the latest Mac operating system installed followed by installing command-line tools.

1. Follow this guide on checking and updating your Mac OS version: https://support.apple.com/en-gb/108382
2. Once your Mac OS is updated to the latest version, open the `Terminal` app and run the `xcode-select –-install`
3. You'll see a pop-up panel that asks you to install Xcode Command Line Tools. 
4. Click 'Install' to begin the download and installation process.
5. You'll see a confirmation message when installation is complete.
6. You can verify the installation of command-line tools by executing `xcode-select -p` on the terminal.

## 3. Homebrew Installation

Install Homebrew via the command below

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## 4. Git & Repository Setup

Prior to executing the git commands, ensure that you have git installed with Github SSH configured on your local machine.

Download and install git package from: https://git-scm.com/downloads

Instructions for Connecting to GitHub with SSH (GitHub account required): 

1. Generating & adding SSH to SSH Agent: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac 

2. Adding SSH key to your GitHub account: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=mac

Clone the repository using the following command:

`git clone git@github.com:Servita-Professional-Services/wayfinder-tests.git`

## 5. Node Setup

### NVM Installation

NVM is used to quickly install one or more node dependencies via the command line:

Installation terminal command - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`

Initialise NVM via this export command: 

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
Github Reference: https://github.com/nvm-sh/nvm

## 6. Docker Setup

Follow the instructions to install the latest version of Docker Desktop App for Mac Here: https://docs.docker.com/desktop/setup/install/mac-install