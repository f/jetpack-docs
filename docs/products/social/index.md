---
title: Jetpack Social
description: Connect social accounts, share WordPress posts, and find the plugin and Publicize package that own the workflow.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: social
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack Social lets authorized WordPress users connect supported social accounts and share site content from the publishing workflow. The standalone plugin is owned at `projects/plugins/social`; reusable sharing behavior is owned by the `projects/packages/publicize` package.

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
- [Pinned Jetpack Social plugin source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/social)
- [Pinned Publicize package source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/publicize)

Use the public support documentation for current product behavior and the pinned source for developer contracts in this documentation revision.
