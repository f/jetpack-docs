---
title: Git workflow
description: Keep Jetpack branches focused, current, and safe for collaboration.
audience: contributor
document_type: how-to
sidebar_position: 40
sidebar_collapsed: true
---

Create work from current `trunk` and keep unrelated changes out of the branch.

```sh
git fetch upstream
git switch trunk
git pull --ff-only upstream trunk
git switch -c fix/concise-description
```

Before a pull request exists, rebasing onto `upstream/trunk` keeps a clean branch. After review starts, coordinate before rewriting commits because a rebase invalidates commit references and review context. If a rewritten branch must be pushed, use `--force-with-lease`, never an unguarded force push.

Inspect `git status`, `git diff`, and `git diff --check` before every commit. Stage explicit paths so generated or personal files are not included. Commit messages should describe the outcome and must not contain private URLs or customer data.

For dependency conflicts, regenerate lock data using the owning tool instead of manually combining lock-file sections. After a merge involving released project versions, run `tools/fixup-project-versions.sh`.

The detailed public rules are in the [pinned Git workflow](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/git-workflow.md).
