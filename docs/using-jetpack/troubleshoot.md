---
title: Troubleshoot Jetpack
description: Isolate product, connection, environment, and service failures before making a risky change.
audience: site-user
document_type: troubleshooting
sidebar_position: 70
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

## Establish the failure

Record one reproducible action, the expected result, the actual result, and when it last worked. Test with representative synthetic content and note whether the failure affects administrators, signed-out visitors, scheduled work, or only one browser.

## Isolate the layer

1. **Environment:** Confirm supported WordPress/PHP versions, HTTPS, cron, disk space, and outbound requests.
2. **Plugin:** Confirm the intended Jetpack product is active and complete.
3. **Connection:** Check site and user authorization separately.
4. **Conflict:** Reproduce on staging with a default theme and unrelated plugins disabled, when safe.
5. **Cache/index:** Determine whether stale output, an indexing delay, or a background job explains the result.
6. **Service:** Check the product's status/support channel before repeatedly changing local configuration.

## Roll back deliberately

Reverse only the last scoped change. Do not disconnect Jetpack, delete data, purge every cache, and reinstall simultaneously: that destroys evidence and introduces new variables.

Prepare [safe diagnostics](safe-diagnostics.md), then use the matching product's **Troubleshoot and support** page.
