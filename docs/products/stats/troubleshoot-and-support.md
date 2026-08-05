---
title: Troubleshoot and support Jetpack Stats
description: Diagnose missing, delayed, excluded, or inconsistent Stats data and dashboard access without collecting extra visitor information.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: stats
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Stats","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Does a controlled eligible visit emit the Stats request under the expected consent and exclusion state?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck module activation, site connection, rendered asset, consent, exclusions, blockers, and cache variants.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eAn eligible controlled visit is collected while excluded or non-consenting visits remain excluded according to policy.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Do not generate a large burst of artificial traffic to test Stats. One or two controlled signed-out visits are enough to distinguish page output and browser collection from dashboard processing.

## Triage by symptom

| Symptom | First checks |
| --- | --- |
| No new views appear | Confirm Stats is enabled, Jetpack is connected, the public page includes the Stats asset, the test visitor is not excluded, and consent or a content blocker did not suppress the request. Allow for normal processing. |
| Some pages collect and others do not | Compare cached HTML, template type, consent state, optimization rules, and whether the pages are publicly reachable. Check one URL at a time. |
| Counts are higher than expected | Review internal traffic, bots, cache topology, repeated test visits, timezone, and metric definition. Do not assume another analytics product uses the same visitor model. |
| Counts are lower than another analytics tool | Compare consent, blockers, script failures, excluded users or IPs, timezone, bot handling, and which page types each tool measures. |
| Dashboard is empty or denied for one user | Confirm that user's WordPress role and Stats access configuration, then check report-request errors without granting unnecessary administrator access. |
| Referrer or search information is missing | Remember that browsers, search providers, privacy controls, and redirects can omit or reduce referrer data. Verify the documented metric before calling it a collection defect. |
| A custom dimension is absent | Remove personal or unapproved data first, then verify the local filter runs and that the receiving report actually supports the custom key. |
| An ability is missing or denied | Confirm `jetpack_wp_abilities_enabled`, product initialization, `view_stats` for reads, and `manage_options` for settings writes. |
| A report briefly looks stale | Account for the package's expected five-minute report cache before bypassing it for a controlled comparison. |

## Inspect the collection path

1. Open the public page signed out and record its URL without sensitive query parameters.
2. Check page source and browser network errors for the Stats asset and request.
3. Compare a cache-bypassed response with the ordinary cached response.
4. Follow the actual collection decision: disconnected site, disabled module, feed/robots/embed/trackback/preview request, enabled DNT filter, Safe Mode, excluded logged-in role, excluded IP, WP Consent API gate, and content blocker.
5. Record the site timezone and the report period being viewed.

Also distinguish the AMP tracking path from ordinary script output and confirm the user's role maps to `view_stats`. Do not override the exclusion cascade merely to make a dashboard counter move.

Capture WordPress, PHP, Jetpack, theme, cache, consent, and security-plugin versions with a timestamp. Redact IP addresses, cookies, connected-site tokens, visitor identifiers, private URLs, and full report exports.

## Recover and get help

Disable a custom Stats filter before disabling the entire product. Roll back through staging and re-run the same controlled visit. If collection must stop for privacy reasons, confirm the public page no longer emits the tracking request and contact support separately about existing service data.

Use [Jetpack Stats support](https://jetpack.com/support/jetpack-stats/) for current metric definitions, access, account, and site-specific collection questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source defect with sanitized steps. Report unauthorized report access, tracking-control bypass, or credential exposure through [Automattic Security](https://automattic.com/security/).
