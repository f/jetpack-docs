---
title: "Jetpack Boost"
description: "Improve a WordPress site's front-end performance with independently controlled optimization modules."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "boost"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Boost is a standalone WordPress performance plugin. It does not require the main Jetpack plugin. Boost packages performance changes as modules so you can enable, measure, and, when necessary, roll back one optimization at a time.

Depending on the version and services available to the site, those modules can include page caching, critical CSS, deferring non-essential JavaScript, image guidance, Image CDN, and CSS or JavaScript concatenation and minification. Treat the Boost dashboard as the source of truth for the modules available on a particular site; availability can depend on the environment and connected services.

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

Source evidence: [Boost plugin source at the reviewed revision](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost) and [Jetpack Boost support](https://jetpack.com/support/jetpack-boost/).
