---
title: Troubleshoot and support Jetpack Social
description: Diagnose Social connection, permission, scheduling, media, and destination failures without leaking account credentials.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: social
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Check both sides of the workflow: WordPress can record a share attempt while the destination account rejects, delays, reformats, or removes the post. Before retrying, look at the destination to prevent a duplicate.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| Connection is missing or expired | Confirm the correct WordPress user and destination account, current Jetpack connection, destination authorization, and whether the connection was personal or shared. Reauthorize only after recording the error. |
| Another editor cannot use a connection | Check the editor's publish capability and the connection's sharing setting. Do not share a credential globally as a substitute for the correct role. |
| A new post was not shared | Confirm Social was enabled for that post, the post type is supported, a connection was selected, and the post reached the expected published state. Check any local publication-policy filter. |
| A scheduled post did not share | Compare the site timezone, WordPress publication timestamp, cron health, Social status, and destination result as separate stages. |
| Text or link is wrong | Inspect the editor's custom message, canonical public URL, redirect behavior, and destination-specific formatting. Purge only known cache layers and retest a new controlled post. |
| Image is missing | Confirm the image is publicly reachable, has a supported format and size, and produces correct public metadata. A destination cannot fetch a private or blocked URL. |
| WordPress reports an error but a destination post exists | Do not retry immediately. Compare timestamp and content, record the ambiguous result, and remove duplicates through the destination account if authorized. |

## Safe evidence

Record WordPress, PHP, Jetpack Social, and main Jetpack versions; post ID; post type; timestamp with timezone; destination name; user role; connection ownership type; and sanitized error code. Redact tokens, cookies, authorization headers, account IDs where sensitive, private post content, and unpublished media URLs.

On staging, test one short public post to one dedicated destination connection with unrelated plugins disabled. Restore optimization, editorial, and security plugins one at a time. Do not reconnect every destination while isolating a single failure.

## Recover and get help

- Revoke an exposed or incorrectly shared connection in both WordPress and the destination account.
- Remove duplicates at the destination only after confirming which post is canonical.
- Preserve the WordPress post and evidence before rolling back the plugin.
- Re-test once after an update or controlled rollback.

Use [Jetpack Social support](https://jetpack.com/support/jetpack-social/) for current account, connection, network, and site-specific questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source defect with sanitized steps. Report unauthorized publishing or credential exposure through [Automattic Security](https://automattic.com/security/).
