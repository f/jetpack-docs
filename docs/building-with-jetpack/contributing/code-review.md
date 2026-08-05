---
title: Code review
description: Review Jetpack changes for behavior, contracts, safety, tests, and maintainability.
audience: contributor
document_type: how-to
sidebar_position: 70
sidebar_collapsed: true
---

Review the user outcome first, then trace the implementation through its public and internal boundaries. Reproduce the problem or feature using the pull request's instructions before concentrating on style.

## Reviewer checklist

- Scope matches the stated problem and reuses an existing package or WordPress API where appropriate.
- Public functions, hooks, schemas, and UI behavior are documented and backward-compatible.
- Authorization, nonces, validation, escaping, privacy, and remote-call failure are addressed.
- PHP syntax matches the supported minimum; JavaScript and CSS follow the owning project.
- CSS uses logical properties where direction matters, and interactive UI works by keyboard and with assistive technology.
- Tests would fail before the change and cover important failure states.
- Each changed project has a valid changelog entry, or a justified empty entry.
- Generated files, dependency locks, and build artifacts change only when required.

Leave actionable comments tied to behavior and risk. Distinguish blocking correctness issues from optional alternatives, and re-check resolved threads against the new diff. Do not ask authors to replace `$$next-version$$`; that placeholder is intentional.

See the [pinned review guide](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/docs/code-reviews.md).
