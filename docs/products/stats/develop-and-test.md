---
title: Develop and test Jetpack Stats
description: Test Stats collection, report fetching, administration, privacy controls, and main-plugin integration in their owning projects.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: stats
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Stats behavior is split across:

- [`projects/packages/stats`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats) for collection and report clients.
- [`projects/packages/stats-admin`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats-admin) for Stats administration integration.
- [`projects/plugins/jetpack/modules/stats.php`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/modules/stats.php) for main-plugin module loading and compatibility behavior.

Change the owning package first. Do not duplicate collection logic in the plugin module.

## Package tests

```bash
jp test php packages/stats
jp phan packages/stats
jp test php packages/stats-admin
jp phan packages/stats-admin
```

The pinned Stats projects do not define a meaningful JavaScript build/test step of their own. If the change affects a dashboard bundle owned by another project, run that project's documented build and JavaScript tests rather than treating a skipped step as coverage.

## Main-plugin integration

For changes loaded through Jetpack:

```bash
jp build plugins/jetpack --deps
tools/docker/bin/seed-worktree-env.sh
jp docker up -d
jp docker install
jp docker phpunit jetpack
jp test js plugins/jetpack
jp phan plugins/jetpack
```

Use focused tests during iteration, then run the complete relevant project suite. Test the supported PHP matrix and avoid syntax newer than the affected project's declared minimum.

## Behavior matrix

- Front page, singular content, archives, and an unsupported or empty request context.
- Signed-in and signed-out requests, configured exclusions, DNT behavior, proxies, and page caches.
- Tracking data serialization with special characters and malicious input.
- AMP and ordinary front-end output where the code has separate paths.
- Connected report success, `WP_Error`, timeout, empty result, cached result, and cache bypass where supported.
- Administrator, permitted non-administrator, and unauthorized dashboard users.
- Activation, upgrade, deactivation, and coexistence with another plugin that loads the same package through Jetpack Autoloader.

Fixtures must use synthetic visits and identifiers. Do not call the production Stats service from a unit test or record visitor IPs, cookies, connected-site credentials, or report payloads in snapshots.

Add a changelog entry for every changed project, such as `jp changelog add packages/stats`, `jp changelog add packages/stats-admin`, and `jp changelog add plugins/jetpack`. Report tracking without consent, unauthorized report access, credential exposure, or injection through [Automattic Security](https://automattic.com/security/).
