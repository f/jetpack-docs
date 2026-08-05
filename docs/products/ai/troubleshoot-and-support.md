---
title: Troubleshoot and support Jetpack AI Assistant
description: Separate AI Assistant availability, connection, browser, streaming, and content problems while protecting prompts and credentials.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: ai
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack AI Assistant","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Do host policy, site connection, current-user connection, AI settings, and entitlement all permit the requested AI surface?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eResolve the first failed availability gate; do not treat quota, moderation, authentication, and network failures as the same problem.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eA synthetic prompt completes or stops cleanly, no duplicate request runs while streaming, and accepted content becomes reviewable ordinary blocks.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Use a harmless test prompt on a draft page. Do not reproduce with private source material, customer data, credentials, or content that cannot be sent to a hosted service.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| AI Assistant is not available | Check host AI policy, offline mode, a connected site owner, the current editor user's connection, site-wide AI, writing-assistant settings, and current entitlement in that order. |
| Network or authentication error | Separate browser/network failure from site connection, current-user connection, nonce, and authorization state. Preserve the stable error class or code, not request data. |
| Service unavailable or quota exceeded | Check the current product status and entitlement without assuming a fixed request count or price. Retry once only after the state changes. |
| Moderation rejection, context too large, or unclear prompt | Remove unsafe or unnecessary content, reduce context, and issue one explicit bounded request. Do not evade a moderation decision. |
| Response starts but stops or stays empty | Use the stop control, preserve the requesting state and error class, and retry once with a short synthetic prompt. Check optimization or plugin interference only after the product gates and transport are established. |
| Editor freezes or duplicates content | Save a copy of the draft, reload without repeating the request, and test on staging with unrelated editor plugins disabled. Record the exact action that duplicates output. |
| Output is inaccurate or unsafe | Treat it as a content-review failure, not a transport failure. Discard it, narrow the prompt, add authoritative sources, and require human verification. |
| Saved content changes after reload | Compare the block's saved attributes and post revisions. Test a new draft with a short response to isolate serialization from generation. |

## Collect safe evidence

Record the WordPress, PHP, Jetpack, browser, and operating-system versions; timestamp with timezone; user role; whether another AI/editor plugin is active; and the visible error class, code, or requesting state. Redact the prompt, generated response, serialized block attributes, post revisions, debug logs, cookies, nonces, authorization headers, request bodies, private URLs, and account identifiers.

On staging, test with a default theme and only the required plugin. If the transport succeeds there, restore editor plugins and optimization layers one at a time. Do not repeatedly disconnect and reconnect Jetpack before establishing that the connection is the failing layer.

## Recover

- Preserve the draft in post revisions before removing a block or rolling back a plugin.
- Convert only reviewed output to ordinary blocks if you need a service-independent editing path.
- Retry a failed request manually; do not automate an unbounded retry loop that can duplicate content or consume usage.
- If an update caused the regression, use a recoverable staging rollback and re-run the same synthetic test.

## Get help

Use [Jetpack AI support](https://jetpack.com/support/jetpack-ai/) for availability, account, usage, and site-specific service questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source editor or package defect with sanitized steps. Report token exposure, unauthorized access, prompt disclosure, or exploitable output handling through [Automattic Security](https://automattic.com/security/) rather than a public issue.
