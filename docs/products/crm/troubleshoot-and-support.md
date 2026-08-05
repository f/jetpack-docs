---
title: Troubleshoot and support Jetpack CRM
description: Diagnose CRM activation, permissions, records, extensions, and Jetpack Forms integration while protecting customer data.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: crm
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Reproduce with a synthetic contact and record. Do not post customer names, addresses, notes, invoices, exports, database rows, cookies, or credentials in a public support channel.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| CRM will not activate or wp-admin fails | Confirm current WordPress and PHP requirements on the [plugin listing](https://wordpress.org/plugins/zero-bs-crm/), capture the sanitized PHP error, and restore access through the host's recovery path. |
| A user cannot see or edit records | Check the user's role and CRM capabilities, record ownership, and extension-specific permissions. Do not grant administrator access merely to hide the symptom. |
| Import created missing or duplicate data | Stop additional imports, preserve the source file securely, compare field mapping and identifiers, and restore or reverse on staging before touching production. |
| An extension fails | Confirm core CRM record operations first, then check only that extension's activation, authorization, configuration, and logs. |
| Jetpack Form response is not in CRM | Confirm the response exists in Forms, CRM is active, the CRM Jetpack Forms extension is enabled, the specific form integration is configured, and the synthetic submission maps to the expected record. |
| Export is incomplete or exposed | Stop distribution, restrict access to the file, verify filters and permissions, and follow the organization's incident process if real data was accessible. |

## Safe evidence

Record the WordPress, PHP, CRM, Jetpack, and Jetpack Forms versions; timestamp with timezone; user role; enabled extension name; exact action; and whether the core CRM and integration outcomes succeeded independently. Replace customer values with field names and synthetic markers. Redact paths or URLs that reveal private systems.

On staging, repeat with the current CRM plugin, a default theme, and only the minimum related plugins. Restore other extensions one at a time. Keep a backup before repair, migration, bulk deletion, deduplication, or re-import.

## Route the problem

- Use the [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) for current setup and operating guidance.
- Use the CRM project's documented support route for site-specific product and extension questions.
- Open a [CRM GitHub issue](https://github.com/Automattic/jetpack-crm/issues) for a reproducible public-source CRM defect with synthetic steps.
- Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) only when evidence shows the defect is in the Jetpack-owned Forms package or integration UI.
- Report unauthorized record access, export exposure, injection, or another vulnerability through [Automattic Security](https://automattic.com/security/).

Do not move a CRM issue into the Jetpack monorepo simply because the product name includes Jetpack. Repository ownership determines where the fix and tests belong.
