---
title: Contributor quick start
description: Make a focused, testable contribution to the Jetpack monorepo.
audience: contributor
document_type: tutorial
sidebar_position: 110
sidebar_collapsed: false
---

Jetpack's public monorepo contains plugins, PHP packages, JavaScript packages, GitHub Actions, and shared tools. Work from a fork unless you already have repository access.

## First contribution

1. Read the repository's public [CONTRIBUTING.md](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/CONTRIBUTING.md) and the code of conduct.
2. [Prepare the development environment](development-environment.md), then run `tools/check-development-environment.sh`.
3. Locate the owning project with the [monorepo map](monorepo-map.md).
4. Create a branch from `trunk`, make one coherent change, and add tests.
5. Run that project's PHP tests, JavaScript tests, and static analysis as defined by its `composer.json`.
6. Add a changelog entry for every affected project under `projects/`.
7. Open a pull request using the repository template and include reproducible verification instructions.

Do not edit generated files unless the project's build owns them. Do not edit WordPress core. Keep `$$next-version$$` placeholders intact; release tooling replaces them.

The focused pages cover the normal path: [Git workflow](git-workflow.md), [coding guidelines](coding-guidelines.md), [automated testing](automated-testing.md), [code review](code-review.md), and [pull requests](pull-requests.md).

## Complete Jetpack source guides

Nothing from the pinned `Automattic/jetpack/docs` tree was discarded. The [complete source-guide collection](repository-guides/index.md) preserves and reorganizes its contribution overview, quick start, environment setup, monorepo reference, coding and review guidance, release and deprecation notes, beta and regression suites, and supporting examples. Each page identifies its original path, blob, revision, and preservation status.

Use a focused page for a current task. Use the complete source guide when you need historical detail, a regression checklist, or the full context of the upstream document; verify volatile commands against the current project metadata before running them.
