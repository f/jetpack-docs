---
title: Automated testing
description: Run the correct Jetpack project tests, static analysis, and compatibility checks.
audience: contributor
document_type: how-to
sidebar_position: 60
sidebar_collapsed: true
---

Start with the scripts declared by the affected project's `composer.json`.

```sh
jp test php packages/connection
jp test js packages/connection
jp phan packages/connection
```

A missing `test-js` script causes the JavaScript step to skip; that is not a failure. Packages may use plain PHPUnit, Brain Monkey, or WorDBless. Match nearby tests and name a test class and file consistently with a `Test` suffix.

The Jetpack and WPCOMSH plugins require an installed Docker WordPress environment:

```sh
jp docker up -d
jp docker install
jp docker phpunit jetpack -- --filter=Target_Test
```

Cover the behavior changed, a failure case, and the compatibility boundary. For hooks, reset callbacks in teardown. For REST routes, assert permissions and schema errors. For UI, prefer Testing Library queries that reflect user interaction rather than implementation structure.

CI tests supported PHP versions, so code that passes locally on the newest interpreter can still fail on the minimum. Consult the pinned [version matrix](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/.github/versions.sh) and [testing guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/automated-testing.md).
