---
title: Jetpack Social
description: Connect social accounts, share WordPress posts, and find the plugin and Publicize package that own the workflow.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: social
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Social","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Social setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Social and verify its primary outcome.","url":"/docs/products/social/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/social/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/social/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/social/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eDestination credentials and connections belong to specific users or shared policies. Do not expose tokens, assume a personal connection is shared, or retry an ambiguous publish result blindly.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Social lets authorized WordPress users connect supported social accounts and share site content from the publishing workflow. The standalone plugin is owned at `projects/plugins/social`; reusable sharing behavior is owned by the `projects/packages/publicize` package.

The pinned product includes automatic sharing, scheduling, Social Image Generator, Organic Content Sharing, resharing, per-network customization, UTM settings, message templates, and Social Notes. Confirm the installed product and entitlement before promising any one surface.

Supported networks and product capabilities change more frequently than a source snapshot. Confirm the current set in [Jetpack Social support](https://jetpack.com/support/jetpack-social/) rather than hard-coding a network list into an integration.

## Follow the lifecycle

- [Use and configure Social](/docs/products/social/use-and-configure/) to connect accounts, choose who can share, prepare a post, and verify the public result.
- [Extend Social, hooks, and APIs](/docs/products/social/extend-hooks-and-apis/) to control local publishing behavior through verified filters and package contracts.
- [Develop and test Social](/docs/products/social/develop-and-test/) to work in the standalone plugin and Publicize package with project-specific tests.
- [Troubleshoot and support Social](/docs/products/social/troubleshoot-and-support/) to separate account, permission, post, scheduling, media, and network failures.

## Prerequisites

- A supported WordPress site with Jetpack Social installed and a working Jetpack connection.
- Authorization to connect the organization's social account and approve the permissions requested by that network.
- A WordPress role that is allowed to publish the intended post type.
- A decision about whether a connection is personal to one user or shared with other authorized site users.

Treat a social connection as a publishing credential. Do not share account passwords, store connection tokens in documentation, or make a connection shared merely to solve a role problem.

## Product boundary

Jetpack Social owns connection selection, share-message editing, and the WordPress-side publication workflow. The destination network controls its own account state, API availability, media rules, moderation, and final presentation. A WordPress success state does not by itself prove the destination published exactly once.

The main Jetpack plugin can also load Social/Publicize behavior. Package-based code must feature-detect the installed provider instead of assuming only one plugin layout.

## Authoritative sources

- [Current Jetpack Social support](https://jetpack.com/support/jetpack-social/)
- [Current WordPress.org plugin listing](https://wordpress.org/plugins/jetpack-social/)
- [Pinned Jetpack Social plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/social)
- [Pinned Publicize package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize)

Use the public support documentation for current product behavior and the pinned source for developer contracts in this documentation revision.
