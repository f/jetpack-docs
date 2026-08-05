---
title: "Jetpack Scan"
description: "Review malware and security threats, scan history, and supported remediation through Jetpack's connected Scan product."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "scan"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Scan is Jetpack's connected malware-scanning and threat-remediation product. It reports active threats and scan history and can offer fix, ignore, or detail flows when supported for a finding. In the Jetpack monorepo, the native administrator experience is owned by `projects/packages/scan`; there is no separate `projects/plugins/scan` project.

Scan can be surfaced by the main Jetpack plugin and by related security experiences such as [Jetpack Protect](/docs/products/protect/). Protect's known-vulnerability checks and Scan's malware or file-level threat analysis answer different questions. A site may need both.

## Treat findings as an incident signal

A threat result needs context: affected path or component, signature, detection time, whether a fix is available, and whether the site shows signs of unauthorized access. Before changing files, preserve logs and a current backup. If credentials or privileged accounts may be compromised, rotate them through a known-clean device and investigate persistence.

An empty result is not proof that every part of a site is trustworthy. Keep WordPress and dependencies current, remove unused software, use least privilege and multifactor authentication, maintain off-site backups, and monitor host and application logs.

## Start here

1. Confirm the site has the Scan product and a healthy Jetpack connection.
2. Open the Scan dashboard and let the current scan finish.
3. Review active threats before using a bulk action.
4. Take a current backup and capture the finding details privately.
5. Apply a supported fix on staging when practical, then verify the site and scan again.
6. Escalate an active compromise rather than repeatedly ignoring or fixing symptoms.

Read [Use and configure](/docs/products/scan/use-and-configure/) for the response workflow and [Troubleshoot and support](/docs/products/scan/troubleshoot-and-support/) for failures. Scan does not publish its dashboard REST bridges as a third-party API; see [Extend, hooks, and APIs](/docs/products/scan/extend-hooks-and-apis/).

Source evidence: [Scan package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/scan) and [Jetpack Scan support](https://jetpack.com/support/scan/).
