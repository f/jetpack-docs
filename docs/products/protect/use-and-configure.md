---
title: "Use and configure Jetpack Protect"
description: "Review vulnerability findings, operate security controls, and remediate components with a recoverable workflow."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "protect"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Establish the baseline","content":"\u003cp\u003eUpdate the site, confirm backups, record versions, and review who may view or change security findings.\u003c/p\u003e"},{"title":"Triage one finding","content":"\u003cp\u003eVerify the component and version, read the remediation, and test the proposed update or mitigation on staging.\u003c/p\u003e"},{"title":"Remediate and rescan","content":"\u003cp\u003eApply the smallest supported change, check site behavior, and confirm the finding status updates.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eSecurity findings and diagnostic data can expose vulnerable versions or site details. Share the minimum evidence through the official support or security channel.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Establish a trustworthy baseline

Install Protect from the WordPress plugin directory, activate it, and complete the supported connection flow. Confirm the dashboard can list the site's WordPress, plugin, and theme versions. Configure notifications for an address that is monitored during the site's operating hours.

Protect needs information about installed software and, for connected capabilities, communicates with Jetpack security services. The vulnerability scan needs the site to be publicly reachable. Document that processing in the site's operational and privacy records. Limit access to users responsible for security; threat details can expose installed versions and paths.

## Triage a vulnerability

For each finding:

1. Confirm the detected component and installed version.
2. Read the vulnerability details and fixed-version guidance.
3. Check whether the component is active and reachable, without assuming inactive means harmless.
4. Take a current backup and test the update on staging.
5. Update to a fixed version, replace the component, or remove it completely if it is unnecessary.
6. Verify the public site and rerun or await the next supported check.

Do not edit a plugin's version header to hide a result. Do not keep an abandoned vulnerable plugin merely because a firewall rule appears to block one known exploit.

## Operate each security control deliberately

Keep the controls distinct when configuring and diagnosing them:

- **Vulnerability scanning** compares installed versions with known vulnerability data; it does not inspect every file for malware.
- **Jetpack Scan** performs connected malware scanning and can offer supported fixes for findings.
- **Web application firewall** rules evaluate incoming requests and may overlap with host or edge protection.
- **Brute-force protection** blocks abusive login attempts.
- **Account Protection** can require email verification when a user's password is detected as compromised.

If the dashboard offers a firewall, malware scan, or automated fix, review the exact scope before enabling it. A firewall may conflict with host or edge rules; test login, REST, XML-RPC where intentionally used, webhooks, checkout, and administrator actions. Before a one-click fix, confirm the backup is current and understand which files may change. For Account Protection, verify that account email addresses are current and that authentication mail is delivered without exposing codes in logs.

“Ignore” is not remediation. Use it only when a qualified review establishes the finding does not apply and record the reason, owner, and review date. Revisit ignored findings after component or environment changes.

## Verify outcomes

After an update or fix, check the front end, administrator access, scheduled tasks, logs, forms, commerce, and external integrations. Confirm Protect reports the component's new version and the finding clears. Check **Tools → Site Health** for newly introduced REST, loopback, or connection failures. If malware or unauthorized changes are suspected, continue with [Jetpack Scan](/docs/products/scan/use-and-configure/) and an incident-response process.

For current product controls, use [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/). For abnormal results, follow [Troubleshoot and support](/docs/products/protect/troubleshoot-and-support/).
