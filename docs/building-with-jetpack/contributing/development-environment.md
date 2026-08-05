---
title: Development environment
description: Install the public Jetpack toolchain and run a project in the supported Docker environment.
audience: contributor
document_type: how-to
sidebar_position: 10
sidebar_collapsed: true
---

Jetpack development uses Git, Node.js, pnpm, PHP, Composer, and Docker. Exact tool versions are declared in the repository, including `.nvmrc`, `package.json`, and `.github/versions.sh`; read those files instead of relying on a version copied into a tutorial.

## Set up

```sh
git clone https://github.com/YOUR-ACCOUNT/jetpack.git
cd jetpack
git remote add upstream https://github.com/Automattic/jetpack.git
tools/install-monorepo.sh
tools/check-development-environment.sh
```

The monorepo should not be cloned directly into `wp-content/plugins`. Its tooling builds and links the selected projects into the supported Docker WordPress environment.

## Run a project

```sh
jp build plugins/jetpack --deps
jp docker up -d
jp docker install
```

In a Git worktree, run `tools/docker/bin/seed-worktree-env.sh` before `jp docker up -d`. It assigns the worktree a distinct Compose project and ports so it does not reuse another checkout's containers.

Activate only the plugin under test, make changes in its source directory, and use `jp watch <project>` for continuous development builds. Keep credentials out of `tools/docker/.env` commits.

The pinned environment sources are [the version matrix](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/.github/versions.sh) and [Docker guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/tools/docker/README.md).
