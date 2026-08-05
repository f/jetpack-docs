---
title: Extend Jetpack CRM, hooks, and APIs
description: Start CRM integrations from the owning API documentation, examples, permissions, and repository rather than Jetpack monorepo internals.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: crm
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack CRM's extension contracts are owned outside the Jetpack monorepo. Use the [published CRM API reference](https://automattic.github.io/jetpack-crm-api-docs/), compare it with the [public code examples](https://github.com/Automattic/jetpack-crm-code-examples), and verify behavior against the installed CRM version.

## Choose a supported route

| Need | Route |
| --- | --- |
| Read or write CRM records from an integration | Start with the owning API documentation and its authentication, permission, pagination, and error contracts. |
| Customize CRM's local PHP behavior | Use only hooks documented or maintained by the CRM project; verify their definitions in [CRM source](https://github.com/Automattic/jetpack-crm). |
| Capture a Jetpack Form response | Enable the CRM-owned Jetpack Forms extension and the Forms integration; do not insert directly into CRM tables. |
| Change a CRM contract | Open the design and implementation change in the CRM repository, with tests and a migration path. |

This local documentation does not duplicate individual CRM hook signatures because doing so would create a second, drifting API reference. The absence of CRM hooks in the Jetpack [hooks reference](/docs/reference/hooks/) does not mean the product has no extension points; it means Jetpack does not own those contracts.

## Integration rules

- CRM API v2 requires `api_key` and `api_secret` query parameters on every request. Send them only from server-side code over HTTPS; never place them in browser code, client-visible markup, or a public repository.
- The documented credential pair grants read and write access rather than granular scopes. Isolate credentials per integration where possible, enforce the narrower business authorization in your own server, and rotate the pair after suspected exposure or when an integration is retired.
- Validate record IDs, enum values, dates, money, and user-provided text before sending them.
- Handle pagination, duplicate delivery, partial failure, and retry with idempotent operations where the API permits it.
- Redact the complete request URL and query string from access logs, exception reports, analytics, browser history, traces, and support captures because the documented authentication parameters are part of the URL.
- Log a sanitized correlation ID and result state, not whole customer records.
- Test create, read, update, delete, unauthorized, validation-error, and unavailable-service paths using synthetic data.

## Jetpack Forms boundary

The pinned Jetpack Forms source identifies the CRM plugin file as `zero-bs-crm/ZeroBSCRM.php`, points to CRM settings, and describes storing form contacts in CRM. That is integration discovery, not permission to call private CRM functions or tables. Follow the CRM extension's current contract and keep the original Forms response lifecycle intact.

When a Forms-to-CRM test fails, record whether the Forms response was stored, whether the CRM extension ran, whether a CRM record was created, and which side reported the error. Route a Forms UI or package defect to Jetpack and a CRM record or extension defect to the [CRM issue tracker](https://github.com/Automattic/jetpack-crm/issues).
