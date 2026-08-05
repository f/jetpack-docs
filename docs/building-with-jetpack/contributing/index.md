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

1. Read the repository's public [`CONTRIBUTING.md`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/CONTRIBUTING.md) and the code of conduct.
2. [Prepare the development environment](development-environment.md), then run `tools/check-development-environment.sh`.
3. Locate the owning project with the [monorepo map](monorepo-map.md).
4. Create a branch from `trunk`, make one coherent change, and add tests.
5. Run that project's PHP tests, JavaScript tests, and static analysis as defined by its `composer.json`.
6. Add a changelog entry for every affected project under `projects/`.
7. Open a pull request using the repository template and include reproducible verification instructions.

Do not edit generated files unless the project's build owns them. Do not edit WordPress core. Keep `$$next-version$$` placeholders intact; release tooling replaces them.

The following pages cover the complete path: [Git workflow](git-workflow.md), [coding guidelines](coding-guidelines.md), [automated testing](automated-testing.md), [code review](code-review.md), and [pull requests](pull-requests.md).
