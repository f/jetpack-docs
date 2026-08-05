---
title: Prompt an agent to prepare a Jetpack contribution
description: Scope a monorepo change, select project-specific checks, and produce a reviewable diff.
audience: agent-user
document_type: tutorial
sidebar_position: 50
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

<!-- wp:docspress/prompt {"prompt":"Prepare a Jetpack monorepo change for [issue/outcome] in [project path]. Inspect root and nested AGENTS.md files, the project's composer.json/package.json scripts, nearby conventions, tests, and changelog rules. Restate scope and acceptance criteria, preserve unrelated worktree changes, and propose the smallest file set. After approval, implement, add project-scoped tests, run the relevant build/test/static checks, and report exact results. Do not stage, commit, push, or create a pull request unless those actions are explicitly authorized.","model":"Coding agent","mode":"code","thinking":true,"context":"Jetpack contribution guides and current checkout","caption":"Repository instructions and the actual project scripts are authoritative."} /-->

See [Contribute to Jetpack](/docs/building-with-jetpack/contributing/).
