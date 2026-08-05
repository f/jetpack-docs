---
title: "Develop and test Jetpack Search"
description: "Build the Search plugin and shared package, then verify query, index, block, and dashboard behavior."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "search"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Search has a thin standalone plugin in `projects/plugins/search` and most reusable behavior in `projects/packages/search`. Inspect both when a bug crosses activation, connection, dashboard, query, or block behavior.

## Build the complete dependency path

```bash
jp install plugins/search
jp build plugins/search --deps
```

The `--deps` build matters because the plugin consumes the Search package and other shared Jetpack packages. Use `jp watch packages/search` for package assets when iterating locally.

## Run tests at the owning layer

```bash
jp test php plugins/search
jp test php packages/search
jp test js packages/search
jp phan plugins/search
jp phan packages/search
```

The plugin's JavaScript build is intentionally minimal; JavaScript behavior belongs primarily to the package. Add tests for query conversion, public post-type restrictions, filters and facets, REST permissions, block rendering, and Instant Search state at the layer that owns them.

Service-backed behavior also needs an integration check. Use a disposable connected site with test content and a unique query corpus. Verify create, update, and delete indexing; direct WordPress search URLs; the Instant Search interface; and fallback behavior when the service cannot answer. Do not put production connection tokens or copied response bodies in fixtures.

## Review requirements

- Keep search results restricted to content WordPress considers public.
- Treat remote result content as an index mirror: the source code deliberately trusts result identifiers and resolves content through WordPress.
- Preserve PHP compatibility declared by the project.
- Add changelog entries for both the plugin and package when both projects change.
- Test with the standalone Search plugin and any main-Jetpack integration affected by the package.
- Exercise keyboard and screen-reader behavior for overlays, filters, and result updates.

Review the pinned [Search plugin source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/search) and [Search package source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search). For repository conventions, continue to [Building with Jetpack](/docs/building-with-jetpack/).
