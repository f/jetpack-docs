---
title: "Use and configure Jetpack Boost"
description: "Enable Boost optimizations safely, measure their effect, and operate them alongside existing cache layers."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "boost"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

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

The names and availability shown in the dashboard can evolve. Avoid automating against labels or assuming that every site receives the same module set.

## Verify the result

Test while logged out and while using the lowest-privileged role needed for account flows. Check browser console errors, failed network requests, layout shifts, keyboard navigation, and form submission. Compare field data over time when available; a single laboratory score is useful evidence, not a guarantee.

When an optimization breaks a page, turn off only that module, purge caches, and confirm recovery before trying an exclusion. Record exclusions with the script handle, URL pattern, affected page, and reason so they can be retested later.

For compatibility code, continue to [Extend, hooks, and APIs](/docs/products/boost/extend-hooks-and-apis/). For a broken page or stale cache, use [Troubleshoot and support](/docs/products/boost/troubleshoot-and-support/).

Source evidence: [Boost modules](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost/app/modules) and [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/).
