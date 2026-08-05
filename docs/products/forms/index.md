---
title: Jetpack Forms
description: Build and operate Jetpack forms, understand response handling, and find the package that owns the blocks and dashboard.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: forms
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack Forms provides the Contact Form module, form and field blocks, submission handling, integrations, and the feedback dashboard used by the main Jetpack plugin. The implementation is owned by the public [`automattic/jetpack-forms` package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms).

Use Forms when a WordPress editor should create a form and site administrators should review its responses. Treat every response as potentially sensitive: collect only what the task needs, define who can read it, and decide how long it should be retained before publishing the form.

## Follow the lifecycle

- [Use and configure Forms](/docs/products/forms/use-and-configure/) to create a form, set its response behavior, and verify a real test submission.
- [Extend Forms, hooks, and APIs](/docs/products/forms/extend-hooks-and-apis/) to use supported WordPress hooks, block behavior, and integrations.
- [Develop and test Forms](/docs/products/forms/develop-and-test/) to work in the owning package and run its PHP, JavaScript, and integration tests.
- [Troubleshoot and support Forms](/docs/products/forms/troubleshoot-and-support/) to diagnose missing blocks, failed delivery, spam, redirects, and dashboard problems.

## Prerequisites

- The main Jetpack plugin, or another supported host that loads the Jetpack Forms package.
- An editor who can add and configure blocks.
- An administrator who can review response access, email delivery, anti-spam, and integrations.
- A privacy and retention decision for the fields being collected.

Some workflows use a Jetpack connection or another service, while basic block rendering and storage are local WordPress behavior. Confirm the exact dependency of the selected feature instead of assuming every form action uses the same path.

## What Forms owns

At the pinned revision, the package README identifies four main areas: form blocks, the Contact Form implementation, the responses dashboard, and helpers for supported service integrations. The main Jetpack plugin loads that package through its Contact Form module; the package is the implementation source of truth.

Forms does not make a third-party CRM, mailing provider, or webhook receiver part of the Jetpack compatibility contract. Each integration can add its own authentication, permission, delivery, and retention requirements.

## Authoritative sources

- [Current Contact Form block documentation](https://jetpack.com/support/jetpack-blocks/contact-form/)
- [Pinned Forms package overview](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms/README.md)
- [Pinned Forms package source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms)
- [Public Jetpack monorepo](https://github.com/Automattic/jetpack)

Use the support page for current editor instructions and the pinned source for the behavior documented in this revision.
