---
title: Use and configure Jetpack Social
description: Connect a social account, configure sharing permissions, publish a controlled test post, and verify the destination result.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: social
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Prepare the account relationship","content":"\u003cp\u003eConfirm the Jetpack site connection, destination account, authorized WordPress user, and connection-sharing policy.\u003c/p\u003e"},{"title":"Configure publication","content":"\u003cp\u003eSelect supported destinations, decide who may publish, and set per-post message and media behavior.\u003c/p\u003e"},{"title":"Publish one controlled post","content":"\u003cp\u003eCompare WordPress publication, Jetpack Social status, and destination result before retrying or automating.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eDestination credentials and connections belong to specific users or shared policies. Do not expose tokens, assume a personal connection is shared, or retry an ambiguous publish result blindly.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

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

Creating a connection requires `publish_posts`. Marking a connection as shared requires `edit_others_posts`; do not elevate a user merely to flip that flag. A shared connection still needs an organizational owner and review date.

## Publish a controlled test

1. Create a short, non-sensitive test post with a unique title and a suitable featured image.
2. In the editor's Social panel, select only one test connection and review the message and preview.
3. Publish or schedule it once. Do not click publish repeatedly while the destination is still processing.
4. Open the destination network independently and confirm one post exists with the intended account, text, link, media, and visibility.
5. Record whether WordPress and the destination agree on the result, then remove the test post if the publishing policy allows it.

Repeat for each destination because account permissions, text limits, media support, and link presentation are network-specific.

Distinguish initial automatic publication, a manual reshare, and a scheduled share. Configure per-network text, link-preview versus attached/native media, Social Image Generator output, UTM parameters, message templates, and Social Notes separately. A preview is evidence about the selected message and media; it is not a guarantee of the destination's final rendering.

## Operate safely

- Review connected accounts and shared access when staff roles change.
- Keep editorial approval separate from technical access to a connection.
- Check the destination before retrying an ambiguous failure to avoid duplicate posts.
- Preview media and metadata on a public, cache-bypassed URL; a destination cannot fetch a private draft image.
- Use current scheduling guidance and record the site timezone. Scheduled WordPress publication and downstream social delivery are separate events.
- Disconnect a former user's connection through the product UI and, when appropriate, revoke the app from the destination account too.

If the editor reports success but the network does not, move to [Social troubleshooting](/docs/products/social/troubleshoot-and-support/) and preserve the post ID, timestamp, destination, and sanitized error before reconnecting anything.
