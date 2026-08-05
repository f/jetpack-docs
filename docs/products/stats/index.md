---
title: Jetpack Stats
description: Understand Jetpack's traffic collection and reporting surfaces and find the packages that own tracking and administration.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: stats
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Stats","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Stats setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Stats and verify its primary outcome.","url":"/docs/products/stats/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/stats/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/stats/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/stats/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eMetrics and custom dimensions must not carry personal or unapproved data. Compare analytics tools only after aligning consent, exclusions, timezone, bots, and metric definitions.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Stats collects site traffic signals and presents reports such as views, referrers, popular content, and audience trends. At the pinned revision, the `automattic/jetpack-stats` package owns collection and report-fetching behavior, `automattic/jetpack-stats-admin` owns dashboard integration, and the main Jetpack plugin loads the Stats module.

Stats is service-backed analytics, not a local server-log viewer. Enabling it creates a data flow that site owners must include in their privacy and consent decisions.

Stats also has an agent-facing surface. When the WordPress Abilities feature is explicitly enabled, the pinned package registers seven operations under `wp-abilities/v1`: site overview, top content, post views, visits, followers, read settings, and update settings. That feature gate defaults off; availability must be discovered on the installed site.

## Follow the lifecycle

- [Use and configure Stats](/docs/products/stats/use-and-configure/) to enable collection, review privacy decisions, and verify a controlled visit and report.
- [Extend Stats, hooks, and APIs](/docs/products/stats/extend-hooks-and-apis/) to use verified tracking filters and the package's documented report client.
- [Develop and test Stats](/docs/products/stats/develop-and-test/) to work in the Stats packages and main-plugin integration with focused tests.
- [Troubleshoot and support Stats](/docs/products/stats/troubleshoot-and-support/) to isolate collection, exclusion, caching, permission, and reporting discrepancies.

## Prerequisites and boundaries

- A supported Jetpack installation with a healthy site connection.
- An administrator authorized to enable analytics and define who may read reports.
- A privacy notice and, where applicable, consent configuration covering the selected collection behavior.
- A stable public page for a harmless verification visit.

The [pinned Stats package README](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/README.md) describes a browser tracking script and pixel request used to record views. It also documents a package API for retrieving reports through the connected site. Do not treat those transport details as a license to send arbitrary personal data or call undocumented service endpoints.

## Interpret reports carefully

Different analytics tools can disagree because they define visits, visitors, bots, timezones, consent, caching, and blocked requests differently. Use Stats for consistent trends and the documented metrics it provides; do not claim that two products should have identical totals without first comparing their collection rules.

## Authoritative sources

- [Current Jetpack Stats support](https://jetpack.com/support/jetpack-stats/)
- [Pinned Stats package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats)
- [Pinned Stats admin package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats-admin)
- [Pinned main-plugin Stats module](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/modules/stats.php)

Use current support documentation for product UI and definitions, and pinned source for the developer behavior described in this revision.
