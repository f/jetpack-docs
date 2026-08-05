---
title: "Jetpack development quick start: complete source guide"
description: "Preserve the complete Jetpack quick-start workflow, including installation alternatives, Docker, cloud testing, and test commands."
audience: contributor
document_type: tutorial
sidebar_position: 10
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/quick-start.md"
source_blob: 9307c1f76c43dab8a0f2741195090ef93872fc23
source_sha256: c2d3ef9faf3c1661ebb0672aa47a2fd1b8b8c8af4579209a714d45218942b17a
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/quick-start.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Install","content":"\u003cp\u003eClone Jetpack outside the WordPress plugins directory and install its supported toolchain.\u003c/p\u003e"},{"title":"Start WordPress","content":"\u003cp\u003eUse the repository Docker environment or another supported local WordPress setup.\u003c/p\u003e"},{"title":"Build and verify","content":"\u003cp\u003eBuild the owning project, load it in WordPress, and run its relevant tests.\u003c/p\u003e"}]} /-->

<!-- jetpack-docs:preserved-source:start -->

## Overview

This guide is designed to get you up and running working with the Jetpack Monorepo quickly following recommended and supported guidelines.

**This guide assumes you are using MacOS or a Linux machine and are an Automattician**. For more detailed information, including setting up local dev environments for all contributors, running unit tests, best coding practices, and more, you can use the [full Development Environment guide here](/docs/building-with-jetpack/contributing/repository-guides/development-environment/#clone-the-repository).

## Installation

### Using the installation script

To speed up the installation process, you may use our monorepo installation script. To do so:

- Clone the Jetpack Monorepo:
  - Using a public SSH key ([recommended](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)): `git clone git@github.com:Automattic/jetpack.git`
    - Or use HTTPS: `git clone https://github.com/Automattic/jetpack.git`
  - Note that the monorepo should not be cloned into the WordPress plugins directory. If you plan on not using the provided Docker environment, read the [full Development Environment guide here](/docs/building-with-jetpack/contributing/repository-guides/development-environment/#clone-the-repository) to find out how to add symlinks.
- `cd` into the cloned `jetpack` folder.
- Run `tools/install-monorepo.sh` from the monorepo root.
- You can use the [environment checker script](#check-if-your-environment-is-ready-for-jetpack-development) to confirm that all required tools are installed.

Once the installation is complete, continue onto the section [Running Jetpack locally](#running-jetpack-locally).

### Installing manually

Prior to installation, we recommend using [Homebrew](https://brew.sh/) to manage installations and [nvm](https://github.com/nvm-sh/nvm/) to manage Node.js versions. If you don't already have those installed, you can do so by copy/pasting each of the following commands and running them in your terminal:

- Homebrew: `bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash` (see [nvm releases](https://github.com/nvm-sh/nvm/releases) for the latest version)

The Jetpack Monorepo requires various software to be installed on your machine.

- Clone the Jetpack Monorepo:
  - Using a public SSH key ([recommended](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)): `git clone git@github.com:Automattic/jetpack.git`
    - Or use HTTPS: `git clone https://github.com/Automattic/jetpack.git`
  - Note that the monorepo should not be cloned into the WordPress plugins directory. If you plan on not using the provided Docker environment, read the [full Development Environment guide here](/docs/building-with-jetpack/contributing/repository-guides/development-environment/#clone-the-repository) to find out how to add symlinks.
- This software needs to be installed or updated system-wide:
  - Bash (will need to be updated from default Mac version): `brew install bash`
  - jq (JSON processor used in scripts): `brew install jq`
- To install or update the following software, cd into the Jetpack directory that was created when cloning the repo: `cd jetpack`:
  - Node.js (used for build process and our CLI): `nvm install && nvm use`
  - PNPM (a Node.js package manager): `npm install -g pnpm`
  - PHP (the language at the core of the WordPress ecosystem): `source .github/versions.sh && brew install php@$PHP_VERSION`
  - Composer (our PHP package manager): `brew install composer`
  - Jetpack CLI (an internal tool that assists with development): `pnpm install && pnpm jetpack cli link`
    - [You can read more about using the CLI here](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/tools/cli/README.md).

### Check if your environment is ready for Jetpack development

We provide a script to help you in assessing if everything's ready on your system to contribute to Jetpack.

```sh
tools/check-development-environment.sh
```

Running the script will tell you if you have your environment already set up and what you need to do in order to get it ready for Jetpack development:

- All green `ok` or `yes` messages mean you're ready to start
- Red `no` or similar messages mean something is wrong or missing, and a link will be provided to help you with a fix.
- Yellow messages indicate something optional is broken or missing.

## Running Jetpack locally

After everything is installed, you're ready to run Jetpack locally! While there are other supported methods of doing this, we recommend and support using Docker containers.

To setup Docker:

- Install Docker:
  - Mac: `brew install --cask docker` (This will take a while!)
  - Linux: `brew install docker`
  - `open -a Docker` (or open the app from your Applications folder) to open the GUI application. You will likely need to enter your device password and accept their terms for a first time setup.
- Copy the settings file from within the monorepo root: `cp tools/docker/default.env tools/docker/.env`
- Open `tools/docker/.env` and make any modifications you'd like.
  - It's strongly recommend you at least change `WP_ADMIN_PASSWORD` to something more secure.
- Start the Docker container using `jetpack docker up -d` (this may take some time for the first setup)
  - If this fails with an error like `failed to bind host port 0.0.0.0:80/tcp: address already in use`, another service is using that port. Change `PORT_WORDPRESS` in `tools/docker/.env` to a free port (for example, `8888`) and try again. You can check whether a port is already in use with `lsof -i :<port>` (for example, `lsof -i :8888`).
- Install WordPress in your Docker container using `jetpack docker install`
  - The Jetpack plugin won't work until its Composer dependencies are installed and built. Run `jetpack build plugins/jetpack --deps` from the monorepo root before using it.
- Open up http://localhost to see your site!
- Go to `/wp-admin/plugins.php` and activate the Jetpack plugin.
  - You can now access it on `/wp-admin/admin.php?page=jetpack#/settings`.

For more in depth Docker instructions, follow the [Docker environment for Jetpack Development guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/tools/docker/README.md).

## Setting up Jurassic Tube

**Note:** This is for Automattician use only. For other methods, check out [ngrok](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/tools/docker/README.md#using-ngrok-with-jetpack) or [another similar service](https://alternativeto.net/software/ngrok/).

In order to test features that require a WordPress.com connection and other network related Jetpack features, you'll need a test site that can create local HTTP tunnels. If you're an Automattician, we recommend using Jurassic Tube.

To set up Jurassic Tube and establish a tunnel to your local machine, use the following instructions: PCYsg-GJ2-p2

For detailed information about using Jurassic Tube with Docker, including recommended proxy configurations, see the [Jurassic Tube Tunneling Service](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/tools/docker/README.md#jurassic-tube-tunneling-service) section in the Docker documentation.

## Development Workflow

Once you have a local copy of Jetpack and all development tools installed, you can start developing.

1. Make sure the plugin you're developing is activated on your WordPress site.
2. [Build your project](/docs/building-with-jetpack/contributing/repository-guides/development-environment/#building-your-project) using `jetpack build [type/project]` and including its dependencies, such as `jetpack build plugins/jetpack --deps`
3. Access the plugin's dashboard in your browser.

By default the development build above will run once and if you change any of the files, you need to run `jetpack build` again to see the changes on the site. If you want to avoid that, you can run a continuous build that will rebuild anytime it sees any changes on your local filesystem. To run it, use:

```sh
jetpack watch
```

### Running Tests

To run PHP, JS, and coverage tests, you can use the Jetpack CLI: `jetpack test` and then choose the project and type of test you'd like to run.

That's all!
<!-- jetpack-docs:preserved-source:end -->
