---
title: Prompt an agent to build a Jetpack integration
description: Ask for the smallest supported extension using hooks, blocks, REST APIs, or packages.
audience: agent-user
document_type: tutorial
sidebar_position: 30
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

<!-- wp:docspress/prompt {"prompt":"Design a minimal integration that [outcome] with [Jetpack product/version]. Read Choose an extension point, the product's Extend, hooks, and APIs page, and cited source at the pinned revision. Compare supported hooks, block interfaces, REST APIs, and reusable packages; reject private endpoints, generated bundles, DOM selectors, and database details as contracts. Recommend one approach, list its public interface and failure modes, show the smallest implementation outside Jetpack, and give tests for the oldest and newest supported versions. Do not edit files until the plan and scope are confirmed.","model":"Coding agent","mode":"code","thinking":true,"context":"Jetpack Docs, target project, pinned source","caption":"Prefer a maintained public contract over a convenient internal detail."} /-->

Start with [Choose an extension point](/docs/building-with-jetpack/choose-an-extension-point/).
