---
title: "Jetpack Protect"
description: "Monitor WordPress core, plugins, and themes for known vulnerabilities and use connected security features."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: true
product: "protect"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Protect","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Protect setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Protect and verify its primary outcome.","url":"/docs/products/protect/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/protect/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/protect/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/protect/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eSecurity findings and diagnostic data can expose vulnerable versions or site details. Share the minimum evidence through the official support or security channel.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Protect is a standalone WordPress security plugin. The pinned release requires WordPress 6.9 or later and PHP 7.2 or later. Its free vulnerability scan checks installed WordPress core, plugin, and theme versions against vulnerability intelligence and requires a publicly reachable site. The product experience can also surface paid malware scanning and fixes, a web application firewall, brute-force protection, and Account Protection when those capabilities are available for the site.

Protect and [Jetpack Scan](/docs/products/scan/) are related but not identical. Protect is the standalone plugin and includes the free vulnerability-focused dashboard. Scan is the connected malware-scanning and threat-remediation product that can appear through Protect or the main Jetpack plugin. The WAF evaluates incoming requests, brute-force protection responds to hostile login attempts, and Account Protection can challenge users whose password appears compromised. Treat each as a separate control and verify the status that matches the symptom.

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

Use **Tools → Site Health** as an additional verification surface for connection and security prerequisites. A clean Site Health screen does not replace Protect results, but a failing REST, HTTPS, or public-reachability check can explain why a connected feature is unavailable.

Read [Use and configure](/docs/products/protect/use-and-configure/) for daily operation. Developers should note that Protect does not publish its dashboard routes as an integration API; see [Extend, hooks, and APIs](/docs/products/protect/extend-hooks-and-apis/).

Source evidence: [Protect plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/protect), [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/), and [WPScan vulnerability database](https://wpscan.com/wordpresses/).
