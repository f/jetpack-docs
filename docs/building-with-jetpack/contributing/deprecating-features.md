---
title: Deprecating features
description: Retire Jetpack APIs and behavior with notice, replacements, telemetry boundaries, and tests.
audience: contributor
document_type: how-to
sidebar_position: 120
sidebar_collapsed: true
---

Deprecation is a compatibility promise: existing integrations keep working for a stated period while callers receive a clear path to a supported replacement.

## Deprecation checklist

1. Inventory public functions, classes, hooks, routes, block markup, options, and package exports involved.
2. Provide a replacement or explicitly document that no equivalent remains.
3. Add the correct WordPress deprecation helper with `$$next-version$$`, the replacement name, and any migration notes.
4. Keep the compatibility shim free of new side effects and preserve return types.
5. Add tests for the notice, old behavior, replacement behavior, and interactions when both are present.
6. Add a user-facing changelog entry and update reference pages and examples.
7. Remove only through the owning project's approved major-change process.

Do not silence notices globally or repurpose a deprecated hook name with a new signature. For blocks and stored content, preserve parsing and rendering even after the inserter UI changes.

The source procedure is the pinned [deprecation guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/deprecating-features.md); see also [deprecated hooks](../../reference/hooks/deprecated-hooks-and-replacements.md).
