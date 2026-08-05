---
title: "jetpack_instant_search_options"
description: Filters Jetpack Instant Search presentation state and shared query-customization options.
audience: developer
document_type: reference
sidebar_position: 70
sidebar_collapsed: true
product: search
hook_name: jetpack_instant_search_options
hook_type: filter
since: "7.7.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/class-helper.php#L997-L1006
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_instant_search_options callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$options","type":"array\u003cstring, mixed\u003e","required":true,"defaultValue":"","description":"the current Instant Search options. Depending on the call site, it can contain the full browser configuration or begin as an empty array for query customization.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_instant_search_options.php","code":"\u003c?php\n/**\n * Plugin Name: My Instant Search highlight fields\n */\n\nfunction myjp_limit_search_highlight_fields( $options ) {\n\t$options = is_array( $options ) ? $options : array();\n\n\t$options['highlightFields'] = array( 'title', 'content' );\n\n\treturn $options;\n}\nadd_filter( 'jetpack_instant_search_options', 'myjp_limit_search_highlight_fields', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_instant_search_options contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_instant_search_options","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 7.7.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Search applies this filter to the full option array generated for the Instant Search browser interface. That array includes overlay presentation, post types, locale, REST state, privacy state, widget data, and feature flags. At the pinned revision, Search also reuses the same hook with an empty input array to read query-customization keys for Inline Search and Search blocks.

A callback must therefore tolerate both a complete presentation array and a sparse or empty array. Query keys recognized by the shared parser include `highlightPhraseOnly`, `highlightFilterStopwords`, `highlightFields`, `additionalBlogIds`, `adminQueryFilter`, and `customResults`.

## Callback signature

```php
function ( array $options ): array
```

Register with one accepted argument:

```php
add_filter( 'jetpack_instant_search_options', 'my_callback', 10, 1 );
```

## Parameters

- `$options` (`array<string, mixed>`) — the current Instant Search options. Depending on the call site, it can contain the full browser configuration or begin as an empty array for query customization.

## Return behavior

Return the complete options array. Preserve unrelated keys and their types. Query-customization readers normalize supported keys, but the browser state consumes many other values directly. Returning a non-array can break PHP callers and the serialized front-end configuration.

## Since, deprecation, and replacement

Introduced in Jetpack 7.7.0. It is not deprecated at the pinned revision and has no replacement. The newer shared parser that makes the query-customization keys available to server-rendered Search experiences is annotated `@since $$next-version$$` at the pinned development revision; do not infer that every older released version honors those keys.

## Ownership

Product: Jetpack Search. Package: `automattic/jetpack-search`. Source project: `projects/packages/search`. Primary owner: `Automattic\Jetpack\Search\Helper::generate_initial_javascript_state()`; the package also uses the filter for shared server-side query customization.

## Example

This companion plugin limits highlighted fields to titles and post content. The key is safe to add to an empty array and is also preserved in the complete browser configuration.

```php
<?php
/**
 * Plugin Name: My Instant Search highlight fields
 */

function myjp_limit_search_highlight_fields( $options ) {
	$options = is_array( $options ) ? $options : array();

	$options['highlightFields'] = array( 'title', 'content' );

	return $options;
}
add_filter( 'jetpack_instant_search_options', 'myjp_limit_search_highlight_fields', 10, 1 );
```

Test the result in every Search presentation your site enables; the hook is no longer exclusive to the overlay.

## Compatibility and failure cautions

Never log the complete option array or add credentials, private content, or secrets. The full form includes a REST nonce and is serialized for browser use, so every custom key added there must be safe to expose to a visitor. Preserve `apiRoot`, `apiNonce`, site and privacy state, post types, and nested `overlayOptions` unless the integration explicitly owns and tests that behavior. Do not assume those implementation keys remain unchanged across releases.

Callbacks run more than once and with different initial shapes. Keep them deterministic, fast, and free of remote calls. Validate every custom result ID, blog ID, filter structure, and highlight-field name before returning it. A malformed array can produce invalid service arguments or a broken interface, and broad query customization can expose content the site's normal Search configuration was meant to exclude. Version-test the shared server-side behavior because it is still marked for the next package release at the pinned source revision.

## Verification

With the companion plugin active, verify both input shapes without making a remote request:

```sh
wp eval 'var_export( apply_filters( "jetpack_instant_search_options", array() ) );'
wp eval '$options = apply_filters( "jetpack_instant_search_options", array( "overlayOptions" => array( "colorTheme" => "light" ), "sentinel" => true ) ); var_export( array( $options["highlightFields"] ?? null, $options["sentinel"] ?? null ) );'
```

Expect `highlightFields` to contain `title` and `content`, while the sentinel remains `true`. On a disposable Search site, exercise the overlay, Inline Search, and any Search blocks in use. Confirm expected highlighting, unchanged privacy boundaries, no browser console errors, and no private values added to the page source.

## Source

[View the primary filter DocBlock, @since, parameter, and return at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/class-helper.php#L997-L1006) The [surrounding method shows the complete browser option shape](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/class-helper.php#L924-L1006), and the [shared parser documents and normalizes the query-customization keys](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/class-helper.php#L1024-L1102).
