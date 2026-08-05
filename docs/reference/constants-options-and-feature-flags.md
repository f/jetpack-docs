---
title: Constants, options, and feature flags
description: Distinguish supported Jetpack configuration from internal constants, database options, and rollout flags.
audience: developer
document_type: reference
sidebar_position: 80
sidebar_collapsed: true
---

These mechanisms have different compatibility guarantees.

- **Documented constants** are deployment-time configuration and normally belong in `wp-config.php` before plugins load. Confirm their type and supported values in the product guide.
- **Options** are product-owned persisted state. Use a documented settings API, package, or WordPress option wrapper; do not mutate another product's raw option just because its key is visible.
- **Feature flags** gate staged or experimental behavior and may change without becoming a public extension API.

The `automattic/jetpack-constants` package wraps constant access so Jetpack code can test behavior, while `projects/packages/feature-flags` owns shared flag evaluation. Neither implies that every constant or flag name is supported for third parties.

When configuration is public, document its load time, scope (network/site/user), default, accepted type, security impact, and precedence relative to UI settings. Clear runtime caches before asserting a changed value in tests.

Pinned sources: [Constants package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/constants) and [Feature Flags package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/feature-flags).
