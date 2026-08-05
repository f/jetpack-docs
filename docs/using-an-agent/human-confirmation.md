---
title: Decide when human confirmation is required
description: Define which Jetpack actions an agent may take and which must remain human decisions.
audience: agent-user
document_type: reference
sidebar_position: 70
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

Human confirmation is required when the next action changes scope, authority, data exposure, or recovery risk. Examples include:

- Connecting or disconnecting a production site or user.
- Changing billing, plans, account ownership, or product entitlements.
- Publishing, deleting, restoring, or bulk-changing production content or data.
- Sending form, social, email, webhook, or API traffic to a real destination.
- Uploading private evidence or granting credentials and persistent access.
- Merging, releasing, or deploying code beyond the explicitly authorized repository and environment.

Low-risk local edits and read-only research can proceed when they are clearly within scope. The agent should stop when a missing choice would materially change the result, explain the consequence, and request the smallest decision needed.
