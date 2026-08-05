---
title: "Develop and test Jetpack Search"
description: "Build the Search plugin and shared package, then verify query, index, block, and dashboard behavior."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "search"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/search/\nprojects/plugins/jetpack/modules/search.php\nprojects/packages/\n  search/\n  sync/src/modules/class-search.php","caption":"Jetpack Search source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Search project checks","shell":"bash","prompt":"$","command":"jp install plugins/search\njp build plugins/search \u002d\u002ddeps\njp test php plugins/search\njp test php packages/search\njp test js packages/search\njp phan plugins/search\njp phan packages/search","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

Search has a thin standalone plugin in `projects/plugins/search` and most reusable behavior in `projects/packages/search`. Index ownership also crosses `projects/packages/sync/src/modules/class-search.php` and `projects/plugins/jetpack/modules/search.php`; block taxonomy mapping, AI Answers, and Site Chat live within the Search package. Inspect the owning layer when a bug crosses activation, connection, dashboard, query, Sync, or block behavior.

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
- Distinguish result modes: Classic and Inline request IDs and resolve local WordPress posts, while Instant Search requests and renders selected remote fields directly. Test visibility and escaping in both architectures.
- Preserve PHP compatibility declared by the project.
- Add changelog entries for both the plugin and package when both projects change.
- Test with the standalone Search plugin and any main-Jetpack integration affected by the package.
- Exercise keyboard and screen-reader behavior for overlays, filters, and result updates.

Review the pinned [Search plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/search) and [Search package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search). For repository conventions, continue to [Building with Jetpack](/docs/building-with-jetpack/).
