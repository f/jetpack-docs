---
title: Jetpack CLI
description: Build, test, watch, generate, and inspect monorepo projects with the Jetpack CLI.
audience: contributor
document_type: reference
sidebar_position: 30
sidebar_collapsed: true
---

`jp` runs the Jetpack CLI in the monorepo Docker environment and resolves the repository root from a checkout or worktree. The local equivalent is `pnpm jetpack` from the repository root.

```sh
jp build plugins/jetpack
jp build plugins/jetpack --deps
jp watch packages/forms
jp test php packages/connection
jp test js packages/connection
jp phan packages/connection
jp changelog add
jp clean plugins/jetpack
```

Use `jp generate` only when creating a supported project type; inspect the generated project and replace example behavior before proposing it. Use `jp install <project>` after dependency changes, and run `tools/fixup-project-versions.sh` when inter-project versions or locks no longer agree.

Package tests generally run directly through `jp test`. The Jetpack and WPCOMSH plugins need the full Docker WordPress environment and use `jp docker phpunit`; append PHPUnit options after `--`, for example:

```sh
jp docker phpunit jetpack -- --filter=Jetpack_Sync_Post_Test
```

Command availability and options are defined in the [pinned CLI source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/tools/cli). Prefer `jp <command> --help` over examples from an older branch.
