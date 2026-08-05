---
title: Connection and Sync
description: Reference Jetpack's site and user connection states, request authentication, and synchronized data flow.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
---

## Connection state

The Connection package owns site registration, site tokens, user authorization, signed remote requests, connection errors, and disconnect lifecycle. Use its public manager/status APIs rather than the `jetpack_options` row or raw token storage.

- **Site connected:** the site is registered and can use site-scoped service operations.
- **User connected:** a local user has completed user-scoped authorization.
- **Offline mode:** cloud-dependent behavior is intentionally unavailable for local development or an explicitly configured site.
- **Identity crisis or safe mode:** URLs or identity changed and Jetpack requires resolution before normal service use.

## Sync flow

<!-- wp:docspress/diagram {"title":"Connection and Sync data path","type":"sequence","source":"WordPress -> Sync: Observe an allowlisted event\nSync -> Queue: Serialize approved fields\nQueue -> Connection: Batch a signed request\nConnection -> Jetpack service: Transport the batch\nJetpack service -> Connection: Acknowledge or retry","caption":"Connection authenticates transport; Sync decides which approved events and fields enter the queue."} /-->

The Sync package listens to allowlisted WordPress events, creates Sync actions, queues them, serializes approved data, and transports batches through the connection. Initial and full sync operations reconcile broader state; incremental actions capture ongoing changes.

Consumers must tolerate queued delivery, duplicate or replayed events, connection interruption, and version differences. Adding data to Sync is a product and privacy decision, not merely a hook registration.

Primary pinned sources: [Connection package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/connection), [Sync package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/sync), and [Status package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/status).
