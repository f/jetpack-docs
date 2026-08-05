---
title: "jetpack_search_should_handle_query"
description: Filters whether Jetpack Search should handle a specific WordPress query.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
product: search
hook_name: jetpack_search_should_handle_query
hook_type: filter
since: "5.6.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/classic-search/class-classic-search.php#L2012-L2030
last_reviewed: "2026-08-05"
---

## Behavior

Jetpack Search applies this filter whenever its Classic Search implementation asks whether it should handle a `WP_Query`; Inline Search and Instant Search inherit the same method. The default is `true` only when the object is both the main query and a search query. Jetpack checks the decision before it prepares or sends a search-service request, and it may call the method from more than one point in a request. Instant Search also uses the inherited decision in its `posts_pre_query` handler before bypassing the normal main query.

## Callback signature

```php
function ( bool $should_handle, WP_Query $query ): bool
```

Register with two accepted arguments:

```php
add_filter( 'jetpack_search_should_handle_query', 'my_callback', 10, 2 );
```

## Parameters

- `$should_handle` (`bool`) — Jetpack Search's current decision. The initial value is whether `$query` is the main WordPress query and a search query; an earlier callback may have changed it.
- `$query` (`WP_Query`) — the query being evaluated. Read its flags and query variables; do not execute it again from the callback.

## Return behavior

Return `true` to let Jetpack Search handle the query or `false` to leave it to WordPress and other query handlers. Preserve an incoming `false` unless the integration deliberately and safely expands Search to another query. Always return a boolean.

## Since, deprecation, and replacement

Introduced in Jetpack 5.6.0 according to the hook annotation retained by the Search package. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Search. Package: `automattic/jetpack-search`. Source project: `projects/packages/search`. Method: `Automattic\Jetpack\Search\Classic_Search::should_handle_query()`, inherited by `Inline_Search` and `Instant_Search`.

## Example

This companion plugin registers a public query variable and keeps only explicitly marked searches on the site's local WordPress query path:

```php
<?php
/**
 * Plugin Name: My local-search exception
 */

function myjp_register_local_search_query_var( $query_vars ) {
	$query_vars[] = 'my_local_search';

	return $query_vars;
}
add_filter( 'query_vars', 'myjp_register_local_search_query_var' );

function myjp_should_jetpack_handle_query( $should_handle, $query ) {
	if ( ! $should_handle ) {
		return false;
	}

	return '1' !== (string) $query->get( 'my_local_search' );
}
add_filter( 'jetpack_search_should_handle_query', 'myjp_should_jetpack_handle_query', 10, 2 );
```

With this plugin active, a request such as `/?s=example&my_local_search=1` remains local; an ordinary main search can still use Jetpack Search.

## Compatibility and failure cautions

Returning `true` for secondary, admin, REST, or non-search queries can redirect work that Jetpack Search was not designed to handle and can change pagination, totals, permissions, and other plugins' expectations. Preserve earlier callbacks' restrictive decisions. Keep the callback free of nested queries because Jetpack can evaluate the decision repeatedly. A `false` result does not disable Jetpack Search globally; it declines only the supplied query. If the package or Search module is inactive, this filter is never applied.

## Verification

Install the example on a disposable connected site with Jetpack Search active. Visit an ordinary front-end search and confirm Search returns its expected results. Then add `my_local_search=1`, confirm the request still returns WordPress search results, and use the site's HTTP/request diagnostics to confirm no Jetpack Search request handles that query. Test pagination and a no-results term in both modes. Disable the companion plugin and repeat the marked URL to prove the local exception is removed.

## Source

[View the default decision, parameter documentation, and filter application at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/classic-search/class-classic-search.php#L2012-L2030)

[View Instant Search's inherited decision in its `posts_pre_query` path at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search/src/instant-search/class-instant-search.php#L161-L185)
