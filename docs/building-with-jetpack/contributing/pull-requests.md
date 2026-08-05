---
title: Pull requests
description: Prepare a Jetpack pull request that CI and reviewers can evaluate without hidden context.
audience: contributor
document_type: how-to
sidebar_position: 80
sidebar_collapsed: true
---

Use `.github/PULL_REQUEST_TEMPLATE.md` without removing its metadata. Keep the title outcome-focused and the diff small enough to review as one unit.

The description should explain the problem, user-visible result, implementation choice, risks, and exact test steps. Include screenshots or recordings for visual changes and state which browsers, viewports, roles, connection states, and projects you tested. Link public issues and source; use repository-approved shorthand for any private discussion rather than exposing a private URL.

Before requesting review:

1. Rebase or merge current `trunk` according to the branch's collaboration state.
2. Run focused tests, static analysis, linting, and `git diff --check`.
3. Add changelog files for projects touched under `projects/`.
4. Review the complete GitHub diff for unrelated files and secrets.
5. Mark known limitations and provide rollback instructions for risky changes.

Do not select automatic changelog generation when changelog files are already present. Use status and type labels expected by the repository, and keep the pull request updated when behavior or testing changes.

See the [pinned pull-request guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/pull-request.md).
