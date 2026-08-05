---
title: "Troubleshoot Jetpack Protect"
description: "Investigate stale vulnerability scans, unexpected findings, firewall conflicts, and failed threat fixes safely."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "protect"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

If you suspect an active compromise, preserve logs and a current backup, restrict unnecessary access, and use an incident-response process. Do not publish threat paths, credentials, or exploit steps in a public support thread.

## The dashboard is stale or cannot scan

Confirm the plugin is active, the site connection is healthy, and outbound HTTPS, WordPress cron, loopbacks, and REST requests work. Check whether a security plugin, host firewall, proxy, or maintenance mode blocks the service. Record the last successful check before reconnecting; avoid repeated disconnect/reconnect cycles that erase useful context.

## A finding remains after an update

Verify the installed files actually report the fixed version and that no second copy of the component remains. Purge object caches and wait for the next supported check. Do not change the version string manually. If the component is a host-managed or bundled copy, ask its owner how the fixed code is delivered.

## A finding looks wrong

Compare component slug, installed version, vulnerability range, and fixed version. Capture the vulnerability identifier and public component details. Ignore only after qualified review; include the reason and a review date. Report a suspected data error through support rather than suppressing it across sites.

## Firewall causes a regression

Use an existing authenticated session or host recovery path. Identify the exact request, rule layer, response status, and time. Test a narrowly scoped supported exception on staging. Do not expose a public firewall-off switch or disable every security layer permanently to restore one webhook.

## A fix fails or stays in progress

Do not send duplicate fixes. Preserve the threat ID, selected items, start time, and redacted result. Confirm backups and filesystem permissions, then contact support. If files were partially modified, keep the site in a controlled state until the operation is understood.

Include WordPress, PHP, Protect, theme, host, cache, and security-layer versions in a safe report. Redact cookies, nonces, connection tokens, private threat paths, and personal data. Use [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/) and [Jetpack support](https://jetpack.com/contact-support/) for connected-service investigation. For malware-specific workflows, see [Troubleshoot Jetpack Scan](/docs/products/scan/troubleshoot-and-support/).
