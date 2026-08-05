---
title: "Troubleshoot VaultPress Backup"
description: "Respond to stale backups, missing activity, failed downloads, and incomplete restores without risking newer data."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "backup"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

During an incident, preserve the current evidence. Do not uninstall Backup, disconnect Jetpack, delete activity entries, or start several restores while the first result is unknown.

## No recent backup appears

Confirm the site's connection and active Backup product, then check WordPress cron, outbound HTTPS, loopback health, available disk space, and recent host or security changes. Look for a **Backup complete** event after a known harmless change. If the timeline remains stale, record the last successful time and escalate before relying on it for recovery.

## Activity is present but a download fails

Retry once in a current browser session after confirming administrator access. Check pop-up/download blocking and available local storage. Do not paste a signed archive URL into a public ticket; it may grant temporary access to sensitive site data.

## A restore is stuck or reports failure

Stop deployments and new content writes. Record the restore point, selected scope, start time, and exact redacted status. Check whether the site or host changed credentials, paths, permissions, database access, firewall rules, or connection state. Do not begin a second restore until the first operation's state is known.

If the site is partially available, capture front-end and admin symptoms without manually editing restored files or tables. Mixing manual repair with an active restore makes the final state harder to establish.

## Restore completed but data is wrong

Purge caches first, then verify the selected timestamp and components. Compare critical files and database records to the activity timeline. Reconcile orders, accounts, comments, form entries, and external-system changes created after the restore point. If the restore followed a compromise, rotate credentials and close the original vulnerability before reopening the site.

## Safe support report

Include WordPress, PHP, Backup plugin, host, and relevant security/cache versions; last successful backup; affected public site URL; restore point and scope; timestamps; and redacted error text. Never include archive URLs, cookies, nonces, connection tokens, SSH/database credentials, or customer records.

Use [VaultPress Backup support](https://jetpack.com/support/backup/) for current recovery guidance and [Jetpack support](https://jetpack.com/contact-support/) for account or connected-service investigation. If the issue is security-related, use the private security channel appropriate to the product rather than a public issue.
