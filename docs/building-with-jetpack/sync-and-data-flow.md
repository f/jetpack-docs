---
title: Understand Sync and data flow
description: Design integrations around Jetpack Sync events, queues, allowlists, and data boundaries.
audience: developer
document_type: overview
sidebar_position: 70
sidebar_collapsed: true
---

Jetpack Sync observes selected WordPress changes, represents them as actions, and sends queued data through the connected-site transport. It is not a general event bus or a license to transmit arbitrary site content.

## Before extending Sync

1. Confirm that the owning product documents Sync as its supported integration surface.
2. Identify the WordPress event and the minimum fields needed by the remote consumer.
3. Check allowlists and data-sanitization behavior in the pinned `projects/packages/sync` source.
4. Design for queue delay, replay, duplicate delivery, full sync, and a temporarily unavailable connection.
5. Provide a privacy description, retention expectation, and deletion path for new data.

Never attach secrets to a Sync action. Avoid large payloads and unstable objects; send stable identifiers and allow the supported Sync layer to serialize the documented data. A successful local hook does not prove remote delivery, so test the queue and receiving behavior separately.

Most third-party plugins should use their own authenticated API or a documented Jetpack product hook rather than modifying Sync internals. See [Connection and Sync reference](../reference/connection-and-sync.md).
