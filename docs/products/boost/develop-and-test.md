---
title: "Develop and test Jetpack Boost"
description: "Build and verify Boost changes in the Jetpack monorepo with its PHP and JavaScript suites."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "boost"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Boost is owned in `projects/plugins/boost` in the Jetpack monorepo. Its production mirror is a release output; make source changes in the monorepo.

## Set up and build

From the monorepo root:

```bash
jp install plugins/boost
jp build plugins/boost --deps
```

Use `jp watch plugins/boost` while changing dashboard assets. A production check should use `jp build plugins/boost --deps --production` rather than committing generated assets by hand. Consult the project's `composer.json` before changing build scripts; it defines both development and production entry points.

## Run focused checks

```bash
jp test php plugins/boost
jp test js plugins/boost
jp phan plugins/boost
```

When shared optimization or scoring code changes, also run the focused package checks:

```bash
jp test php packages/boost-core
jp phan packages/boost-core
jp test php packages/boost-speed-score
jp phan packages/boost-speed-score
```

The PHP project contains both unit and WordPress-backed suites. Add regression coverage in the layer that exercises the behavior: module logic and compatibility checks belong in PHP tests; dashboard behavior belongs in Jest; full changes to visible optimization behavior may also need the plugin's end-to-end harness.

For a browser-level test, run a disposable WordPress environment, link the built plugin, and exercise pages that cover logged-out cache output, logged-in bypasses, REST permissions, critical CSS regeneration, and JavaScript exclusions. Never point development-only connection bypass filters or mock service plugins at a production site.

## Contribution checklist

- Preserve PHP 7.2 compatibility unless the project metadata raises the minimum.
- Use logical CSS properties and translatable UI strings.
- Test Boost with the main Jetpack plugin both active and inactive because Boost is standalone but includes compatibility code.
- Add a changelog entry under `projects/plugins/boost/changelog/` for a project change.
- Rebuild only the artifacts required by the project and inspect the final diff.

The plugin source and tests at the research pin are available in [the Boost project](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost). For monorepo-wide practices, see [Building with Jetpack](/docs/building-with-jetpack/) and [Compatibility and version policy](/docs/reference/compatibility-and-version-policy/).
