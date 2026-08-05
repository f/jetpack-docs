---
title: Give your agent reliable Jetpack context
description: Define the product, source, environment, constraints, and acceptance criteria before an agent starts.
audience: agent-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

Provide context in this order:

1. **Outcome:** the observable behavior that should change.
2. **Surface:** the Jetpack product, plugin/package, UI, API, or hook involved.
3. **Versions:** WordPress, PHP, Jetpack product, and source revision.
4. **Environment:** local, staging, or production; connected or offline; single site or multisite.
5. **Evidence:** exact errors, sanitized reproduction, and relevant source paths.
6. **Constraints:** compatibility floor, privacy requirements, files or systems out of scope, and whether writes are authorized.
7. **Acceptance:** tests and visible behavior that prove completion.

Tell the agent to inspect the repository before asking where code lives. Require it to separate documented contracts from inferred implementation details and to identify uncertainty explicitly.

Do not paste credentials, private URLs, customer content, cookies, tokens, or complete request payloads. Replace them with labeled placeholders and explain the data shape only when necessary.
