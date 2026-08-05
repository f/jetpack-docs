---
title: Changelog entries
description: Add user-focused changelog files for every changed Jetpack project.
audience: contributor
document_type: how-to
sidebar_position: 90
sidebar_collapsed: true
---

Every pull request that changes a project under `projects/` needs an entry in each affected project's `changelog/` directory. Changes limited to repository tooling, root documentation, or workflows outside `projects/` do not require project entries.

```sh
jp changelog add packages/connection \
	-s patch \
	-t fixed \
	-e "Fix connection recovery after a site URL change."
```

Use `patch`, `minor`, or `major` significance according to compatibility impact. Choose a type supported by the project's `composer.json`; the Jetpack plugin has its own type set. Write one imperative, user-facing sentence that starts with a capital letter and ends with a period. Prefix a feature area when that helps users, but do not repeat the project name inside its own changelog.

For an internal-only change with no release note, create the empty entry through the CLI and include a concise `--comment` explanation. Do not hand-edit release versions or replace `$$next-version$$` annotations.

The format and examples are defined by the pinned [changelog guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/writing-a-good-changelog-entry.md).
