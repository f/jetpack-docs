---
title: "Extend Jetpack Search: hooks and APIs"
description: "Customize supported WordPress query and Instant Search behavior while respecting the service boundary."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "search"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Search offers WordPress filters for deciding which queries it handles and for translating a `WP_Query` into search-service arguments. Prefer WP-style filters over the lower-level Elasticsearch-shaped filter.

## Decline a query

[`jetpack_search_should_handle_query`](/docs/reference/hooks/filters/jetpack-search-should-handle-query/) receives the current decision and `WP_Query`. Return `false` for a narrowly identified query that should remain local.

```php
add_filter(
	'jetpack_search_should_handle_query',
	function ( $should_handle, $query ) {
		if ( $query->get( 'acme_local_search' ) ) {
			return false;
		}
		return $should_handle;
	},
	10,
	2
);
```

Do not return `true` for arbitrary secondary queries. The default is the main WordPress search query, and widening it can change admin, widget, or plugin queries unexpectedly.

## Constrain WP-style search arguments

[`jetpack_search_es_wp_query_args`](/docs/reference/hooks/filters/jetpack-search-es-wp-query-args/) receives an argument array plus the original query. Preserve public-content restrictions.

```php
add_filter(
	'jetpack_search_es_wp_query_args',
	function ( $args, $query ) {
		if ( $query->get( 'acme_docs_only' ) ) {
			$args['post_type'] = array( 'documentation' );
		}
		return $args;
	},
	10,
	2
);
```

Test paging, totals, filters, and no-results behavior. Never add a non-public post type to work around an indexing problem.

Other useful contracts include `jetpack_search_query_languages`, `jetpack_search_static_filters`, `jetpack_search_custom_taxonomy_map`, and `jetpack_instant_search_options`. The lower-level `jetpack_search_es_query_args` requires a valid service query and is easy to break; use it only when the WP-style contract cannot express the requirement. Review [the hooks reference](/docs/reference/hooks/) and the source at the pinned revision before shipping.

## Blocks and API boundary

Search registers editor surfaces and uses authenticated routes and a connected service to power its dashboard and queries. The plugin's internal REST requests and remote service request shape are not a general-purpose public Search API. Do not copy endpoints, tokens, or dashboard requests. Build front-end customizations with supported Search blocks, WordPress templates, CSS that respects accessible states, and the documented filters above. See [Blocks and editor interfaces](/docs/reference/blocks-and-editor-interfaces/) and [REST API boundaries](/docs/reference/rest-api/).
