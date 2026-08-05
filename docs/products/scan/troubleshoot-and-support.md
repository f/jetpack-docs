---
title: "Troubleshoot Jetpack Scan"
description: "Respond to unavailable scans, failed fixes, ignored findings, and recurring threats without losing evidence."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "scan"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Scan","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is Scan current and connected, and do you have a recent backup plus independent administrative access?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eRestore scanner status first; preserve the threat evidence and avoid repeated fixes while state is stale.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eA rescan remains clear and file integrity, login, editor, public pages, scheduled tasks, and credential rotation are verified.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

If the site may be actively compromised, preserve host, application, and access logs; restrict unnecessary writes; take a current backup when safe; and involve an incident responder. Do not make the site public again merely because one finding was removed.

## Scan status is unavailable or stale

Confirm the active Scan product, Jetpack site connection, connected user, administrator's `manage_options` capability, and whether the installation is multisite. The native wp-admin screen also depends on its current rollout gate; do not force an internal flag when another supported Scan surface is available. Record the last successful remote scan time and dashboard error. Outbound HTTPS and REST health can explain a broken UI bridge, but local cron only refreshes cached menu/status information and does not prove that remote scanning is operating. Avoid clearing Scan options or reconnecting repeatedly before support can use that evidence.

## A fix fails or never completes

Do not submit the fix again. Record the threat identifier, requested action, start time, and redacted status. Confirm the backup, filesystem ownership and permissions, available disk space, and whether a deployment changed files during remediation. Keep the site controlled until the operation's final state is known.

## A threat returns

Reappearance can indicate an unfixed vulnerable entry point, a second infected file, compromised credentials, a malicious scheduled task, or a deployment restoring bad code. Rotate credentials, update or remove vulnerable software, inspect privileged users and jobs, and review logs around each detection. Escalate instead of repeating a one-click fix indefinitely.

## An ignored threat should be restored

Open ignored findings and reverse the decision through the supported UI. If that is unavailable, capture the finding and contact support; do not edit Scan's cached options or database records directly. Record why the previous exception no longer applies.

## Site is broken after remediation

Stop new writes, clear caches, and compare the changed component with a trusted distribution. Use the current backup and activity timeline to choose a controlled recovery path. Do not download or run the suspicious file on a personal computer.

Include WordPress, PHP, Jetpack/Protect, host, and security-layer versions; last successful scan; threat ID and broad type; timestamps; and redacted errors in a support report. Never publish cookies, nonces, connection tokens, private file paths, malware contents, or customer data. Use [Jetpack Scan support](https://jetpack.com/support/scan/) and [Jetpack support](https://jetpack.com/contact-support/) for connected-service investigation.
