---
title: "Use and configure VaultPress Backup"
description: "Verify backup health, choose recovery points, and restore WordPress data without losing newer business activity."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "backup"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

## Confirm backups are current

Open the Backup activity log and find a recent **Backup complete** event. Compare its time with a harmless, known change such as a staging post edit. Check again after plugin, theme, WordPress, database, or host changes. A connected site can still need attention if scheduled work, outbound requests, or service credentials stop working.

Limit restore and download access to trusted administrators. Backup archives can contain credentials, customer records, private content, and source code. Store downloaded archives encrypted and delete temporary copies according to the site's retention policy.

## Choose a restore point

Use the activity timeline to identify the last known-good state before the incident. Record:

- The event that introduced the problem.
- Orders, comments, form entries, account changes, or content created afterward.
- Whether the incident affected files, the database, or both.
- Whether a security compromise requires rotating credentials and removing persistence in addition to restoring.

If the UI offers a selective restore or a way to preserve newer WooCommerce data, review the resulting scope carefully. “Keep orders” does not automatically account for every custom commerce table or third-party integration.

## Restore safely

1. Put the site into the least disruptive maintenance state that prevents new writes.
2. Take or request a fresh pre-restore backup when the system is safe enough to do so.
3. Select the point and components to restore.
4. Keep the restore screen open, but do not start competing deployments or database writes.
5. Wait for an explicit completed or failed result.
6. Clear caches and verify the front end, administrator login, media, forms, scheduled tasks, orders, and external integrations.
7. Reconcile data created after the restore point before reopening writes.

For a security incident, a clean restore is only one step: update vulnerable software, rotate compromised credentials, inspect privileged users and scheduled tasks, and run the appropriate security checks.

Follow the current [VaultPress Backup support documentation](https://jetpack.com/support/backup/) for the active interface. If the timeline is stale or a restore fails, use [Troubleshoot and support](/docs/products/backup/troubleshoot-and-support/).
