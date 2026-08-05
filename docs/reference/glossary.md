---
title: Glossary
description: Definitions for recurring Jetpack product, connection, package, and contribution terms.
audience: developer
document_type: reference
sidebar_position: 110
sidebar_collapsed: true
---

**Action** — A WordPress hook that announces an event and ignores callback return values.

**Filter** — A WordPress hook that passes a value through callbacks; each callback must return the value for the next callback.

**Jetpack connection** — The system that registers a site and, where required, authorizes local users for connected services.

**Offline mode** — A state intended for local or disconnected development in which cloud-dependent Jetpack behavior is unavailable.

**Package** — An independently versioned Composer or npm project inside the Jetpack monorepo.

**Project identifier** — A CLI path relative to `projects/`, such as `plugins/jetpack` or `packages/sync`.

**Site connection** — Registration and credentials belonging to the WordPress site.

**Sync** — Jetpack's allowlisted, queued flow for representing selected WordPress changes to connected infrastructure.

**User connection** — Authorization associating a local WordPress user with a WordPress.com account.

**WorDBless** — A lightweight WordPress test environment used by some Jetpack packages.

**`$$next-version$$`** — A source placeholder replaced with the owning project's version during release.
