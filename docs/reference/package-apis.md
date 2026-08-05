---
title: Package APIs
description: Find and evaluate independently versioned Jetpack Composer and npm packages.
audience: developer
document_type: reference
sidebar_position: 60
sidebar_collapsed: true
---

Jetpack packages are independently versioned projects inside one monorepo. The package's Composer or npm name, exported entry points, README, and changelog define the consumable boundary.

| Capability | Source project | Package identifier |
| --- | --- | --- |
| Site status and offline detection | `projects/packages/status` | `automattic/jetpack-status` |
| Connection lifecycle and authentication | `projects/packages/connection` | `automattic/jetpack-connection` |
| WordPress data synchronization | `projects/packages/sync` | `automattic/jetpack-sync` |
| Block registration helpers | `projects/packages/blocks` | `automattic/jetpack-blocks` |
| Testable constant access | `projects/packages/constants` | `automattic/jetpack-constants` |
| Shared React UI | `projects/js-packages/components` | `@automattic/jetpack-components` |
| Docker-backed CLI | `projects/js-packages/jetpack-cli` | `@automattic/jetpack-cli` |

Check runtime requirements and peer dependencies in the chosen revision. Internal source paths, tests, and generated bundles are not exports. A package can require initialization, WordPress hooks, or another Jetpack package even when Composer/npm installation succeeds.

Browse [all PHP packages](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages) and [all JavaScript packages](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages), then verify the published registry version before selecting a constraint.
