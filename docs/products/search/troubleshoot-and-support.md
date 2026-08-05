---
title: "Troubleshoot Jetpack Search"
description: "Diagnose connection, indexing, relevance, filter, and theme-integration problems in a controlled order."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "search"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

First separate index coverage from presentation. Search for a unique exact title through both a direct WordPress search URL and the configured instant interface.

## A new or changed item is missing

Confirm the item is published, publicly queryable, and included in the intended post types. Check the site's Jetpack connection, scheduled task health, and outbound HTTPS. Allow for indexing delay, then update the item once and retest. Do not repeatedly republish production content or expose a private post to force indexing.

If all recent content is absent, investigate synchronization or connection health. If one post type is absent, inspect its `public` and search-exclusion registration and any Search filters added by custom code.

## Results appear at `/​?s=...` but not in Instant Search

Check whether Instant Search is enabled and whether the site's active search form opens the expected interface. Purge page and asset caches. Look for JavaScript errors, blocked API requests, an overlay hidden by theme `z-index`, and stale markup from a template override. Test with a default theme on staging to distinguish data from presentation.

## Results are irrelevant or filters are empty

Remove custom Search filters temporarily, keep a copy of their configuration, and rerun a known query set. Confirm taxonomy terms are assigned to published content and that filter values match the indexed taxonomy. Avoid changing raw service query structures until WP-style arguments and content modeling have been checked.

## Search exposes content it should not

Take the affected content out of public visibility immediately and verify WordPress post-type registration. Record the result URL and query without sharing private content. After correcting visibility, allow the deletion/update to propagate and confirm the item is gone. Escalate persistent exposure through the product support channel.

## Safe diagnostic bundle

Include WordPress, PHP, Search, theme, and WooCommerce versions; whether the direct and instant interfaces differ; an innocuous example query; affected public content IDs or URLs; connection status; and console/network errors with cookies, nonces, and tokens removed.

Use [Jetpack Search support](https://jetpack.com/support/search/) for setup and behavior guidance and [Jetpack support](https://jetpack.com/contact-support/) for account, entitlement, or service investigation. Do not post private index responses or connection credentials in a public forum.
