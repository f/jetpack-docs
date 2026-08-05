---
title: "Jetpack Protect"
description: "Monitor WordPress core, plugins, and themes for known vulnerabilities and use connected security features."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "protect"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Protect is a standalone WordPress security plugin. It checks installed WordPress core, plugin, and theme versions against vulnerability intelligence and reports items that need attention. The product experience can also surface connected security capabilities such as malware scanning, threat fixes, brute-force protection, and a web application firewall when they are available for the site.

Protect and [Jetpack Scan](/docs/products/scan/) are related but not identical. Protect is the standalone plugin and vulnerability-focused dashboard. Scan is the malware-scanning and threat-remediation product also used by Jetpack experiences. Use the name shown with a finding when following support or source ownership.

## What Protect can and cannot do

Protect helps identify known vulnerable software and can block or remediate some threats through supported features. It cannot make an abandoned plugin safe, guarantee that a site has never been compromised, or replace updates, least privilege, backups, monitoring, and an incident-response plan.

A vulnerability result describes risk in a detected component and version. It is not by itself proof that an attacker exploited the site. Conversely, “no known vulnerabilities” is not proof that every file is clean.

## Start safely

1. Take a current off-site backup and verify access to it.
2. Install and activate Jetpack Protect.
3. Complete the connection or setup shown by the plugin.
4. Let the first scan finish and review each finding's component, installed version, fixed version, and evidence.
5. Update or replace vulnerable software on staging, then verify the site before production.
6. Configure notifications so they reach an actively monitored address.

Read [Use and configure](/docs/products/protect/use-and-configure/) for daily operation. Developers should note that Protect does not publish its dashboard routes as an integration API; see [Extend, hooks, and APIs](/docs/products/protect/extend-hooks-and-apis/).

Source evidence: [Protect plugin source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/protect), [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/), and [WPScan vulnerability database](https://wpscan.com/wordpresses/).
