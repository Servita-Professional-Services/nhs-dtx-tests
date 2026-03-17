# Windows OS Universal Setup and Configuration

## Software Requirements

Windows OS:
- [VSCode IDE](https://code.visualstudio.com/download)
- [Git Bash](https://git-scm.com/downloads/win)

## OS Configurations:

In order to authenticate Git/GitHub SSH keys, you'll need to enable the OpenSSH Authentication Agent in Windows OS. Here is how to enable it:

1. Firstly, open Services(Start Menu -> Type “Services”)
2. Then, select OpenSSH Authentication Agent
3. Finally, set StartupType to Automatic

## Chocolaty installation

Follow the this link: https://docs.chocolatey.org/en-us/choco/setup/ to install and setup the Chocolaty package manager.

## Git & Repository Setup

Prior to exectuting the git commands, ensure that you have git installed with Github SSH configured on your local machine.

Download and install git package from: https://git-scm.com/downloads

For Windows OS devices, follow all the default settings.

Instructions for Connecting to GitHub with SSH (GitHub account required): 

1. Generating & adding SSH to SSH Agent: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows 

2. Adding SSH key to your GitHub account: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=windows

Clone the repository using the following command:

`git clone git@github.com:Servita-Professional-Services/wayfinder-tests.git`

## Node Setup

### NVM Installation

NVM is used to quickly install one or more node dependencies via the command line:

Download `nvm-setup.exe` from the latest release via releases GitHub URL: https://github.com/coreybutler/nvm-windows/releases

Once you have downloaded installation file and installed the application, close all your command line terminal instances so that the installation configuration is applied and then re-open your command line terminal instances.

### Node Installation and Config

1. Using the git bash terminal, execute `nvm install v23.1.0` command followed by
2. One step 1 is fully complete, using the git bash terminal, execute `nvm use 23.1.0 default` to ensure the specific node version is installed globally.
2. Click on [this link](https://github.com/user-attachments/assets/714ede9c-f0c9-48b9-892e-9ab07448befe) to see how to setup Node PATH on Windows OS.
3. Using the git bash terminal, install NPM globally by executing `npm install -g npm@latest` command.

## Docker Setup

Follow the instructions to install the latest version of Docker Desktop App for Windows Here: https://docs.docker.com/desktop/setup/install/windows-install