---
title: "Connection regression suite"
description: "Preserve the source site, user, multisite, and consuming-plugin connection checks."
audience: contributor
document_type: reference
sidebar_position: 70
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/testing/regression-checklist/test-suites/packages/connection.md"
source_blob: d023366aca89ba7a2ff4a31b2b5b5218f542b79e
source_sha256: 2bdeb2b4c81e737520db5777b90d65d204a48aa9aa79519b88789506bb46a800
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/testing/regression-checklist/test-suites/packages/connection.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

#### Connection

- ☐ In-place connection with free plan
- ☐ In-place connection with paid plan
- ☐ In-place connection with product purchase
- ☐ Classic connection. Use Safari, or set a constant `JETPACK_SHOULD_NOT_USE_CONNECTION_IFRAME` to true
- ☐ Disconnect/reconnect connection
- ☐ Secondary user connection
- ☐ Connection on multisite

Verify that the changes are compatible with the plugins that use the connection package.
- ☐ WooCommerce Payments
- ☐ Jetpack Boost
- ☐ Previous versions of Jetpack
<!-- jetpack-docs:preserved-source:end -->
