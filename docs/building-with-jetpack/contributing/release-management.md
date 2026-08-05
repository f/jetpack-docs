---
title: Release management
description: Understand the automated, project-specific Jetpack release process and contributor responsibilities.
audience: contributor
document_type: overview
sidebar_position: 100
sidebar_collapsed: true
---

Jetpack monorepo projects are versioned and released independently. Release tooling assembles changelog fragments, updates project versions, builds artifacts, and creates tags according to the owning project's workflow.

Most contributors should not edit release versions or generated changelogs manually. Their release responsibilities are to classify the change accurately, add a valid project changelog entry, keep tests green, describe compatibility impact, and identify any required migration or rollback.

## Before a release-worthy merge

- Confirm every affected project and dependent package is represented.
- Use `$$next-version$$` in new `@since` and deprecation annotations.
- Run `tools/fixup-project-versions.sh` after dependency version changes.
- Test production builds, not only development bundles.
- Document schema, option, scheduled-task, and content migrations so they are repeatable and safe to retry.
- Do not create tags or publish registry artifacts outside the documented release workflow.

Release leads should use the current project workflow and public [release documentation](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/docs/release-management.md); the source branch is authoritative when this overview differs.
