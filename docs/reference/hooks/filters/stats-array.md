---
title: "stats_array"
description: Filters the Jetpack Stats key-value data immediately before inline browser tracking code is serialized.
audience: developer
document_type: reference
sidebar_position: 120
sidebar_collapsed: true
product: stats
hook_name: stats_array
hook_type: filter
since: "1.1.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-tracking-pixel.php#L22-L29
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"stats_array callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$values","type":"array\u003cstring, scalar\u003e","required":true,"defaultValue":"","description":"the current tracking values, including changes made by earlier callbacks.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"stats_array.php","code":"\u003c?php\n/**\n * Plugin Name: Acme Stats content grouping\n */\n\nfunction acme_stats_content_group( $values ) {\n\tif ( is_singular( 'product' ) ) {\n\t\t$values['acme_group'] = 'product';\n\t}\n\n\treturn $values;\n}\nadd_filter( 'stats_array', 'acme_stats_content_group', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the stats_array contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for stats_array","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 1.1.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Stats applies this filter to its view-tracking key-value array immediately before casting each value to a string and JSON-encoding the result for the inline JavaScript tracker. The base array identifies the connected site and the current view; request-specific archive and campaign fields may also be present.

This hook controls the non-AMP tracker. AMP output uses the separate `jetpack_stats_footer_amp_data` filter.

## Callback signature

```php
function ( array $values ): array
```

Register with one accepted argument:

```php
add_filter( 'stats_array', 'acme_stats_content_group', 10, 1 );
```

## Parameters

- `$values` (`array<string, scalar>`) — the current tracking values, including changes made by earlier callbacks.

## Return behavior

Return the complete array. Preserve keys the integration does not own and use scalar values that can be safely converted to strings. Removing required base keys or returning nested arrays, resources, or non-stringable objects can corrupt the inline tracker or produce PHP warnings.

## Since, deprecation, and replacement

Introduced in Jetpack 1.1.0 according to the pinned hook annotation. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack Stats. Package: `automattic/jetpack-stats`. Source project: `projects/packages/stats`. Owner: `Automattic\Jetpack\Stats\Tracking_Pixel`.

## Example

This companion plugin adds one coarse, non-personal value from a controlled vocabulary:

```php
<?php
/**
 * Plugin Name: Acme Stats content grouping
 */

function acme_stats_content_group( $values ) {
	if ( is_singular( 'product' ) ) {
		$values['acme_group'] = 'product';
	}

	return $values;
}
add_filter( 'stats_array', 'acme_stats_content_group', 10, 1 );
```

## Compatibility and failure cautions

Every returned value is embedded in browser-visible JavaScript and sent with the tracking request. Never add names, emails, account or order IDs, full URLs with query parameters, free-form text, precise location, or another unique identifier. Use a short controlled vocabulary and confirm the receiving product supports the custom key before making reports depend on it. Do not overwrite `blog`, `post`, `srv`, `tz`, or `v`. This filter does not implement consent and does not affect the AMP tracker.

## Verification

On a disposable site with Stats enabled, visit one product and one non-product page. Inspect the generated inline `_stq` view payload: `acme_group` should equal `product` only on the product page, and the original keys should remain. Verify no personal or request-specific value is present. Test with the site's consent setting both allowed and denied, then check an AMP response separately to confirm this filter is not being mistaken for its AMP counterpart.

## Source

[View the literal stats_array hook definition at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-tracking-pixel.php#L22-L29)

[View the filter annotation, array cast, string conversion, and JSON serialization at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-tracking-pixel.php#L461-L480)

[View the package README's documented extension point at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/README.md#L42-L67)
