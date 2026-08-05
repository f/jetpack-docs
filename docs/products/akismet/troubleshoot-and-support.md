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

## Safe support report

Include Akismet and WordPress versions, the integration owner, the form type, the timestamp and broad result category, and redacted error text. Do not include the API key, full IP addresses, cookies, private form contents, or personal data. Use [Akismet support](https://akismet.com/support/) and follow its private-data instructions when deeper investigation is needed.
