---
title: Jetpack CLI reference
description: Map common jp commands to build, test, Docker, changelog, generation, and maintenance tasks.
audience: contributor
document_type: reference
sidebar_position: 70
sidebar_collapsed: true
---

`jp` launches the monorepo CLI in its Docker environment; `pnpm jetpack` runs the local CLI. Project arguments omit the leading `projects/`.

| Task | Command |
| --- | --- |
| Build one project | `jp build plugins/jetpack` |
| Build with dependencies | `jp build plugins/jetpack --deps` |
| Watch changes | `jp watch packages/forms` |
| Run package PHP tests | `jp test php packages/connection` |
| Run package JS tests | `jp test js packages/connection` |
| Run Jetpack plugin PHPUnit | `jp docker phpunit jetpack` |
| Pass a PHPUnit filter | `jp docker phpunit jetpack -- --filter=Class_Name` |
| Run Phan | `jp phan packages/connection` |
| Add changelog | `jp changelog add` |
| Start Docker | `jp docker up -d` |
| Install Docker WordPress | `jp docker install` |
| Clean a build | `jp clean plugins/jetpack` |

Run `jp <command> --help` for current options. In a worktree, seed its Docker environment before starting containers. Commands and project scripts are authoritative in the [pinned CLI source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/tools/cli).
