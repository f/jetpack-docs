---
title: Develop and test Jetpack
description: Build and test changes to the main Jetpack plugin in the owning monorepo with the required project and integration checks.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: jetpack
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/jetpack/\n  modules/\n  extensions/\n  _inc/\n  src/\nprojects/packages/","caption":"Jetpack source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack project checks","shell":"bash","prompt":"$","command":"jp install plugins/jetpack\njp build plugins/jetpack \u002d\u002ddeps\njp test js plugins/jetpack\njp test typecheck plugins/jetpack\njp phan plugins/jetpack","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

The main plugin is owned at [projects/plugins/jetpack](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack) in the public Jetpack monorepo. Shared behavior may instead belong to a package under `projects/packages` or a JavaScript package under `projects/js-packages`; change the owning project rather than duplicating it inside the plugin.

## Prepare the checkout

1. Follow the monorepo's current [contribution guide](https://github.com/Automattic/jetpack/blob/trunk/CONTRIBUTING.md).
2. Install the repository dependencies through the supported Jetpack CLI workflow.
3. If using a Git worktree, seed its Docker environment before starting containers so it receives unique ports and a unique Compose project name.
4. Record the exact project paths touched. Every changed project under `projects/` needs its own changelog entry.

## Build

From the monorepo root:

```bash
jp install plugins/jetpack
jp build plugins/jetpack --deps
```

Use `jp watch plugins/jetpack` while developing. A successful compiler process is not a functional test: load the built plugin in WordPress and exercise the edited screen, request, or front-end output.

## Test

The Jetpack plugin requires the full Docker WordPress test environment for PHP integration tests:

```bash
tools/docker/bin/seed-worktree-env.sh
jp docker up -d
jp docker install
jp docker phpunit jetpack
jp test js plugins/jetpack
jp test typecheck plugins/jetpack
jp phan plugins/jetpack
```

For a focused PHP rerun, pass PHPUnit options after `--`, for example `jp docker phpunit jetpack -- --filter=Relevant_Test`. Run the full relevant suite before handoff. If a shared package changed, also run `jp test php`, `jp test js`, type checks where defined, and `jp phan` for that package. Run `tools/fixup-project-versions.sh` after changing inter-project versions or dependencies.

CI exercises PHP 7.2 through 8.5 at this review revision. Keep syntax compatible with the project's minimum version in its Composer metadata; the [pinned plugin readme](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/readme.txt) reports the user-facing requirements for this snapshot.

## Verify the behavior

- Test fresh activation and an existing connected-site upgrade path.
- Test connected and intentionally offline development states when the code branches on connection status.
- Test the least-privileged user who should reach the behavior.
- Check multisite if the changed code has network or site ownership behavior.
- Verify both editor and saved front-end output for block changes.
- Inspect REST failures, nonce failures, and unavailable-service states rather than testing only success.

Add a project changelog with `jp changelog add plugins/jetpack`; use the Jetpack-specific changelog types defined in its Composer metadata. A change to a package requires a separate package changelog. Never replace `$$next-version$$` in DocBlocks; the release process resolves it.
