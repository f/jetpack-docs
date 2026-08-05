---
title: Reuse Jetpack packages
description: Evaluate and consume published Jetpack PHP or JavaScript packages without importing monorepo internals.
audience: developer
document_type: how-to
sidebar_position: 80
sidebar_collapsed: true
---

The monorepo contains independently versioned Composer and npm packages. A directory under `projects/packages` or `projects/js-packages` is not automatically a public dependency: verify its package metadata, README, changelog, and published registry entry.

## PHP packages

Use the Composer name declared by the package, such as `automattic/jetpack-status` or `automattic/jetpack-connection`. Let Composer resolve dependencies and use the Jetpack Autoloader where the package requires it. Do not copy a package's `src` directory into another plugin.

```sh
composer require automattic/jetpack-status
```

## JavaScript packages

Use the package's npm name and peer-dependency ranges. Keep WordPress-provided packages external when the project's build convention requires it, and import documented entry points rather than files inside `src` or `dist`.

```sh
pnpm add @automattic/jetpack-components
```

Pin a compatible range, inspect changelogs during updates, and test the package in the real WordPress bootstrap. Some packages require configuration or a connected site; installation alone does not initialize them.

See the [package API map](../reference/package-apis.md) and [compatibility policy](../reference/compatibility-and-version-policy.md).
