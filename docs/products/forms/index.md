---
title: Jetpack Forms
description: Build and operate Jetpack forms, understand response handling, and find the package that owns the blocks and dashboard.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: true
product: forms
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Forms","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Forms setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Forms and verify its primary outcome.","url":"/docs/products/forms/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/forms/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/forms/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/forms/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eResponses can include submitted fields plus request metadata such as IP address, browser, country, and source. Apply least privilege, retention rules, and the documented IP-forgetting filter where required.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Forms provides form and field blocks, synced reusable forms, submission handling, integrations, and the central Forms and Responses dashboards used by the main Jetpack plugin. The implementation is owned by the public [automattic/jetpack-forms package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms). In this snapshot the main Jetpack plugin is the verified host that loads the package; embedding the Composer package elsewhere requires deliberate host setup and is not evidence of another supported product host.

Use Forms when a WordPress editor should create a form and site administrators should review its responses. Treat every response as potentially sensitive: collect only what the task needs, define who can read it, and decide how long it should be retained before publishing the form.

## Follow the lifecycle

- [Use and configure Forms](/docs/products/forms/use-and-configure/) to create a form, set its response behavior, and verify a real test submission.
- [Extend Forms, hooks, and APIs](/docs/products/forms/extend-hooks-and-apis/) to use supported WordPress hooks, block behavior, and integrations.
- [Develop and test Forms](/docs/products/forms/develop-and-test/) to work in the owning package and run its PHP, JavaScript, and integration tests.
- [Troubleshoot and support Forms](/docs/products/forms/troubleshoot-and-support/) to diagnose missing blocks, failed delivery, spam, redirects, and dashboard problems.

## Prerequisites

- The main Jetpack plugin with its auto-activated Contact Form module. Basic Forms use does not require a Jetpack connection.
- An editor who can add and configure blocks.
- An administrator who can review response access, email delivery, anti-spam, and integrations.
- A privacy and retention decision for the fields being collected.

Some workflows use a Jetpack connection or another service, while basic block rendering and storage are local WordPress behavior. Confirm the exact dependency of the selected feature instead of assuming every form action uses the same path.

## What Forms owns

At the pinned revision, the package owns form blocks, synced `jetpack_form` entities, the Contact Form implementation, central Forms and Responses management, and helpers for supported service integrations. It also registers eight public WordPress Abilities for form and response operations with MCP exposure when the host enables that bridge. The main Jetpack plugin loads the package through its Contact Form module; the package is the implementation source of truth.

Forms does not make a third-party CRM, mailing provider, or webhook receiver part of the Jetpack compatibility contract. Each integration can add its own authentication, permission, delivery, and retention requirements.

## Authoritative sources

- [Current Contact Form block documentation](https://jetpack.com/support/jetpack-blocks/contact-form/)
- [Pinned Forms package overview](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/README.md)
- [Pinned Forms package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms)
- [Public Jetpack monorepo](https://github.com/Automattic/jetpack)

Use the support page for current editor instructions and the pinned source for the behavior documented in this revision.
