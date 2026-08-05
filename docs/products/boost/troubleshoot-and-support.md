---
title: "Troubleshoot Jetpack Boost"
description: "Isolate cache, CSS, JavaScript, image, and remote-analysis problems without hiding the original failure."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "boost"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Boost","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Does the symptom disappear when only the relevant Boost module is disabled on staging?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck generation status, cache layers, registered handles, and module prerequisites before regenerating or excluding assets.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eThe optimized page preserves layout and interaction behavior while the same measurement profile shows the intended improvement.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Start by identifying which module changes the result. Disabling every performance tool at once may restore the page, but it does not identify the conflicting layer.

First distinguish **unavailable**, **inactive**, **optimizing**, and **ready**. Check the public-site gate, the site connection, and the current user's connection separately. A module that is unavailable or still optimizing cannot be repaired by repeatedly toggling it.

## Page looks stale

Purge Boost's page cache, then only the host cache, reverse proxy, or CDN layers you administer, and finally the browser cache. Retest in a private window while logged out. If authenticated and anonymous visitors see different output, record both responses before changing exclusions. Logged-in, preview, feed, JSON, non-GET, and other personalized requests are expected to bypass Page Cache.

## Layout is unstyled or flashes

Disable Optimize CSS Loading, purge caches, and check the page again. If that isolates the issue, regenerate critical CSS after confirming the site is publicly reachable. Test the template at mobile and desktop widths. A theme or page-builder update can invalidate previously generated CSS even when the URL did not change.

## A menu, form, slider, or checkout stops working

Disable JavaScript deferral first, then minification or concatenation. Inspect the browser console and network panel to identify a script handle or dependency-order failure. Re-enable the module and add the smallest supported exclusion rather than excluding an entire directory. Verify consent, payment, and account flows with real staging-mode integrations.

## Images are wrong or missing

Check the original attachment URL, generated `srcset`, CSS background images, and any lazy-loading code. Temporarily disable Image CDN to separate an origin problem from a transformed-delivery problem. Do not delete original media while diagnosing a CDN response.

## Critical CSS or speed analysis never completes

Confirm the public site can be reached without basic authentication, maintenance mode, an IP allowlist, or a blocking firewall rule. Check the Jetpack connection shown by Boost, scheduled task health, and outbound HTTPS. Do not enable a development connection-bypass filter on production; it can hide the real service failure.

For Cloud CSS, LCP optimization, Speculation Rules, or Performance History, record that feature's own eligibility and state. Do not infer its status from another module's score. For a Page Cache host conflict, preserve response headers and a sanitized cache log; redact query strings and request URIs that identify users or private paths.

## Collect a safe support report

Include WordPress, PHP, Boost, theme, cache/CDN, and browser versions; the failing public route when it is safe to share; the exact module that triggers the problem; console errors with tokens removed; and steps that reproduce the issue. Do not share cookies, nonces, connection tokens, account pages, or private preview URLs.

Use [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/) for product guidance and [Jetpack support](https://jetpack.com/contact-support/) when account or connected-service investigation is required. Return to [Use and configure](/docs/products/boost/use-and-configure/) after recovery and re-enable modules one at a time.
