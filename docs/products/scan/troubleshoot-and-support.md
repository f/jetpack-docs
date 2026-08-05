---
title: "Troubleshoot Jetpack Scan"
description: "Respond to unavailable scans, failed fixes, ignored findings, and recurring threats without losing evidence."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "scan"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

If the site may be actively compromised, preserve host, application, and access logs; restrict unnecessary writes; take a current backup when safe; and involve an incident responder. Do not make the site public again merely because one finding was removed.

## Scan status is unavailable or stale

Confirm the Jetpack connection and active Scan product, then check outbound HTTPS, REST health, WordPress cron, loopbacks, and host/security rules. Record the last successful scan time and dashboard error. Avoid clearing Scan options or reconnecting repeatedly before support can use that evidence.

## A fix fails or never completes

Do not submit the fix again. Record the threat identifier, requested action, start time, and redacted status. Confirm the backup, filesystem ownership and permissions, available disk space, and whether a deployment changed files during remediation. Keep the site controlled until the operation's final state is known.

## A threat returns

Reappearance can indicate an unfixed vulnerable entry point, a second infected file, compromised credentials, a malicious scheduled task, or a deployment restoring bad code. Rotate credentials, update or remove vulnerable software, inspect privileged users and jobs, and review logs around each detection. Escalate instead of repeating a one-click fix indefinitely.

## An ignored threat should be restored

Open ignored findings and reverse the decision through the supported UI. If that is unavailable, capture the finding and contact support; do not edit Scan's cached options or database records directly. Record why the previous exception no longer applies.

## Site is broken after remediation

Stop new writes, clear caches, and compare the changed component with a trusted distribution. Use the current backup and activity timeline to choose a controlled recovery path. Do not download or run the suspicious file on a personal computer.

Include WordPress, PHP, Jetpack/Protect, host, and security-layer versions; last successful scan; threat ID and broad type; timestamps; and redacted errors in a support report. Never publish cookies, nonces, connection tokens, private file paths, malware contents, or customer data. Use [Jetpack Scan support](https://jetpack.com/support/scan/) and [Jetpack support](https://jetpack.com/contact-support/) for connected-service investigation.
