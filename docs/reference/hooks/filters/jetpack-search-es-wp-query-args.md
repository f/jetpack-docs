---
title: "jetpack_search_es_wp_query_args"
description: Filters the WP_Query-style arguments Jetpack Search translates into a service search request.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
product: search
hook_name: jetpack_search_es_wp_query_args
hook_type: filter
since: "5.0.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/classic-search/class-classic-search.php#L517-L551
last_reviewed: "2026-08-05"
---

## Behavior

Jetpack Search applies this filter after it builds WP_Query-style search arguments from the original `WP_Query` and before it validates pagination and post types, translates the arguments into service-query form, and sends the search request. Classic Search calls the value `$es_wp_query_args`; Inline Search applies the same hook to its equivalent `$wp_query_args` array.

At the pinned revision, the base array includes `query`, `posts_per_page`, `paged`, `orderby`, `order`, `post_type`, and `terms`, with `aggregations` and `author_name` added when applicable.

## Callback signature

```php
function ( array $search_args, WP_Query $query ): array
```

Register with two accepted arguments:

```php
add_filter( 'jetpack_search_es_wp_query_args', 'my_callback', 10, 2 );
```

## Parameters

- `$search_args` (`array<string, mixed>`) — the current WP_Query-style arguments that Jetpack Search will validate and translate. Earlier callbacks may already have changed them.
- `$query` (`WP_Query`) — the original WordPress query from which Jetpack Search built the arguments.

## Return behavior

Return the complete argument array, including untouched keys your integration does not own. Values must remain compatible with Jetpack Search's WP-style-to-service translation. In particular, `paged` and `posts_per_page` must support integer arithmetic, and `post_type` must continue to identify public, indexed content. Returning an empty or malformed array can produce a 404, an invalid service request, or incorrect totals.

## Since, deprecation, and replacement

Introduced in Jetpack 5.0.0 according to the hook annotation retained by the Search package. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Search. Package: `automattic/jetpack-search`. Source project: `projects/packages/search`. Primary caller: `Automattic\Jetpack\Search\Classic_Search::do_search()`; `Inline_Search::do_search()` applies the same contract before its API translation.

## Example

This companion plugin caps only the main front-end search to ten results per page while preserving every other argument. It updates the original query to the same limit because Search later uses that object to fetch the matched local posts and calculate pagination:

```php
<?php
/**
 * Plugin Name: My Jetpack Search result cap
 */

function myjp_cap_jetpack_search_results( $search_args, $query ) {
	if ( ! $query->is_main_query() || ! $query->is_search() ) {
		return $search_args;
	}

	$requested                      = max( 1, (int) $search_args['posts_per_page'] );
	$limit                          = min( 10, $requested );
	$search_args['posts_per_page'] = $limit;
	$query->set( 'posts_per_page', $limit );

	return $search_args;
}
add_filter( 'jetpack_search_es_wp_query_args', 'myjp_cap_jetpack_search_results', 10, 2 );
```

## Compatibility and failure cautions

This filter uses a historical `es` name but receives WP_Query-style values, not raw Elasticsearch JSON. Prefer it to the lower-level `jetpack_search_es_query_args` filter. Do not add private or unindexed post types, undocumented service fields, credentials, or raw user input. Preserve keys added by earlier callbacks, and keep `paged`, `posts_per_page`, and `post_type` valid because Jetpack checks them immediately after the filter. If changing page size, keep the filtered arguments and original `WP_Query` synchronized or local fetching and pagination can disagree with the service result. The filter does not run when Jetpack Search declines the query or is inactive.

## Verification

Install the example on a disposable connected site with more than ten matching indexed posts. Run a front-end main search and confirm that no page returns more than ten results. Follow the next-page link and verify results do not repeat, totals remain consistent, and no 404 appears within the valid result range. Test a no-results term and any site-specific search filters, then disable the companion plugin and confirm the site's configured page size returns.

## Source

[View Classic Search's base argument construction and filter application at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/classic-search/class-classic-search.php#L517-L551)

[View the equivalent Inline Search hook application at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/inline-search/class-inline-search.php#L170-L204)
