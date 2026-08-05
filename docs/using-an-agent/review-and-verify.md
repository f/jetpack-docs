---
title: Review and verify agent output
description: Evaluate evidence, diffs, tests, and visible behavior before accepting agent work.
audience: agent-user
document_type: how-to
sidebar_position: 50
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Review the reasoning inputs

Confirm that cited documentation and source match the product and version. Look for claims based on moving branches, private endpoints, generated files, rendered DOM, or guessed configuration keys.

## Review the change

- Inspect the complete diff and current worktree status.
- Confirm only authorized files and systems changed.
- Check permissions, nonces, escaping, data handling, failure states, and compatibility.
- Make sure examples modify an external plugin or theme, not Jetpack source on a live site.
- Require a changelog entry when the owning Jetpack project requires one.

## Verify independently

Run the focused automated checks, then reproduce the visible behavior in the correct runtime. Compare before and after states, test failure and rollback paths, and record skipped checks. A passing syntax check does not prove a WordPress or browser interaction.

Reject output that cannot name its evidence, has not inspected the actual source, or reports success without observing the required result.
