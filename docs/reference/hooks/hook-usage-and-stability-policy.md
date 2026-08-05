---
title: Hook usage and stability policy
description: Decide when a Jetpack hook is an appropriate third-party contract and how to maintain it.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
---

A hook belongs in this curated catalog when its name and behavior are documented in public source, its owning product is identifiable, and its signature can be verified at the pinned revision. Inclusion is evidence of intent, not a promise that the hook exists in releases before its `since` version or after a documented removal.

## Consumer responsibilities

- Register from a plugin or must-use plugin, never by modifying Jetpack.
- Match the documented accepted-argument count and preserve filter types.
- Treat objects and arrays as owned by the caller unless mutation is explicitly allowed.
- Avoid expensive, blocking, or remote work in request-critical callbacks.
- Feature-detect the owning plugin/package and provide a harmless inactive state.
- Test every Jetpack version your integration claims.
- Migrate when `_deprecated_hook()`, `apply_filters_deprecated()`, source annotations, or the product changelog announces a replacement.

Hooks missing from this catalog may still be valid WordPress integration points, but their presence in source alone is insufficient. Verify their public product documentation and immutable source before depending on them; do not infer a contract from a test, a generated file, or a dynamically constructed internal hook.

See [compatibility and version policy](../compatibility-and-version-policy.md).
