---
title: "Troubleshoot Jetpack Boost"
description: "Isolate cache, CSS, JavaScript, image, and remote-analysis problems without hiding the original failure."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "boost"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Start by identifying which module changes the result. Disabling every performance tool at once may restore the page, but it does not identify the conflicting layer.

## Page looks stale

Purge Boost's page cache, then the host cache, reverse proxy or CDN, and browser cache. Retest in a private window while logged out. If authenticated and anonymous visitors see different output, record both responses before changing exclusions. Confirm that the request is not a personalized route that should bypass full-page caching.

## Layout is unstyled or flashes

Disable Optimize CSS Loading, purge caches, and check the page again. If that isolates the issue, regenerate critical CSS after confirming the site is publicly reachable. Test the template at mobile and desktop widths. A theme or page-builder update can invalidate previously generated CSS even when the URL did not change.

## A menu, form, slider, or checkout stops working

Disable JavaScript deferral first, then minification or concatenation. Inspect the browser console and network panel to identify a script handle or dependency-order failure. Re-enable the module and add the smallest supported exclusion rather than excluding an entire directory. Verify consent, payment, and account flows with real staging-mode integrations.

## Images are wrong or missing

Check the original attachment URL, generated `srcset`, CSS background images, and any lazy-loading code. Temporarily disable Image CDN to separate an origin problem from a transformed-delivery problem. Do not delete original media while diagnosing a CDN response.

## Critical CSS or speed analysis never completes

Confirm the public site can be reached without basic authentication, maintenance mode, an IP allowlist, or a blocking firewall rule. Check the Jetpack connection shown by Boost, scheduled task health, and outbound HTTPS. Do not enable a development connection-bypass filter on production; it can hide the real service failure.

## Collect a safe support report

Include WordPress, PHP, Boost, theme, cache/CDN, and browser versions; the failing public route when it is safe to share; the exact module that triggers the problem; console errors with tokens removed; and steps that reproduce the issue. Do not share cookies, nonces, connection tokens, account pages, or private preview URLs.

Use [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/) for product guidance and [Jetpack support](https://jetpack.com/contact-support/) when account or connected-service investigation is required. Return to [Use and configure](/docs/products/boost/use-and-configure/) after recovery and re-enable modules one at a time.
