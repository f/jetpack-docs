---
title: Develop and test Jetpack Social
description: Build and test the Jetpack Social plugin and Publicize package across editor, connection, publication, and failure paths.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: social
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

The standalone product is owned at [`projects/plugins/social`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/social). Reusable publication logic, editor data, and REST behavior are owned at [`projects/packages/publicize`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/publicize). The plugin also consumes [`projects/js-packages/social-previews`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/js-packages/social-previews) for preview UI and [`projects/js-packages/social-logos`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/js-packages/social-logos) for network marks. Put a change in the owning project and test all consumers of a shared package change.

## Build and test

```bash
jp install plugins/social
jp build plugins/social --deps
jp test php plugins/social
jp test js plugins/social
jp phan plugins/social
```

When Publicize changes, also run:

```bash
jp build packages/publicize --deps
jp test php packages/publicize
jp test js packages/publicize
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

Automated tests should mock destination responses and use synthetic account identifiers. They must not use real network tokens or publish to a live account. A manual integration test should use a dedicated test site and destination account with an explicit cleanup step.

## Contribution requirements

Add a changelog entry to every changed project with `jp changelog add plugins/social` and, when applicable, `jp changelog add packages/publicize`, `jp changelog add js-packages/social-previews`, or `jp changelog add js-packages/social-logos`. Test standalone Social and the main Jetpack consumer when shared code changes. Keep PHP compatible with each project's declared minimum and retain `$$next-version$$` in version annotations.

Describe public behavior and sanitized test evidence in the pull request. Report token leakage, unauthorized connection use, cross-user publishing, or request-signing vulnerabilities through [Automattic Security](https://automattic.com/security/) instead of a public issue.
