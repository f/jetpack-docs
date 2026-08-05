---
title: Jetpack CRM
description: Use Jetpack CRM while routing source, API, contribution, and support work to the repositories that own the product.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: crm
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack CRM is a separately maintained WordPress plugin for contacts and customer workflows. Its implementation is not part of the Jetpack monorepo. This section gives Jetpack users a stable product route, then sends implementation, API, testing, and support work to the public CRM sources that own it.

## Follow the lifecycle

- [Use and configure CRM](/docs/products/crm/use-and-configure/) to install the plugin, define access and data rules, and verify a controlled customer workflow.
- [Extend CRM, hooks, and APIs](/docs/products/crm/extend-hooks-and-apis/) to start from the owning API documentation and code examples.
- [Develop and test CRM](/docs/products/crm/develop-and-test/) to contribute in `Automattic/jetpack-crm`, not under `projects/plugins` in Jetpack.
- [Troubleshoot and support CRM](/docs/products/crm/troubleshoot-and-support/) to isolate CRM, extension, Forms integration, and hosting problems.

## Ownership map

| Need | Owning public source |
| --- | --- |
| Current setup and operation | [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) |
| Plugin implementation and project tests | [Automattic/jetpack-crm](https://github.com/Automattic/jetpack-crm) |
| API contract | [Published Jetpack CRM API reference](https://automattic.github.io/jetpack-crm-api-docs/) |
| Integration examples | [Automattic/jetpack-crm-code-examples](https://github.com/Automattic/jetpack-crm-code-examples) |
| Published plugin | [WordPress.org Jetpack CRM listing](https://wordpress.org/plugins/zero-bs-crm/) |

The `source_ref` on this page pins the Jetpack revision used to verify cross-product references, such as the Forms integration. It does not pin the separately released CRM repository. Re-check CRM's current default branch and release documentation before implementing a change.

## Prerequisites and data responsibility

- A WordPress site where an authorized administrator can install the `zero-bs-crm` plugin.
- Defined roles for reading, editing, exporting, and deleting customer records.
- A backup and retention plan appropriate for contacts, notes, transactions, and enabled extensions.
- A documented legal basis and privacy notice for the customer data the organization collects.

CRM records can be more sensitive than ordinary post content. Use synthetic contacts for tests, keep exports out of public or shared storage, and never include real customer data in a GitHub issue.

## Jetpack relationship

Jetpack's public source recognizes the separately installed CRM plugin and Jetpack Forms can offer a CRM integration. That relationship does not move CRM ownership into the Jetpack monorepo. A core CRM defect belongs in the CRM project; a defect in Jetpack's integration UI or package belongs in Jetpack with evidence showing which side failed.
