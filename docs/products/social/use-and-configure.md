---
title: Use and configure Jetpack Social
description: Connect a social account, configure sharing permissions, publish a controlled test post, and verify the destination result.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: social
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Prepare the connection

Identify the social account owner, the WordPress users who should be able to publish to it, and a recovery contact. Sign in to the intended destination account before beginning so you do not authorize a personal or test account by mistake.

Review the current [Jetpack Social documentation](https://jetpack.com/support/jetpack-social/) for supported networks, connection requirements, and installed-version UI. Destination networks can change permissions and media rules independently.

## Install and connect

1. Install and activate **Jetpack Social** from its verified [WordPress.org listing](https://wordpress.org/plugins/jetpack-social/), or use the supported Social feature in the main Jetpack plugin.
2. Confirm the site has a healthy Jetpack connection.
3. Open the Social connection settings and choose the intended network.
4. Review the destination account and requested permissions before authorizing.
5. Decide whether the connection remains owned by the connecting user or is shared with other site users. Share it only when the publishing policy requires that access.
6. Return to wp-admin and confirm the connection appears healthy without exposing its token.

## Publish a controlled test

1. Create a short, non-sensitive test post with a unique title and a suitable featured image.
2. In the editor's Social panel, select only one test connection and review the message and preview.
3. Publish or schedule it once. Do not click publish repeatedly while the destination is still processing.
4. Open the destination network independently and confirm one post exists with the intended account, text, link, media, and visibility.
5. Record whether WordPress and the destination agree on the result, then remove the test post if the publishing policy allows it.

Repeat for each destination because account permissions, text limits, media support, and link presentation are network-specific.

## Operate safely

- Review connected accounts and shared access when staff roles change.
- Keep editorial approval separate from technical access to a connection.
- Check the destination before retrying an ambiguous failure to avoid duplicate posts.
- Preview media and metadata on a public, cache-bypassed URL; a destination cannot fetch a private draft image.
- Use current scheduling guidance and record the site timezone. Scheduled WordPress publication and downstream social delivery are separate events.
- Disconnect a former user's connection through the product UI and, when appropriate, revoke the app from the destination account too.

If the editor reports success but the network does not, move to [Social troubleshooting](/docs/products/social/troubleshoot-and-support/) and preserve the post ID, timestamp, destination, and sanitized error before reconnecting anything.
