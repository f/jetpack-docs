---
title: "Troubleshoot Jetpack Search"
description: "Diagnose connection, indexing, relevance, filter, and theme-integration problems in a controlled order."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "search"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Search","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Is the missing item public, eligible for indexing, and present in ordinary WordPress search?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck visibility, post type, indexing status, Sync health, and the difference between native and Instant Search.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eRepresentative queries return relevant eligible content and never reveal restricted items or fields.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

First separate index coverage from presentation. A direct `?s=` request can still be handled by Classic or Inline Jetpack Search, so it is not automatically a local WordPress control. On a controlled staging site, use [jetpack_search_should_handle_query](/docs/reference/hooks/filters/jetpack-search-should-handle-query/) to decline one marked query and compare it with the configured Search experience.

## A new or changed item is missing

Confirm the item is published, publicly queryable, and included in the intended post types. Check the site's Jetpack connection, scheduled task health, and outbound HTTPS. Allow for indexing delay, then update the item once and retest. Do not repeatedly republish production content or expose a private post to force indexing.

If all recent content is absent, investigate synchronization or connection health. If one post type is absent, inspect its `public` and search-exclusion registration and any Search filters added by custom code.

## Results appear at `/​?s=...` but not in Instant Search

Check whether Instant Search is enabled and whether the site's active search form opens the expected interface. Purge page and asset caches. Look for JavaScript errors, blocked API requests, an overlay hidden by theme `z-index`, and stale markup from a template override. Test with a default theme on staging to distinguish data from presentation.

Confirm the configured value is the intended Embedded, Overlay, Blocks Overlay beta, Inline/theme, or Off state. On a private site, inspect the authenticated request rather than comparing it with the public request path. Browser caching can retain an earlier response during a short service outage.

## Results are irrelevant or filters are empty

Remove custom Search filters temporarily, keep a copy of their configuration, and rerun a known query set. Confirm taxonomy terms are assigned to published content and that filter values match the indexed taxonomy. Avoid changing raw service query structures until WP-style arguments and content modeling have been checked.

Suggestions and AI Answers depend on an Instant Search experience. For custom taxonomy slots, verify the mapping and run the documented backfill path before treating an empty facet as a relevance failure.

## Search exposes content it should not

Take the affected content out of public visibility immediately and verify WordPress post-type registration. Record the result URL and query without sharing private content. After correcting visibility, allow the deletion/update to propagate and confirm the item is gone. Escalate persistent exposure through the product support channel.

## Safe diagnostic bundle

Include WordPress, PHP, Search, theme, and WooCommerce versions; whether the direct and instant interfaces differ; an innocuous example query; affected public content IDs or URLs; connection status; and console/network errors with cookies, nonces, and tokens removed.

Use [Jetpack Search support](https://jetpack.com/support/search/) for setup and behavior guidance and [Jetpack support](https://jetpack.com/contact-support/) for account, entitlement, or service investigation. Do not post private index responses or connection credentials in a public forum.
