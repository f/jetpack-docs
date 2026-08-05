---
title: Troubleshoot and support Jetpack Stats
description: Diagnose missing, delayed, excluded, or inconsistent Stats data and dashboard access without collecting extra visitor information.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: stats
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

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

## Inspect the collection path

1. Open the public page signed out and record its URL without sensitive query parameters.
2. Check page source and browser network errors for the Stats asset and request.
3. Compare a cache-bypassed response with the ordinary cached response.
4. Check consent, DNT, role, IP exclusion, and content-blocker state for the test browser.
5. Record the site timezone and the report period being viewed.

Capture WordPress, PHP, Jetpack, theme, cache, consent, and security-plugin versions with a timestamp. Redact IP addresses, cookies, connected-site tokens, visitor identifiers, private URLs, and full report exports.

## Recover and get help

Disable a custom Stats filter before disabling the entire product. Roll back through staging and re-run the same controlled visit. If collection must stop for privacy reasons, confirm the public page no longer emits the tracking request and contact support separately about existing service data.

Use [Jetpack Stats support](https://jetpack.com/support/jetpack-stats/) for current metric definitions, access, account, and site-specific collection questions. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible public-source defect with sanitized steps. Report unauthorized report access, tracking-control bypass, or credential exposure through [Automattic Security](https://automattic.com/security/).
