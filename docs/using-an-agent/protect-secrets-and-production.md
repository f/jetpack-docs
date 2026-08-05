---
title: Protect secrets, private data, and production sites
description: Keep agent context and actions within explicit data and environment boundaries.
audience: agent-user
document_type: reference
sidebar_position: 60
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

Never place access tokens, cookies, nonces, private URLs, customer records, form submissions, unpublished content, or complete production logs in a prompt. Redact values rather than merely hiding them from a screenshot.

Give the agent the least authority needed:

- Prefer read-only inspection before changes.
- Use local or staging environments for implementation and reproduction.
- Name the files, repositories, sites, and external services in scope.
- Separate permission to edit from permission to stage, commit, push, deploy, message, or delete.
- Require confirmation before irreversible actions or actions that expand access.
- Rotate a secret immediately if it is exposed.

Production checks should use synthetic data and reversible changes. If the task requires private evidence, use an approved tool and access path; do not copy it into public files, issues, commits, or documentation.
