---
title: Choose an extension point
description: Select the smallest supported Jetpack interface for a plugin, theme, or service integration.
audience: developer
document_type: how-to
sidebar_position: 10
sidebar_collapsed: true
---

Begin with the user outcome, then locate its owning product in the [product catalog](../products/index.md). The product's “Extend, hooks, and APIs” page is the authority for the surfaces it intentionally exposes.

## Decision guide

| Need | Prefer | Verify |
| --- | --- | --- |
| React to a server-side event or adjust a value | A documented WordPress action or filter | Name, parameters, timing, return type, and version |
| Add editor behavior or content | A registered block, variation, slot/fill, or block filter | Registration metadata, saved markup, and editor/front-end parity |
| Read or change site data over HTTP | A documented WordPress or Jetpack REST route | Authentication, capability callback, schema, and errors |
| Reuse connection, Sync, status, or UI behavior in another project | A published Jetpack package | Package README, Composer/npm version, bootstrap requirements |
| Change Jetpack's product behavior for everyone | A contribution to the owning project | Project build, tests, changelog, and review path |

Avoid these as integration contracts: private methods, generated build files, Redux store internals, undocumented remote endpoints, database rows written by another component, and PHP classes loaded only as an implementation detail.

## Confirm the boundary

Before coding, record the product, public interface, minimum supported versions, data crossing the boundary, required capability, and expected behavior when Jetpack is disabled. If the product page says no public PHP hook exists, use the supported block, REST, or package surface instead of intercepting internal execution.

Next, [build a first integration](build-a-first-integration.md).
