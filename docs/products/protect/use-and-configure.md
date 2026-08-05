---
title: "Use and configure Jetpack Protect"
description: "Review vulnerability findings, operate security controls, and remediate components with a recoverable workflow."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "protect"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

## Establish a trustworthy baseline

Install Protect from the WordPress plugin directory, activate it, and complete the supported connection flow. Confirm the dashboard can list the site's WordPress, plugin, and theme versions. Configure notifications for an address that is monitored during the site's operating hours.

Protect needs information about installed software and, for connected capabilities, communicates with Jetpack security services. Document that processing in the site's operational and privacy records. Limit access to users responsible for security; threat details can expose installed versions and paths.

## Triage a vulnerability

For each finding:

1. Confirm the detected component and installed version.
2. Read the vulnerability details and fixed-version guidance.
3. Check whether the component is active and reachable, without assuming inactive means harmless.
4. Take a current backup and test the update on staging.
5. Update to a fixed version, replace the component, or remove it completely if it is unnecessary.
6. Verify the public site and rerun or await the next supported check.

Do not edit a plugin's version header to hide a result. Do not keep an abandoned vulnerable plugin merely because a firewall rule appears to block one known exploit.

## Operate additional controls

If the dashboard offers a web application firewall, malware scan, or automated fix, review the exact scope before enabling it. A firewall may conflict with host or edge rules; test login, REST, XML-RPC where intentionally used, webhooks, checkout, and administrator actions. Before a one-click fix, confirm the backup is current and understand which files may change.

“Ignore” is not remediation. Use it only when a qualified review establishes the finding does not apply and record the reason, owner, and review date. Revisit ignored findings after component or environment changes.

## Verify outcomes

After an update or fix, check the front end, administrator access, scheduled tasks, logs, forms, commerce, and external integrations. Confirm Protect reports the component's new version and the finding clears. If malware or unauthorized changes are suspected, continue with [Jetpack Scan](/docs/products/scan/use-and-configure/) and an incident-response process.

For current product controls, use [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/). For abnormal results, follow [Troubleshoot and support](/docs/products/protect/troubleshoot-and-support/).
