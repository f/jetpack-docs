---
title: "Troubleshoot VaultPress Backup"
description: "Respond to stale backups, missing activity, failed downloads, and incomplete restores without risking newer data."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "backup"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage VaultPress Backup","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is there a recent completed backup and an independent way to regain access if restore fails?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck plugin connection, activity state, storage or download errors, credentials, disk space, and support status before retrying.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eThe selected restore scope completes and the same critical content, login, media, and transaction checks pass afterward.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

During an incident, preserve the current evidence. Do not uninstall Backup, disconnect Jetpack, delete activity entries, or start several restores while the first result is unknown.

## No recent backup appears

Confirm the site's Jetpack connection, active Backup entitlement, saved site credentials, and the last Backup event first. Look for a **Backup complete** event after a known harmless change and inspect any explicit credential or service error. Confirm that the site is not multisite and does not split its `siteurl` and `home` URLs. If the timeline remains stale, record the last successful time and escalate before relying on it for recovery. WordPress cron and loopback tests describe local site health, but they do not prove that the remote backup engine can reach the site or that stored credentials are valid.

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
