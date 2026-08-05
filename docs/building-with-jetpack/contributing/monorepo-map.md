---
title: Monorepo map
description: Find the project, package, tests, and build contract that own a Jetpack change.
audience: contributor
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
---

| Path | Owns |
| --- | --- |
| `projects/plugins/` | Installable WordPress plugins such as Jetpack, Boost, Search, Social, Protect, and VideoPress |
| `projects/packages/` | Composer packages for connection, Sync, blocks, status, forms, and other shared PHP behavior |
| `projects/js-packages/` | Published or shared npm packages and UI libraries |
| `projects/github-actions/` | Reusable actions maintained with the monorepo |
| `tools/` | CLI, Docker, build, release, and repository automation |
| `docs/` | Contributor documentation for the source repository |

Each project declares its own build and test scripts in `composer.json`. Read that file, the project README, its changelog directory, and nearby tests before editing. Shared code should live in an existing package when that package already owns the concept; adding a second implementation increases bundle size and creates competing contracts.

Use `projects/plugins/jetpack` for the Jetpack plugin shell and modules, while reusable behavior commonly lives in `projects/packages`. Generated `_inc/build`, `dist`, or vendor output is not the design source unless project instructions explicitly say otherwise.

Browse the [pinned project tree](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects) and then use [Jetpack CLI](jetpack-cli.md) with a project identifier such as `plugins/jetpack` or `packages/connection`.
