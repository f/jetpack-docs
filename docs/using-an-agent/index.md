---
title: Using an agent with Jetpack
description: Give an AI agent reliable context, bounded authority, and a verifiable Jetpack task.
audience: agent-user
document_type: overview
sidebar_position: 20
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

An agent can search a large codebase, explain an extension point, prepare a change, and run checks. It cannot infer your production authority, recover context you did not provide, or make an undocumented interface stable.

<!-- wp:docspress/audience-paths {"eyebrow":"Agent workflow","title":"Give the agent a reliable job","description":"Start with sources and boundaries, then review evidence rather than accepting confident output.","paths":[{"title":"Supply context","description":"Name the product, versions, source revision, goal, environment, and constraints.","url":"/docs/using-an-agent/give-agent-context/","cta":"Prepare context","icon":"document","accent":"blue","newTab":false},{"title":"Copy a prompt","description":"Use a task-specific prompt that requires sources, verification, and rollback.","url":"/docs/using-an-agent/prompts/","cta":"Open prompts","icon":"sparkles","accent":"gold","newTab":false},{"title":"Verify the work","description":"Inspect diffs, run focused checks, and confirm the visible behavior yourself.","url":"/docs/using-an-agent/review-and-verify/","cta":"Review output","icon":"testing","accent":"green","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## A safe default

<!-- wp:docspress/prompt {"prompt":"Read the relevant Jetpack Docs pages and their cited public source before answering. Restate the goal, affected product, supported versions, and constraints. Prefer documented extension points. Do not use secrets or change production. Cite the files and documentation used, show the smallest proposed change, and provide focused verification and rollback steps.","model":"Any capable coding agent","mode":"plan","thinking":true,"context":"Jetpack Docs, pinned Jetpack source, the target site's versions and environment","caption":"Use this before a Jetpack research or implementation task."} /-->

Continue with [Give your agent context](give-agent-context.md).
