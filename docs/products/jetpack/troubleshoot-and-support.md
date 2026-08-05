---
title: Troubleshoot and support Jetpack
description: Isolate Jetpack connection, feature, compatibility, and service failures and collect safe evidence for the right support route.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: jetpack
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Does Jetpack report a healthy site connection, owner, and current-user state for this feature?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eRun the current connection health checks and inspect accidental offline mode before resetting or reconnecting anything.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eThe selected module works for the intended role, the site and user connection states are understood, and no unrelated module changed.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Start with the smallest failing outcome. “Jetpack is broken” can describe a connection failure, one disabled module, a browser-side editor error, a theme conflict, a blocked service request, or a problem in a separate Jetpack product.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| Jetpack reports a connection problem | Run the built-in health inventory and separate site token, overall connection, owner, current user, outbound HTTP/HTTPS, identity mismatch, token health, remote reachability, port, and XML parser failures. Do not disconnect first. |
| wp-admin appears connected but a feature is unavailable | Check whether that module requires a site connection, a current-user connection, a plan class, or a non-offline state. A healthy site token alone may be insufficient. |
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

Where WP-CLI is available, `wp jetpack status` gives the basic state and `wp jetpack status full` adds more detail. Use the module inspection commands documented by the installed Jetpack CLI to confirm active and available modules; redact tokens and private site details before sharing output.

Do not paste connection tokens, request authorization headers, private site URLs, full database rows, or raw customer content into public issues. A screenshot can expose the same data as a log.

## Recovery

For a local regression, roll back only through a recoverable plugin deployment or backup and then retest the same outcome. If deactivation removes blocks or service behavior, inspect affected public pages before leaving the plugin disabled. Preserve a copy of relevant logs and version numbers before updating or rolling back.

## Get help

- Use [Jetpack support](https://jetpack.com/support/) for setup, account, connection, product availability, and site-specific service questions.
- Use the [WordPress.org support forum](https://wordpress.org/support/plugin/jetpack/) for public, non-sensitive plugin questions.
- Open a [Jetpack GitHub issue](https://github.com/Automattic/jetpack/issues) only for a reproducible public-source defect, with minimal steps and sanitized evidence.
- Report vulnerabilities through [Automattic Security](https://automattic.com/security/), not a public issue.

If the failure belongs to a dedicated product, switch to that product's troubleshooting page so its service, ownership, and rollback rules are applied.
