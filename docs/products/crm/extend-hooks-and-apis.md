---
title: Extend Jetpack CRM, hooks, and APIs
description: Start CRM integrations from the owning API documentation, examples, permissions, and repository rather than Jetpack monorepo internals.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: crm
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack CRM extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"CRM API","type":"object","required":false,"defaultValue":"","description":"Follow the pinned external CRM API documentation for authentication, permissions, pagination, and errors.","values":"","deprecated":false},{"name":"CRM hooks","type":"object","required":false,"defaultValue":"","description":"Use only current hooks documented and owned by the CRM project.","values":"","deprecated":false},{"name":"Jetpack Forms integration","type":"object","required":false,"defaultValue":"","description":"Use the CRM-owned extension and Forms integration instead of writing directly to CRM tables.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack CRM's extension contracts are owned outside the Jetpack monorepo. Use the [pinned API documentation source](https://github.com/Automattic/jetpack-crm-api-docs/blob/c2a53fd8d6de70f27c87bd15652ccacf0ecabd3f/source/index.html.md#L16-L90), compare examples with the pinned CRM implementation, and verify behavior against the installed version.

## Choose a supported route

| Need | Route |
| --- | --- |
| Read or write CRM records from an integration | Start with the owning API documentation and its authentication, permission, pagination, and error contracts. |
| Customize CRM's local PHP behavior | Use only hooks documented or maintained by the CRM project; verify their definitions in the [pinned CRM source](https://github.com/Automattic/jetpack-crm/tree/8dbe017c517819a7f6c583dff6e4cb8819a7f72e). |
| Capture a Jetpack Form response | Enable the CRM-owned Jetpack Forms extension and the Forms integration; do not insert directly into CRM tables. |
| Change a CRM contract | Open the design and implementation change in the CRM repository, with tests and a migration path. |

The public API root is `/zbs_api/`; pretty permalinks are required, `/status` is the first availability check, and list operations use the documented pagination and assignment fields. Do not confuse that published API with local `zbscrm/v1` routes: those are an administrator/AJAX implementation surface protected by WordPress REST nonces and CRM capability callbacks.

For local display extension, use the curated [jetpack-crm-contact-vital-tabs](/docs/reference/hooks/filters/jetpack-crm-contact-vital-tabs/) and [jetpack-crm-company-vital-tabs](/docs/reference/hooks/filters/jetpack-crm-company-vital-tabs/) contracts. Both hooks filter a tab-definition array; they are not actions. The public company code example still uses the stale name `zbs-company-vital-tabs`; the current source uses `jetpack-crm-company-vital-tabs`. Do not reproduce old client-portal hook examples whose names are absent from the reviewed source.

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
