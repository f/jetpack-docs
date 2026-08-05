---
title: Jetpack
description: Understand the main Jetpack plugin, choose the right feature boundary, and follow a verified path from setup to contribution.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: jetpack
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack is the combined WordPress plugin in the Jetpack family. It connects a self-hosted site to WordPress.com infrastructure and supplies modules and blocks for areas such as security, performance, audience growth, media, and content creation. Some capabilities also have focused standalone plugins; choose the smallest product set that satisfies the site's goal.

## Choose your task

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack","title":"From setup to a supported change","description":"Open the lifecycle page that matches the work in front of you.","paths":[{"title":"Use and configure","description":"Install Jetpack, connect the site, enable only the features you need, and verify the result.","url":"/docs/products/jetpack/use-and-configure/","cta":"Configure Jetpack","icon":"site","accent":"green","newTab":false},{"title":"Extend","description":"Use documented hooks, blocks, REST interfaces, and reusable packages without depending on internals.","url":"/docs/products/jetpack/extend-hooks-and-apis/","cta":"Choose an extension","icon":"code","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning monorepo and run the project-specific build and test paths.","url":"/docs/products/jetpack/develop-and-test/","cta":"Contribute","icon":"tools","accent":"gold","newTab":false},{"title":"Troubleshoot","description":"Separate connection, feature, browser, theme, plugin, and service failures before escalating.","url":"/docs/products/jetpack/troubleshoot-and-support/","cta":"Diagnose a problem","icon":"bug","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Prerequisites

- A WordPress site where you can install and activate plugins.
- An administrator who is authorized to connect the site and review the data used by each selected feature.
- Outbound HTTPS access to the public services required by the chosen feature.
- A backup or staging path before changing security, performance, or connection settings on a production site.

The pinned source snapshot declares its own WordPress and PHP requirements in the [Jetpack plugin readme](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/readme.txt). Check the current [WordPress.org plugin listing](https://wordpress.org/plugins/jetpack/) before installing because supported versions can move after this documentation review.

## Product boundary

Use this section for the main `jetpack` plugin and the cross-product connection it provides. Use the dedicated product section when the task is specifically about [Forms](/docs/products/forms/), [AI Assistant](/docs/products/ai/), [Social](/docs/products/social/), [Stats](/docs/products/stats/), or another standalone product. Jetpack CRM is separately owned; its [CRM section](/docs/products/crm/) routes to that project's repositories and support system.

## Authoritative sources

- [Current Jetpack support documentation](https://jetpack.com/support/)
- [Current Jetpack plugin listing](https://wordpress.org/plugins/jetpack/)
- [Pinned Jetpack plugin source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack)
- [Public Jetpack monorepo](https://github.com/Automattic/jetpack)

Product support pages define current user behavior. The pinned source defines the implementation snapshot used by the developer guidance here. Neither undocumented endpoints nor an internal class name should be treated as a compatibility promise.
