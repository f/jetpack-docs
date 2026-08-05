---
title: "VaultPress Backup"
description: "Protect WordPress files and database changes with off-site backups, activity history, and guided restores."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "backup"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"VaultPress Backup","title":"Choose the next lifecycle step","description":"Move from a safe VaultPress Backup setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up VaultPress Backup and verify its primary outcome.","url":"/docs/products/backup/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/backup/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/backup/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/backup/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eBackups can contain the entire site, including credentials and customer data. Restrict downloads, logs, helper scripts, and restore access; delete temporary copies securely.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

VaultPress Backup is Jetpack's connected backup and restore product. The standalone `projects/plugins/backup` plugin supplies the product shell, while `projects/packages/backup` owns much of the shared WordPress dashboard and service-bridge behavior.

The pinned standalone plugin requires WordPress 6.9 or later, PHP 7.2 or later, a paid Jetpack product that includes Backup, and a working Jetpack connection. It does not support WordPress multisite or installations where the WordPress address (`siteurl`) and site address (`home`) use different URLs.

Backups are stored away from the WordPress host and appear alongside site events so an administrator can choose a point to restore or download. The exact schedule, retention, restore controls, and service availability depend on the active product shown for the site; check the dashboard instead of relying on an old plan comparison.

Daily backups run automatically, approximately once every 24 hours. Real-time backups respond to changes in WordPress core tables, supported WooCommerce tables, and associated files; other changes can remain daily. Both modes cover eligible database tables and files under `plugins`, `mu-plugins`, `themes`, and `uploads`. A `.donotbackup` marker or a directory named `donotbackup` intentionally excludes that directory, so audit exclusions before treating an archive as complete.

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

Source evidence: [Backup plugin](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/backup), [Backup package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup), and [VaultPress Backup support](https://jetpack.com/support/backup/).
