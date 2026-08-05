---
title: "jetpack_boost_cache_bypass_patterns"
description: Filters the regular-expression patterns Jetpack Boost uses to keep matching request paths out of Page Cache.
audience: developer
document_type: reference
sidebar_position: 60
sidebar_collapsed: true
product: boost
hook_name: jetpack_boost_cache_bypass_patterns
hook_type: filter
since: "3.2.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/class-request.php#L107-L123
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_boost_cache_bypass_patterns callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$bypass_patterns","type":"array\u003cint, string\u003e","required":true,"defaultValue":"","description":"regular-expression fragments for normalized URL paths that must bypass Page Cache.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_boost_cache_bypass_patterns.php","code":"\u003c?php\n/**\n * Plugin Name: My Boost cache bypass\n */\n\nfunction myjp_add_members_cache_bypass( $patterns ) {\n\t$patterns = is_array( $patterns ) ? $patterns : array();\n\n\t$patterns[] = '/members(?:/.*)?';\n\n\treturn array_values( array_unique( $patterns ) );\n}\nadd_filter( 'jetpack_boost_cache_bypass_patterns', 'myjp_add_members_cache_bypass', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_boost_cache_bypass_patterns contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_boost_cache_bypass_patterns","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 3.2.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Boost applies this filter while deciding whether a request path is excluded from Page Cache. The incoming array comes from Boost's saved bypass settings. After callbacks return, Boost appends its own `wp-.*\.php` pattern and tests each non-empty entry as a regular expression wrapped in `~^…/?$~` against the normalized request path. A match makes the request ineligible for Page Cache.

Boost removes the query string and normalizes the trailing slash before this comparison. The hook can run from code designed to execute through `advanced-cache.php`, before WordPress has loaded regular or must-use plugins, as well as from the initialized Boost code path.

## Callback signature

```php
function ( array $bypass_patterns ): array
```

Register with one accepted argument:

```php
add_filter( 'jetpack_boost_cache_bypass_patterns', 'my_callback', 10, 1 );
```

## Parameters

- `$bypass_patterns` (`array<int, string>`) — regular-expression fragments for normalized URL paths that must bypass Page Cache.

## Return behavior

Return the complete array of valid regular-expression strings. Preserve patterns owned by Boost and other integrations. Boost does not sanitize the returned entries before interpolating them into a regular expression, so every added value must already be safe and syntactically valid. Returning a non-array breaks the subsequent append and iteration.

## Since, deprecation, and replacement

Introduced in Jetpack Boost 3.2.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Boost. Project: `projects/plugins/boost`. Module: Page Cache. Method: `Automattic\Jetpack_Boost\Modules\Optimizations\Page_Cache\Pre_WordPress\Request::is_url_excluded()`.

## Example

This companion plugin appends a fixed pattern for the `/members/` path and every path below it whenever the callback is loaded. The pattern includes the leading slash because Boost compares it with a normalized request path, not a full URL. See the early-load caution below before relying on this registration alone.

```php
<?php
/**
 * Plugin Name: My Boost cache bypass
 */

function myjp_add_members_cache_bypass( $patterns ) {
	$patterns = is_array( $patterns ) ? $patterns : array();

	$patterns[] = '/members(?:/.*)?';

	return array_values( array_unique( $patterns ) );
}
add_filter( 'jetpack_boost_cache_bypass_patterns', 'myjp_add_members_cache_bypass', 10, 1 );
```

Use a fixed application-owned pattern. Do not construct it from request input.

## Compatibility and failure cautions

An invalid expression can raise a PHP warning during a cacheability decision; an expensive expression can add work to every relevant request. Do not include the `~` delimiter unescaped, interpolate user input, or use a pattern broader than the intended route. The implementation supplies the start and end anchors and an optional trailing slash, so adding incompatible anchors can produce surprising results. Because query strings are removed, this filter cannot safely distinguish otherwise identical paths by query parameter.

The Page Cache implementation can evaluate exclusions from `advanced-cache.php` before third-party plugin files load. A callback registered by a conventional plugin is therefore not guaranteed to affect every early cache read. Verify the full request path on the supported deployment and use Boost's persisted bypass settings when coverage must exist before plugin loading. Never edit Boost's generated drop-in to force registration.

## Verification

First verify the callback's exact WordPress filter result on a disposable site:

```sh
wp eval '$patterns = apply_filters( "jetpack_boost_cache_bypass_patterns", array( "/checkout(?:/.*)?" ) ); var_export( $patterns );'
```

Expect both the existing checkout pattern and `/members(?:/.*)?`. With Page Cache enabled, request `/members/`, a nested `/members/profile/` path, and an unrelated public route twice. Confirm the first two bypass Page Cache while the unrelated route remains cacheable. Check the actual HTTP request path rather than relying only on the CLI filter result, because the early drop-in load order is part of this contract.

## Source

[View the filter, lack of post-filter sanitization, built-in pattern, and match loop at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/class-request.php#L107-L123) The [normalizer removes the query string and controls the trailing slash](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/class-boost-cache-utils.php#L64-L85), and the [public Cache API guide documents the filter](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/docs/Cache_API.md#L55-L72).
