---
title: "Use and configure Jetpack Scan"
description: "Review scan history, assess threats, and apply supported fixes with evidence and recovery in place."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "scan"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

## Confirm Scan can operate

Use an authorized administrator account to complete the Jetpack connection and activate the Scan product shown for the site. Confirm the dashboard can load current status and scan history. Configure notifications for a monitored address, then record who owns first response.

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
