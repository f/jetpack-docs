---
title: Develop and test Jetpack Social
description: Build and test the Jetpack Social plugin and Publicize package across editor, connection, publication, and failure paths.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: social
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/social/\nprojects/packages/publicize/\nprojects/js-packages/\n  social-previews/\n  social-logos/","caption":"Jetpack Social source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Social project checks","shell":"bash","prompt":"$","command":"jp build plugins/social \u002d\u002ddeps\njp test php plugins/social\njp phan plugins/social\njp test php packages/publicize\njp test js packages/publicize\njp test typecheck packages/publicize","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

The standalone product is owned at [projects/plugins/social](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/social). Reusable publication logic, editor data, and REST behavior are owned at [projects/packages/publicize](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize). The plugin also consumes [projects/js-packages/social-previews](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/social-previews) for preview UI and [projects/js-packages/social-logos](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/social-logos) for network marks. Put a change in the owning project and test all consumers of a shared package change.

## Build and test

```bash
jp install plugins/social
jp build plugins/social --deps
jp test php plugins/social
jp phan plugins/social
```

The standalone plugin's local JavaScript build and test scripts only print `Not implemented` at the pinned revision. `jp build plugins/social --deps` is dependency orchestration, not evidence of a plugin-local asset suite.

When Publicize changes, also run:

```bash
jp build packages/publicize --deps
jp test php packages/publicize
jp test js packages/publicize
jp test typecheck packages/publicize
jp phan packages/publicize
```

When a preview or logo package changes, run the scripts that its pinned package metadata defines:

```bash
jp build js-packages/social-previews --deps
jp test js js-packages/social-previews
jp test typecheck js-packages/social-previews
jp build js-packages/social-logos --deps
jp test typecheck js-packages/social-logos
```

The pinned Composer metadata defines PHP and JavaScript tests for both projects. If a change also affects how the main Jetpack plugin loads Publicize, build and run the relevant Jetpack plugin tests in its Docker WordPress environment.

## Test the workflow

- Fresh install, activation, connection discovery, and deactivation.
- Personal and shared connections with authorized and unauthorized users.
- New publication, scheduled publication, update, and a post type that is not shareable.
- Custom message, empty message, featured image, missing public media, and unsupported media.
- Destination success, rejection, timeout, expired authorization, and ambiguous response.
- Retry behavior that does not duplicate a confirmed destination post.
- Editor loading, keyboard access, errors, and narrow layouts.
- Social Notes, UTM links, message templates, per-network customization, shared-connection authorization, manual resharing, share-status synchronization, and Open Graph conflicts.

Automated tests should mock destination responses and use synthetic account identifiers. They must not use real network tokens or publish to a live account. A manual integration test should use a dedicated test site and destination account with an explicit cleanup step.

## Contribution requirements

Add a changelog entry to every changed project with `jp changelog add plugins/social` and, when applicable, `jp changelog add packages/publicize`, `jp changelog add js-packages/social-previews`, or `jp changelog add js-packages/social-logos`. Test standalone Social and the main Jetpack consumer when shared code changes. Keep PHP compatible with each project's declared minimum and retain `$$next-version$$` in version annotations.

Describe public behavior and sanitized test evidence in the pull request. Report token leakage, unauthorized connection use, cross-user publishing, or request-signing vulnerabilities through [Automattic Security](https://automattic.com/security/) instead of a public issue.
