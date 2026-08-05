---
title: Collect safe diagnostic information
description: Capture enough evidence to reproduce a Jetpack problem without exposing private data.
audience: site-user
document_type: troubleshooting
sidebar_position: 80
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

Create a short diagnostic bundle containing:

- WordPress, PHP, theme, and affected Jetpack product versions.
- Site environment type and whether the problem reproduces on staging.
- Exact action, expected result, actual result, and timestamp with timezone.
- Connection state and relevant product settings, with identifiers redacted.
- A minimal synthetic example and the smallest reproducible plugin/theme set.
- Sanitized PHP/browser errors and request status codes.
- What changed immediately before the problem and what rollback was attempted.

Remove access tokens, cookies, nonces, email addresses, form submissions, private content, server paths, customer identifiers, and complete request bodies. Share a secret only through an approved secure support channel that explicitly requires it—never in a public issue or repository.
