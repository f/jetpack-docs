---
title: "Use and configure VaultPress Backup"
description: "Verify backup health, choose recovery points, and restore WordPress data without losing newer business activity."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "backup"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm a recoverable backup","content":"\u003cp\u003eCheck the latest completed activity, included data, credentials, free space, and an independent access path.\u003c/p\u003e"},{"title":"Choose the restore scope","content":"\u003cp\u003eSelect the correct point and decide whether files, database tables, or both need restoration.\u003c/p\u003e"},{"title":"Restore and verify","content":"\u003cp\u003eProtect new writes, run the supported restore, then test content, users, media, plugins, and critical transactions.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eBackups can contain the entire site, including credentials and customer data. Restrict downloads, logs, helper scripts, and restore access; delete temporary copies securely.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Confirm backups are current

Open the Backup activity log and find a recent **Backup complete** event. Compare its time with a harmless, known change such as a staging post edit. Check again after plugin, theme, WordPress, database, or host changes. A connected site can still need attention when Jetpack no longer has valid site credentials or the most recent backup event reports an error.

Limit restore and download access to trusted administrators. Backup archives can contain credentials, customer records, private content, and source code. Store downloaded archives encrypted and delete temporary copies according to the site's retention policy.

## Confirm the expected scope

Before an incident, document whether the site uses daily or real-time backups. Daily backups normally run about 24 hours after the previous backup. Real-time coverage records supported WordPress and WooCommerce database changes and associated file changes as they occur, while other changes can still be captured daily.

VaultPress Backup includes eligible database tables with a primary or unique key and the site's plugin, must-use plugin, theme, upload, and WordPress files. A `.donotbackup` file excludes its directory, as does a directory named `donotbackup`. Review these markers after migrations or deployment changes. A downloaded backup is a sensitive recovery copy and is not automatically exported to Google Drive, Dropbox, or another third-party store.

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
