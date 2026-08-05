---
title: "Memberships regression suite"
description: "Preserve the source Premium Content and post-visibility regression cases."
audience: contributor
document_type: reference
sidebar_position: 30
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/testing/regression-checklist/test-suites/extensions/blocks/memberships.md"
source_blob: 4bdf2cdc9565ad94dae84727dbc0bb26d760fafc
source_sha256: f3e0c013ac5688269a7298a86589e39b0113c6ae36c8b135463a77155f119419
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/testing/regression-checklist/test-suites/extensions/blocks/memberships.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

#### Memberships

##### Post visibility

- ☐ Create a post with a post-level setting of "everybody" and verify the post and comments are visible in an incognito window
- ☐ Create a post with a post-level setting of "subscriber-only" and verify the post and comments are only visible to subscribers
- ☐ Create a post with a post-level setting of "paid-subscriber" and verify the post and comments are only only visible to paid subscribers
- ☐ Create a post with a post-level setting of "subscriber" and verify an existing subscriber receives a valid OTP code when their email is entered in the subscribe field


##### Premium Content

- ☐ Add a new payment plan from the premium content block settings
- ☐ Publish a post with subscriber and guest content then verify only subscribers can view content
<!-- jetpack-docs:preserved-source:end -->
