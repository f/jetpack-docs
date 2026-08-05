---
title: Understand connection and authentication
description: Distinguish Jetpack site registration, user authorization, and local WordPress permissions.
audience: developer
document_type: overview
sidebar_position: 60
sidebar_collapsed: true
---

Jetpack connection has two related identities. A **site connection** registers the WordPress site with Jetpack services. A **user connection** associates a local WordPress user with a WordPress.com account when a feature requires user-scoped authorization. A site can therefore be registered while the current user is not connected.

Your integration must still enforce local WordPress capabilities. A connected account is not a substitute for `current_user_can()`, a nonce, input validation, or a REST permission callback.

## Integration rules

- Use the public Connection package or product contract instead of reading connection options directly.
- Ask for connection only when the selected feature requires it; offline mode intentionally supports local development without cloud calls.
- Do not store, display, transmit, or log site secrets, user tokens, authorization query strings, or signed request material.
- Treat reconnect, staging/safe mode, domain changes, ownership transfer, and user disconnect as normal lifecycle states.
- Make remote failures recoverable and preserve local administration where possible.

For a deeper component map, see [Connection and Sync](../reference/connection-and-sync.md). For WordPress REST requests, see [authentication](../reference/rest-api/authentication.md).
