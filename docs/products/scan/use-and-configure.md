---
title: "Use and configure Jetpack Scan"
description: "Review scan history, assess threats, and apply supported fixes with evidence and recovery in place."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "scan"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm Scan status","content":"\u003cp\u003eVerify connection, last successful scan, backups, site access, and authority before taking remediation action.\u003c/p\u003e"},{"title":"Assess one threat","content":"\u003cp\u003eInspect the affected path, signature, modification evidence, and whether the component can be replaced safely.\u003c/p\u003e"},{"title":"Remediate and rescan","content":"\u003cp\u003eUse the supported fix or a controlled clean replacement, rotate affected credentials, and confirm the threat stays clear.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eThreat evidence may contain file paths, vulnerable code, credentials, or personal data. Keep raw samples private and use the security reporting route for vulnerabilities.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Confirm Scan can operate

Use an authorized administrator account to complete the Jetpack site and user connection and activate the Scan product shown for the site. The native screen requires `manage_options`, a connected user, and a non-multisite installation. At the pinned revision it also depends on the `rsm_jetpack_ui_modernization_scan` rollout flag, so use the supported Scan presentation offered to the site rather than forcing that internal flag. Confirm the dashboard can load current status and scan history. Configure notifications for a monitored address, then record who owns first response.

Scan exchanges security status with connected Jetpack services. Restrict dashboard access and keep threat paths and reports out of public logs. Document the service in the site's security and privacy records.

## Assess a threat

Open the finding and record, privately:

- The signature or finding identifier.
- Affected file, component, or data area.
- First and latest detection times.
- Whether the item is fixable, ignored, or unresolved.
- Recent deployments, administrator changes, and suspicious requests.

Do not execute or download a suspected file to inspect it on your workstation. Compare it through safe tooling or involve an incident responder.

## Choose a response

- **Fix** only after confirming a current backup and understanding what the automated action will change. Test on staging when the site state allows it.
- **Replace or update** a compromised plugin, theme, or core file from a trusted distribution source. Remove unused components entirely.
- **Ignore** only when a qualified review proves the finding is expected and safe. Record the reason and review date; ignore is not cleanup.
- **Escalate** when threats reappear, privileged accounts changed, credentials may be exposed, or the affected scope is unclear.

After any fix, rotate relevant credentials, inspect administrator accounts and scheduled tasks, clear caches, update vulnerable entry points, and run another scan. Verify public pages, login, forms, commerce, webhooks, and background jobs before closing the incident.

## Existing infections

A scan result may reveal a compromise that predates the product. Removing one detected file may not remove persistence or stolen credentials. Follow [Jetpack's hacked-site guidance](https://jetpack.com/support/scan/how-to-clean-your-hacked-wordpress-site/) and use professional incident response when the scope is uncertain.

For a stale scan, failed fix, or recurring threat, continue to [Troubleshoot and support](/docs/products/scan/troubleshoot-and-support/).
