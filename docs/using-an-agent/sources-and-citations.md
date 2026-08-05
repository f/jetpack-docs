---
title: Choose sources and require citations
description: Establish a source hierarchy for Jetpack answers and make agent claims auditable.
audience: agent-user
document_type: reference
sidebar_position: 30
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

Use this evidence order:

1. The exact supported release or pinned source revision for behavior.
2. Product and package documentation maintained with that source.
3. Canonical public product support or developer documentation.
4. Tests that demonstrate the behavior and edge cases.
5. Issues or discussions as context, never as the sole contract.

Require links to exact files and immutable commits for source claims. A link to a moving branch is useful for navigation but cannot prove what a particular version contained.

Ask the agent to label an inference as an inference. If documentation and source disagree, it should report the conflict, follow source for current behavior, and propose a documentation correction separately rather than blending both into a confident answer.
