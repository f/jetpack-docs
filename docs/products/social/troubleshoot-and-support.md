---
title: Troubleshoot and support Jetpack Social
description: Diagnose Social connection, permission, scheduling, media, and destination failures without leaking account credentials.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: social
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Social","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is the correct destination connected to the publishing user or intentionally shared with the required role?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck site connection, destination authorization, sharing policy, publish capability, and whether the post type is supported.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eOne controlled post reaches each selected destination once with the intended text, canonical URL, and media.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Check both sides of the workflow: WordPress can record a share attempt while the destination account rejects, delays, reformats, or removes the post. Before retrying, look at the destination to prevent a duplicate.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| Connection is missing or expired | Confirm the correct WordPress user and destination account, current Jetpack connection, destination authorization, and whether the connection was personal or shared. Reauthorize only after recording the error. |
| Another editor cannot use a connection | Check `publish_posts`; setting a connection to shared additionally requires `edit_others_posts`. Do not share a credential globally as a substitute for the correct role. |
| A new post was not shared | Confirm Social was enabled for that post, the post type is supported, a connection was selected, and the post reached the expected published state. Check any local publication-policy filter. |
| A scheduled post did not share | Compare the site timezone, WordPress publication timestamp, cron health, Social status, and destination result as separate stages. |
| Text or link is wrong | Inspect the editor's custom message, canonical public URL, redirect behavior, and destination-specific formatting. Purge only known cache layers and retest a new controlled post. |
| Image is missing | Confirm the image is publicly reachable, has a supported format and size, and produces correct public metadata. A destination cannot fetch a private or blocked URL. |
| WordPress reports an error but a destination post exists | Do not retry immediately. Compare timestamp and content, record the ambiguous result, and remove duplicates through the destination account if authorized. |
| Reshare is unavailable | Distinguish the initial automatic share from manual resharing and confirm the current post state, product entitlement, and destination support. |
| Per-network text is wrong | Compare the per-network customization, message template, and destination limits before changing the original post. |
| Image selection is wrong | Separate Social Image Generator output, featured image, attached media, and link-preview metadata. |
| UTM parameters are missing or duplicated | Inspect the configured UTM template and existing canonical URL once; do not stack a second tracking layer blindly. |
| Social Notes returns a 404 | Refresh the documented rewrite/permalink state and verify the Notes route with a synthetic note. |
| Open Graph tags are missing | Check whether another SEO or social plugin suppressed or replaced Jetpack's Open Graph output. |

## Safe evidence

Record WordPress, PHP, Jetpack Social, and main Jetpack versions; post ID; post type; timestamp with timezone; destination name; user role; connection ownership type; and sanitized error code. Redact tokens, cookies, authorization headers, account IDs where sensitive, private post content, and unpublished media URLs.

On staging, test one short public post to one dedicated destination connection with unrelated plugins disabled. Restore optimization, editorial, and security plugins one at a time. Do not reconnect every destination while isolating a single failure.

## Recover and get help

- Revoke an exposed or incorrectly shared connection in both WordPress and the destination account.
- Remove duplicates at the destination only after confirming which post is canonical.
- Preserve the WordPress post and evidence before rolling back the plugin.
- Re-test once after an update or controlled rollback.

Use [Jetpack Social support](https://jetpack.com/support/jetpack-social/) for current account, connection, network, and site-specific questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source defect with sanitized steps. Report unauthorized publishing or credential exposure through [Automattic Security](https://automattic.com/security/).
