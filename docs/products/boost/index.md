---
title: "Jetpack Boost"
description: "Improve a WordPress site's front-end performance with independently controlled optimization modules."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "boost"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Boost","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Boost setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Boost and verify its primary outcome.","url":"/docs/products/boost/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/boost/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/boost/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/boost/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003ePerformance changes can alter page markup, script timing, caching, and external delivery. Keep a rollback path and never exclude a handle before identifying its registered owner.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Boost is a standalone WordPress performance plugin. It does not require the main Jetpack plugin. At the pinned source revision it requires WordPress 6.9 or newer and PHP 7.2 or newer. Boost packages performance changes as modules so you can enable, measure, and, when necessary, roll back one optimization at a time.

The current feature registry includes Critical CSS, Cloud CSS, LCP optimization, Minify JS, Minify CSS, Render-blocking JS, Image Guide, Image CDN, Performance History, Page Cache, and Speculation Rules. A module can be **available**, **active**, **optimizing**, or **ready**; an enabled switch does not prove that generation has finished. Treat the Boost dashboard as the source of truth for the modules and subfeatures available on a particular site because public reachability, hosting, connection, and service eligibility can change that set.

## Who should use it

Boost is useful when you want a guided way to improve loading performance without maintaining a custom optimization stack. It is especially helpful for sites where theme, plugin, and third-party script changes make a one-time performance configuration insufficient.

Before enabling output-changing modules, make sure you can clear every cache layer and restore a known-good configuration. Measure representative pages on both mobile and desktop, not only the home page.

## A safe first pass

1. Record a baseline for the home page, a typical post or page, an archive, and any checkout or account flow.
2. Install and activate Jetpack Boost from the WordPress plugin directory.
3. Complete any connection or service prompt shown by the plugin.
4. Enable one module and clear the Boost, host, proxy, and browser caches.
5. Inspect the representative pages while logged out, then compare performance measurements.
6. Keep the module only when the visible site and key interactions still work.

Read [Use and configure](/docs/products/boost/use-and-configure/) for the operating workflow and [Troubleshoot and support](/docs/products/boost/troubleshoot-and-support/) before changing a production site.

## For builders

Boost exposes selected PHP actions and filters for compatibility work. Start with [Extend, hooks, and APIs](/docs/products/boost/extend-hooks-and-apis/), and pin any integration to the hook contract you tested. The plugin's admin REST and data-sync routes are implementation details, not a supported remote-management API.

Source evidence: [Boost plugin source at the reviewed revision](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost) and [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/).
