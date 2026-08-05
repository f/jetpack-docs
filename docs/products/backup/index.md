---
title: "VaultPress Backup"
description: "Protect WordPress files and database changes with off-site backups, activity history, and guided restores."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "backup"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

VaultPress Backup is Jetpack's connected backup and restore product. The standalone `projects/plugins/backup` plugin supplies the product shell, while `projects/packages/backup` owns much of the shared WordPress dashboard and service-bridge behavior.

Backups are stored away from the WordPress host and appear alongside site events so an administrator can choose a point to restore or download. The exact schedule, retention, restore controls, and service availability depend on the active product shown for the site; check the dashboard instead of relying on an old plan comparison.

## What a backup strategy still needs

Backup is a recovery tool, not a reason to skip change control. Define:

- Who can view activity, download copies, and start restores.
- Which events require a restore and which should be corrected manually.
- How orders, customers, submissions, or other data created after a restore point will be handled.
- A separate record of DNS, host, account, and encryption access needed during a total outage.
- A regular restore test on a non-production destination.

Keep a second recovery path appropriate to the site's risk. A dashboard showing recent backups is useful, but a tested restore proves more.

## Start here

1. Install and activate VaultPress Backup or enable Backup through the site's Jetpack product flow.
2. Complete the Jetpack connection and any service setup shown in the dashboard.
3. Wait for a **Backup complete** event in the activity log.
4. Confirm recent file and database changes appear in the expected timeline.
5. Download or restore a non-production copy and verify login, content, media, and critical transactions.

Use [Use and configure](/docs/products/backup/use-and-configure/) for routine operation and [Troubleshoot and support](/docs/products/backup/troubleshoot-and-support/) before an emergency. Developers should treat restore routes as authenticated product internals; see [Extend, hooks, and APIs](/docs/products/backup/extend-hooks-and-apis/).

Source evidence: [Backup plugin](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/backup), [Backup package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/backup), and [VaultPress Backup support](https://jetpack.com/support/backup/).
