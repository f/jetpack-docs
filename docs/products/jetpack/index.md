---
title: Jetpack
description: Understand the main Jetpack plugin, choose the right feature boundary, and follow a verified path from setup to contribution.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: true
product: jetpack
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack and verify its primary outcome.","url":"/docs/products/jetpack/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/jetpack/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/jetpack/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/jetpack/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eConnection and data behavior is feature-specific. Review the selected module before enabling it; site registration does not automatically authorize every user or data flow.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack is the combined WordPress plugin in the Jetpack family. It connects a self-hosted site to WordPress.com infrastructure and supplies modules and blocks for areas such as security, performance, audience growth, media, and content creation. Some capabilities also have focused standalone plugins; choose the smallest product set that satisfies the site's goal.

## Prerequisites

- At the pinned revision, WordPress 6.9 or later and PHP 7.2 or later, with the `fileinfo`, JSON, and OpenSSL PHP extensions. Recheck the current plugin listing before installation because these requirements can move.
- An administrator who is authorized to connect the site and review the data used by each selected feature.
- Outbound HTTPS access to the public services required by the chosen feature.
- A backup or staging path before changing security, performance, or connection settings on a production site.

The pinned [Jetpack plugin readme](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/readme.txt#L1-L11) and [Composer requirements](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/composer.json#L10-L67) are the source for this snapshot. Module requirements are not uniform: current module metadata distinguishes site connection, user connection, plan, and auto-activation requirements.

## Product boundary

Use this section for the main `jetpack` plugin and the cross-product connection it provides. Use the dedicated product section when the task is specifically about [Forms](/docs/products/forms/), [AI Assistant](/docs/products/ai/), [Social](/docs/products/social/), [Stats](/docs/products/stats/), or another standalone product. Jetpack CRM is separately owned; its [CRM section](/docs/products/crm/) routes to that project's repositories and support system.

## Authoritative sources

- [Current Jetpack support documentation](https://jetpack.com/support/)
- [Current Jetpack plugin listing](https://wordpress.org/plugins/jetpack/)
- [Pinned Jetpack plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack)
- [Public Jetpack monorepo](https://github.com/Automattic/jetpack)

Product support pages define current user behavior. The pinned source defines the implementation snapshot used by the developer guidance here. Neither undocumented endpoints nor an internal class name should be treated as a compatibility promise.
