---
title: Troubleshoot and support Jetpack CRM
description: Diagnose CRM activation, permissions, records, extensions, and Jetpack Forms integration while protecting customer data.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: crm
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack CRM","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Can the intended CRM role create and read a synthetic record without elevated access?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck CRM capabilities, ownership, extension activation, and schema state in the external CRM project.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eSynthetic records follow the intended permissions and retention path, and a Forms integration creates one expected CRM record.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

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
| Published API `/status` fails | Confirm pretty permalinks, HTTPS, the `/zbs_api/` root, and whether the response is 401, 403, or 405 before changing credentials or method. |
| Client Portal fails | Check rewrite rules, portal endpoint, contact-to-user association, and the Contact role without exposing the customer's record. |
| Quote, invoice, or transaction is detached | Verify the related contact/company IDs, currency, ownership, and extension state before repairing relationships. |
| WooCommerce Sync delays or duplicates | Stop repeated imports, preserve timestamps and synthetic identifiers, and compare Sync ownership/deduplication settings. |
| Mail is not delivered | Separate CRM generation from WordPress/host delivery and capture a sanitized system-email result. |

## Safe evidence

Record the WordPress, PHP, CRM, Jetpack, and Jetpack Forms versions; timestamp with timezone; user role; enabled extension name; exact action; and whether the core CRM and integration outcomes succeeded independently. Replace customer values with field names and synthetic markers. Redact paths or URLs that reveal private systems.

On staging, repeat with the current CRM plugin, a default theme, and only the minimum related plugins. Restore other extensions one at a time. Keep a backup before repair, migration, bulk deletion, deduplication, or re-import.

## Route the problem

- Use the [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) for current setup and operating guidance.
- Use the [CRM support ticket route](https://kb.jetpackcrm.com/submit-a-ticket) for site-specific product and extension questions.
- Open a [CRM GitHub issue](https://github.com/Automattic/jetpack-crm/issues) for a reproducible public-source CRM defect with synthetic steps.
- Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) only when evidence shows the defect is in the Jetpack-owned Forms package or integration UI.
- Report unauthorized record access, export exposure, injection, or another vulnerability through [Automattic Security](https://automattic.com/security/).

Do not move a CRM issue into the Jetpack monorepo simply because the product name includes Jetpack. Repository ownership determines where the fix and tests belong.
