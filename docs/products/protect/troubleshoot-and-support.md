---
title: "Troubleshoot Jetpack Protect"
description: "Investigate stale vulnerability scans, unexpected findings, firewall conflicts, and failed threat fixes safely."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "protect"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Protect","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is the finding tied to the installed component and version, and can the proposed remediation be tested on staging?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eRefresh product status, verify scanner connectivity and versions, then separate stale, disputed, and actionable findings.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eThe finding is resolved or explicitly accepted with evidence, and security, login, editor, and public-site smoke tests still pass.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

If you suspect an active compromise, preserve logs and a current backup, restrict unnecessary access, and use an incident-response process. Do not publish threat paths, credentials, or exploit steps in a public support thread.

## The dashboard is stale or cannot scan

Confirm the plugin is active, the site connection is healthy, and outbound HTTPS, WordPress cron, loopbacks, and REST requests work. Check whether a security plugin, host firewall, proxy, or maintenance mode blocks the service. Record the last successful check before reconnecting; avoid repeated disconnect/reconnect cycles that erase useful context.

## A finding remains after an update

Verify the installed files actually report the fixed version and that no second copy of the component remains. Purge object caches and wait for the next supported check. Do not change the version string manually. If the component is a host-managed or bundled copy, ask its owner how the fixed code is delivered.

## A finding looks wrong

Compare component slug, installed version, vulnerability range, and fixed version. Capture the vulnerability identifier and public component details. Ignore only after qualified review; include the reason and a review date. Report a suspected data error through support rather than suppressing it across sites.

## Firewall causes a regression

Use an existing authenticated session or host recovery path. Identify the exact request, rule layer, response status, and time. Test a narrowly scoped supported exception on staging. Do not expose a public firewall-off switch or disable every security layer permanently to restore one webhook.

## Account verification email does not arrive

Confirm the affected user's email address through a separate trusted administrator session, then inspect mail delivery without printing the message body or authentication code. Check spam handling and the site's transactional-mail provider. Do not disable Account Protection globally to recover one user; use the supported recovery flow or another verified administrator account.

## A legitimate user is blocked at login

Separate a compromised-password Account Protection challenge from brute-force blocking or a WAF response. Record the public error category, timestamp, user role, and source-network context, but never record the submitted password or verification code. Use the blocked-login recovery flow and verify that recovery mail can be sent. If mail is intentionally suppressed through a documented filter, the integration must provide an equally secure recovery path.

## A fix fails or stays in progress

Do not send duplicate fixes. Preserve the threat ID, selected items, start time, and redacted result. Confirm backups and filesystem permissions, then contact support. If files were partially modified, keep the site in a controlled state until the operation is understood.

Include WordPress, PHP, Protect, theme, host, cache, and security-layer versions in a safe report. Include relevant **Tools → Site Health** failures, but redact cookies, nonces, connection tokens, private threat paths, email contents, verification codes, and personal data. Use [Jetpack Protect support](https://jetpack.com/support/jetpack-protect/) and [Jetpack support](https://jetpack.com/contact-support/) for connected-service investigation. For malware-specific workflows, see [Troubleshoot Jetpack Scan](/docs/products/scan/troubleshoot-and-support/).
