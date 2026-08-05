---
title: Jetpack CRM
description: Use Jetpack CRM while routing source, API, contribution, and support work to the repositories that own the product.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: true
product: crm
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack CRM","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack CRM setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack CRM and verify its primary outcome.","url":"/docs/products/crm/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/crm/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/crm/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/crm/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eCRM records can be highly sensitive. Never use a production export for development, and do not grant administrator access merely to bypass a capability problem.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack CRM is a separately maintained WordPress plugin for contacts and customer workflows. Its implementation is not part of the Jetpack monorepo. This section gives Jetpack users a stable product route, then sends implementation, API, testing, and support work to the public CRM sources that own it.

The product model includes contacts and companies, quotes, invoices, transactions, a client portal, front-end forms, tasks, segments, WooCommerce Sync, activity logs, aliases, files, tags, custom fields, B2B mode, CSV import, role-based access, currencies, and mail delivery. Enable only the records and extensions the organization actually operates.

## Follow the lifecycle

- [Use and configure CRM](/docs/products/crm/use-and-configure/) to install the plugin, define access and data rules, and verify a controlled customer workflow.
- [Extend CRM, hooks, and APIs](/docs/products/crm/extend-hooks-and-apis/) to start from the owning API documentation and code examples.
- [Develop and test CRM](/docs/products/crm/develop-and-test/) to contribute in `Automattic/jetpack-crm`, not under `projects/plugins` in Jetpack.
- [Troubleshoot and support CRM](/docs/products/crm/troubleshoot-and-support/) to isolate CRM, extension, Forms integration, and hosting problems.

## Ownership map

| Need | Owning public source |
| --- | --- |
| Current setup and operation | [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) |
| Plugin implementation and project tests | [Automattic/jetpack-crm at the reviewed revision](https://github.com/Automattic/jetpack-crm/tree/8dbe017c517819a7f6c583dff6e4cb8819a7f72e) |
| API contract | [API documentation source at the reviewed revision](https://github.com/Automattic/jetpack-crm-api-docs/tree/c2a53fd8d6de70f27c87bd15652ccacf0ecabd3f) |
| Integration examples | [Code examples at the reviewed revision](https://github.com/Automattic/jetpack-crm-code-examples/tree/b0048ae9c73a8bd3d2029aa343317240ecb7af73) |
| Published plugin | [WordPress.org Jetpack CRM listing](https://wordpress.org/plugins/zero-bs-crm/) |

The page's `source_ref` pins Jetpack for cross-product references such as Forms. CRM itself is separately pinned in this repository's `docs/source-revisions.json` registry to `8dbe017c517819a7f6c583dff6e4cb8819a7f72e`; its API docs and code examples have their own immutable revisions.

## Prerequisites and data responsibility

- A WordPress site where an authorized administrator can install the `zero-bs-crm` plugin.
- WordPress 6.0 or newer and PHP 7.4 or newer at the reviewed CRM revision.
- An explicit assignment of CRM Admin, Contact Manager, Quote Manager, Invoice Manager, Transaction Manager, Contact, and Mail Manager roles. These map to object-specific capabilities rather than one generic CRUD/export switch.
- A backup and retention plan appropriate for contacts, notes, transactions, and enabled extensions.
- A documented legal basis and privacy notice for the customer data the organization collects.

CRM records can be more sensitive than ordinary post content. Use synthetic contacts for tests, keep exports out of public or shared storage, and never include real customer data in a GitHub issue.

## Jetpack relationship

Jetpack's public source recognizes the separately installed CRM plugin and Jetpack Forms can offer a CRM integration. That relationship does not move CRM ownership into the Jetpack monorepo. A core CRM defect belongs in the CRM project; a defect in Jetpack's integration UI or package belongs in Jetpack with evidence showing which side failed.
