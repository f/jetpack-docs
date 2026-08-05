---
title: "jetpack_boost_render_blocking_js_exclude_handles"
description: Excludes registered WordPress script handles from Jetpack Boost's render-blocking JavaScript optimization.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
product: boost
hook_name: jetpack_boost_render_blocking_js_exclude_handles
hook_type: filter
since: "1.0.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost/app/modules/optimizations/render-blocking-js/class-render-blocking-js.php#L451-L473
last_reviewed: "2026-08-05"
---

## Behavior

Boost applies this filter while processing a script registered with WordPress. The callback supplies a list of script handles that Boost must not move to the end of the document. When the current handle is in that list, Boost adds its ignore attribute to the script tag so the render-blocking JavaScript optimization leaves the tag in place.

The filter can run once for each processed script tag. Build and return the list without performing remote requests or other expensive work.

## Callback signature

```php
function ( array $script_handles ): array
```

Register with one accepted argument:

```php
add_filter( 'jetpack_boost_render_blocking_js_exclude_handles', 'my_callback', 10, 1 );
```

## Parameters

- `$script_handles` (`array<int, string>`) — registered WordPress script handles that Boost should leave in their original document position. The initial value supplied by Boost is an empty array; callbacks registered earlier may already have added handles.

## Return behavior

Return an array of registered script-handle strings. Preserve incoming entries and append only the handles that your integration owns or has verified as order-sensitive. Boost uses a strict `in_array()` comparison against the current handle, so a script URL, file name, or associative-array key does not match a registered handle.

## Since, deprecation, and replacement

Introduced in Jetpack Boost 1.0.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Boost. Project: `projects/plugins/boost`. Module: render-blocking JavaScript optimization. Method: `Automattic\Jetpack_Boost\Modules\Optimizations\Render_Blocking_JS\Render_Blocking_JS::handle_exclusions()`.

## Example

This companion plugin keeps an order-sensitive widget script in its original position. The value is the handle used with `wp_enqueue_script()`, not the script's URL:

```php
<?php
/**
 * Plugin Name: My Boost script compatibility
 */

function myjp_keep_widget_script_in_place( $script_handles ) {
	$script_handles[] = 'my-order-sensitive-widget';

	return array_values( array_unique( $script_handles ) );
}
add_filter(
	'jetpack_boost_render_blocking_js_exclude_handles',
	'myjp_keep_widget_script_in_place',
	10,
	1
);
```

The plugin that owns the script would enqueue it with the same handle:

```php
wp_enqueue_script(
	'my-order-sensitive-widget',
	plugins_url( 'widget.js', __FILE__ ),
	array(),
	'1.0.0',
	false
);
```

## Compatibility and failure cautions

Excluding a script can restore required execution order, but it also makes that script render-blocking again. Add the smallest possible list and retest performance. Preserve handles supplied by other callbacks; replacing the array can silently undo another plugin's compatibility fix. The filter has no effect when Boost is inactive or when its render-blocking JavaScript optimization is not processing the response. Page caches may retain older optimized markup after the callback changes.

## Verification

Install the example on a disposable site, activate Boost's render-blocking JavaScript optimization, and load a page that enqueues the widget. Clear the page cache, then view the original HTML response. Confirm that the widget's script remains where WordPress printed it and carries Boost's current ignore attribute. Remove the filter, clear caches again, and confirm Boost is free to move the script. Exercise the widget in both cases and compare the page's performance measurements before keeping the exclusion.

## Source

[View the filter documentation, application, strict handle check, and ignore behavior at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost/app/modules/optimizations/render-blocking-js/class-render-blocking-js.php#L451-L473)
