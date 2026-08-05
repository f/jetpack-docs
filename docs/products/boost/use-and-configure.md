---
title: "Use and configure Jetpack Boost"
description: "Enable Boost optimizations safely, measure their effect, and operate them alongside existing cache layers."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "boost"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Record a baseline","content":"\u003cp\u003eCapture representative URLs, device profiles, visual output, and interaction behavior before optimization.\u003c/p\u003e"},{"title":"Enable one module","content":"\u003cp\u003eTurn on one Boost optimization at a time and wait for its documented generation or analysis step.\u003c/p\u003e"},{"title":"Compare the same paths","content":"\u003cp\u003eRetest cached and uncached output, key interactions, images, layout, and the same performance profile.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003ePerformance changes can alter page markup, script timing, caching, and external delivery. Keep a rollback path and never exclude a handle before identifying its registered owner.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Configure Boost as a measured change, not as a set of switches to enable all at once. Optimization modules can alter generated HTML, script timing, stylesheets, images, or cache behavior, so their effect depends on the active theme and plugins.

## Prepare the site

- Take a backup and note the active theme, caching plugins, CDN, reverse proxy, and host-level cache.
- Choose a small test set: home, post, archive, search, form, cart, checkout, account, and any page-builder template the site actually uses.
- Capture logged-out screenshots and a performance baseline. Use a fresh browser profile for visitor testing.
- If a staging site cannot be reached publicly, expect remote analysis features such as generated critical CSS or speed scoring to be unavailable or incomplete.

## Enable modules deliberately

Start with one module. After each change, purge every cache layer and test the selected pages.

- **Page Cache** serves reusable page output faster. Exclude personalized, authenticated, cart, checkout, and other stateful responses through the supported configuration of the participating cache layers.
- **Optimize CSS Loading** generates and inserts critical CSS. Regenerate it after a theme change, layout change, or major stylesheet update.
- **Defer Non-Essential JavaScript** changes execution order. Check menus, sliders, consent tools, analytics, forms, and commerce interactions.
- **Image CDN and image guidance** affect image delivery or highlight sizing opportunities. Verify crops, responsive `srcset` output, and images loaded by CSS or JavaScript.
- **Concatenate and minify** changes asset URLs and grouping. Do not duplicate the same job in multiple optimization plugins unless their compatibility guidance explicitly supports it.
- **Cloud CSS, LCP optimization, Speculation Rules, and Performance History** have their own analysis, eligibility, and ready states. Verify the state shown for that feature rather than treating a general speed score as proof that it is active.

The names and availability shown in the dashboard can evolve. Avoid automating against labels or assuming that every site receives the same module set.

## Permissions, connection, and stored data

Changing Boost dashboard settings requires `manage_options`. A site connection and a current user's connection are separate states, so a site can be registered while the administrator still needs to authorize a user-scoped operation. Remote analyzers also need the selected public URL to be reachable.

Speed-score requests include the URL being measured, active Boost modules, and a client identifier. LCP analysis submits the selected cornerstone-page URLs. Page Cache writes rendered HTML below `wp-content/boost-cache/cache`; its diagnostic logs can contain request URIs, so sanitize them before sharing. The cache deliberately bypasses logged-in users, previews, feeds, non-GET requests, JSON requests, and other non-cacheable contexts. A bypass is often correct behavior, not a cache miss to defeat.

Pinned implementation references: [module states](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/class-module.php#L142-L235), [speed-score payload](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/boost-speed-score/src/class-speed-score-request.php#L172-L186), and [Page Cache request policy](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/class-request.php#L128-L224).

## Verify the result

Test while logged out and while using the lowest-privileged role needed for account flows. Check browser console errors, failed network requests, layout shifts, keyboard navigation, and form submission. Compare field data over time when available; a single laboratory score is useful evidence, not a guarantee.

When an optimization breaks a page, turn off only that module, purge caches, and confirm recovery before trying an exclusion. Record exclusions with the script handle, URL pattern, affected page, and reason so they can be retested later.

For compatibility code, continue to [Extend, hooks, and APIs](/docs/products/boost/extend-hooks-and-apis/). For a broken page or stale cache, use [Troubleshoot and support](/docs/products/boost/troubleshoot-and-support/).

Source evidence: [Boost modules](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules) and [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/).
