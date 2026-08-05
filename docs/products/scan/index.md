---
title: "Jetpack Scan"
description: "Review malware and security threats, scan history, and supported remediation through Jetpack's connected Scan product."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "scan"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Scan","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Scan setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Scan and verify its primary outcome.","url":"/docs/products/scan/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/scan/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/scan/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/scan/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eThreat evidence may contain file paths, vulnerable code, credentials, or personal data. Keep raw samples private and use the security reporting route for vulnerabilities.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Scan is Jetpack's connected malware-scanning and threat-remediation product. It reports active threats and scan history and can offer fix, ignore, or detail flows when supported for a finding. In the Jetpack monorepo, the native administrator experience is owned by `projects/packages/scan`; there is no separate `projects/plugins/scan` project. That native wp-admin screen is behind the `rsm_jetpack_ui_modernization_scan` rollout flag at the pinned revision and is not the only possible Scan presentation.

Scan can be surfaced by the main Jetpack plugin and by related security experiences such as [Jetpack Protect](/docs/products/protect/). Protect's known-vulnerability checks and Scan's malware or file-level threat analysis answer different questions. A site may need both. The reviewed native screen is unavailable on multisite and requires an administrator with `manage_options` plus a connected Jetpack user.

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

Source evidence: [Scan package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/scan) and [Jetpack Scan support](https://jetpack.com/support/scan/).
