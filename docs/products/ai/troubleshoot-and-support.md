---
title: Troubleshoot and support Jetpack AI Assistant
description: Separate AI Assistant availability, connection, browser, streaming, and content problems while protecting prompts and credentials.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: ai
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Use a harmless test prompt on a draft page. Do not reproduce with private source material, customer data, credentials, or content that cannot be sent to a hosted service.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| AI Assistant is not available | Confirm the current Jetpack version, site connection, user role, editor type, and current feature availability in [Jetpack AI support](https://jetpack.com/support/jetpack-ai/). |
| Request is rejected immediately | Check connection and account state, browser REST errors, and whether the current user is authorized. Preserve the error code, not authorization data. |
| Response starts but stops | Check browser connectivity, console errors, request duration, content blockers, and whether another optimization layer interferes with streaming. Retry once with a short synthetic prompt. |
| Editor freezes or duplicates content | Save a copy of the draft, reload without repeating the request, and test on staging with unrelated editor plugins disabled. Record the exact action that duplicates output. |
| Output is inaccurate or unsafe | Treat it as a content-review failure, not a transport failure. Discard it, narrow the prompt, add authoritative sources, and require human verification. |
| Saved content changes after reload | Compare the block's saved attributes and post revisions. Test a new draft with a short response to isolate serialization from generation. |

## Collect safe evidence

Record the WordPress, PHP, Jetpack, browser, and operating-system versions; timestamp with timezone; user role; whether another AI/editor plugin is active; and the visible error code or requesting state. Redact the prompt, generated response, cookies, nonces, authorization headers, request bodies, private URLs, and account identifiers.

On staging, test with a default theme and only the required plugin. If the transport succeeds there, restore editor plugins and optimization layers one at a time. Do not repeatedly disconnect and reconnect Jetpack before establishing that the connection is the failing layer.

## Recover

- Preserve the draft in post revisions before removing a block or rolling back a plugin.
- Convert only reviewed output to ordinary blocks if you need a service-independent editing path.
- Retry a failed request manually; do not automate an unbounded retry loop that can duplicate content or consume usage.
- If an update caused the regression, use a recoverable staging rollback and re-run the same synthetic test.

## Get help

Use [Jetpack AI support](https://jetpack.com/support/jetpack-ai/) for availability, account, usage, and site-specific service questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source editor or package defect with sanitized steps. Report token exposure, unauthorized access, prompt disclosure, or exploitable output handling through [Automattic Security](https://automattic.com/security/) rather than a public issue.
