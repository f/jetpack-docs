---
title: Troubleshoot and support Jetpack
description: Isolate Jetpack connection, feature, compatibility, and service failures and collect safe evidence for the right support route.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: jetpack
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Start with the smallest failing outcome. “Jetpack is broken” can describe a connection failure, one disabled module, a browser-side editor error, a theme conflict, a blocked service request, or a problem in a separate Jetpack product.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| Jetpack reports the site is disconnected | Confirm the site's public URL, HTTPS, outbound requests, XML-RPC and REST reachability, account ownership, and whether a security layer blocks Jetpack traffic. Do not disconnect first. |
| One feature is missing | Confirm that feature is enabled, available for this site, and not supplied by a different standalone plugin. Check the product-specific guide. |
| A block is missing or fails in the editor | Check browser console and REST errors, editor permissions, plugin build/version, and whether the block is registered. Test with a default theme and only relevant plugins on staging. |
| Front-end output is wrong | Purge only the known cache layers, then compare signed-in and signed-out requests. Inspect saved block markup before changing source. |
| wp-admin is inaccessible after activation | Use the host's recovery path or rename the plugin directory, capture the PHP fatal safely, and restore access before retrying on staging. |
| A service-backed result is delayed or unavailable | Check the product status and current support documentation, then retry with a controlled item. Avoid repeated destructive reconnects. |

## Isolate without damaging evidence

1. Reproduce once and note the exact URL, time with timezone, user role, and action.
2. Record WordPress, PHP, Jetpack, theme, and relevant standalone-plugin versions.
3. Check Site Health and server logs for the same timestamp. Redact tokens, cookies, emails, site secrets, and visitor data.
4. On staging, disable unrelated plugins and use a default theme. Change one variable per test.
5. If connection is implicated, run the current Jetpack connection checks before resetting it.
6. Restore the original configuration after the test and record whether the symptom changed.

Do not paste connection tokens, request authorization headers, private site URLs, full database rows, or raw customer content into public issues. A screenshot can expose the same data as a log.

## Recovery

For a local regression, roll back only through a recoverable plugin deployment or backup and then retest the same outcome. If deactivation removes blocks or service behavior, inspect affected public pages before leaving the plugin disabled. Preserve a copy of relevant logs and version numbers before updating or rolling back.

## Get help

- Use [Jetpack support](https://jetpack.com/support/) for setup, account, connection, product availability, and site-specific service questions.
- Use the [WordPress.org support forum](https://wordpress.org/support/plugin/jetpack/) for public, non-sensitive plugin questions.
- Open a [Jetpack GitHub issue](https://github.com/Automattic/jetpack/issues) only for a reproducible public-source defect, with minimal steps and sanitized evidence.
- Report vulnerabilities through [Automattic Security](https://automattic.com/security/), not a public issue.

If the failure belongs to a dedicated product, switch to that product's troubleshooting page so its service, ownership, and rollback rules are applied.
