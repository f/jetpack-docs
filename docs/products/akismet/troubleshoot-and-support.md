---
title: "Troubleshoot Akismet Anti-spam"
description: "Diagnose API-key, connectivity, form-coverage, and classification issues without exposing credentials or submissions."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "akismet"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Akismet Anti-spam","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is the key accepted and does the failing input surface actually invoke its Akismet integration?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck key status, outbound HTTPS, documented fields, trusted proxy handling, and the consuming plugin integration.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eOfficial synthetic spam and ham cases classify as expected without exposing the key or real visitor data.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Use [Akismet Support](https://akismet.com/support/) as the authoritative support source. Akismet is externally owned and its public plugin source is in [WordPress.org SVN](https://plugins.svn.wordpress.org/akismet/); Jetpack support and Jetpack monorepo issues are not the primary route for Akismet plugin defects.

## The key is not accepted

Re-enter it in the server-side plugin settings without posting or logging it. Confirm the site URL is the intended canonical URL and that outbound HTTPS works. If the key belongs to a different account or usage context, resolve that through the authorized Akismet account flow. Never “test” by placing the key in a browser request or public command transcript.

## Comments are checked but a form is not

Confirm the form plugin explicitly supports Akismet and that its integration is enabled. Activating Akismet does not automatically wrap every custom submission endpoint. Check the form plugin's own logs with sensitive fields redacted, then test its documented spam sample on staging.

## Too much spam passes through

Mark confirmed misses as spam so the supported integration can report them. Check that visitor IP, user agent, referrer, content, author, email, URL, and type fields are passed with their documented meanings. A reverse proxy that makes every visitor appear to have the same address can reduce useful context. Add rate limiting and abuse controls rather than treating Akismet as the only defense.

## Legitimate submissions are classified as spam

Restore them as not spam and report the false positive through the moderation action. Review custom integrations for invented or stale metadata. Keep a recoverable moderation period; do not auto-delete all classified spam during an investigation.

## Service or network errors

Check DNS, TLS, outbound firewall, proxy, and PHP HTTP client health. An unavailable service is not proof that a submission is spam. Custom integrations should queue a safe retry or send the item to moderation.

If an Akismet ability is missing, confirm WordPress Abilities exists, an API key is configured, and the current user has `moderate_comments`. MCP access additionally requires the explicit `akismet_enable_mcp_access` opt-in; do not weaken moderation capabilities to expose it.

## Safe support report

Include Akismet and WordPress versions, the integration owner, the form type, the timestamp and broad result category, and redacted error text. Do not include the API key, full IP addresses, cookies, private form contents, or personal data. Use [Akismet support](https://akismet.com/support/) and follow its private-data instructions when deeper investigation is needed.
