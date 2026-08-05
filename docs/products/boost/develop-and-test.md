---
title: "Develop and test Jetpack Boost"
description: "Build and verify Boost changes in the Jetpack monorepo with its PHP and JavaScript suites."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "boost"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/boost/\nprojects/packages/\n  boost-core/\n  boost-speed-score/\nprojects/js-packages/boost-score-api/","caption":"Jetpack Boost source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Boost project checks","shell":"bash","prompt":"$","command":"jp install plugins/boost\njp build plugins/boost \u002d\u002ddeps\njp test php plugins/boost\njp test js plugins/boost\njp phan plugins/boost\njp test js js-packages/boost-score-api\njp test typecheck js-packages/boost-score-api","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

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
jp test js js-packages/boost-score-api
jp test typecheck js-packages/boost-score-api
```

Do not count `jp test typecheck plugins/boost` as type assurance at this revision: that script only reports that implementation is pending. Run type checks in the packages that actually define them.

The PHP project contains both unit and WordPress-backed suites. Add regression coverage in the layer that exercises the behavior: module logic and compatibility checks belong in PHP tests; dashboard behavior belongs in Jest; full changes to visible optimization behavior may also need the plugin's end-to-end harness.

For a browser-level test, run a disposable WordPress environment, link the built plugin, and exercise pages that cover logged-out cache output, logged-in bypasses, REST permissions, critical CSS regeneration, and JavaScript exclusions. Never point development-only connection bypass filters or mock service plugins at a production site.

The plugin also defines separate end-to-end start, run, and stop scripts. Use those from the owning E2E directory for dashboard and rendered-page flows; `jp test js plugins/boost` is not a substitute for the browser suite.

## Contribution checklist

- Preserve PHP 7.2 compatibility unless the project metadata raises the minimum.
- Use logical CSS properties and translatable UI strings.
- Test Boost with the main Jetpack plugin both active and inactive because Boost is standalone but includes compatibility code.
- Add a changelog entry under `projects/plugins/boost/changelog/` for a project change.
- Rebuild only the artifacts required by the project and inspect the final diff.

The plugin source and tests at the research pin are available in [the Boost project](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost). For monorepo-wide practices, see [Building with Jetpack](/docs/building-with-jetpack/) and [Compatibility and version policy](/docs/reference/compatibility-and-version-policy/).
