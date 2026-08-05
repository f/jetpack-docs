---
title: "videopress_get_video_details"
description: Filters the decoded details returned for a valid VideoPress video GUID.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
product: videopress
hook_name: videopress_get_video_details
hook_type: filter
since: "4.0.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress/src/utility-functions.php#L78-L90
last_reviewed: "2026-08-05"
---

## Behavior

The global `videopress_get_video_details()` function applies this filter after it validates the requested GUID and obtains decoded video data from either its one-hour transient or a public VideoPress request. An invalid GUID returns a `WP_Error` before this filter runs. On a cache miss, the unfiltered response is written to the transient before callbacks run, so the filter runs on every function call but its modifications are not saved back into that transient by this function.

The utility function becomes available when the VideoPress package initializer includes its utility file. The filter itself runs only when code calls `videopress_get_video_details()`; package initialization alone does not invoke it.

## Callback signature

The documented value contract is:

```php
function ( object $data, string $guid ): object
```

Register with two accepted arguments:

```php
add_filter( 'videopress_get_video_details', 'my_callback', 10, 2 );
```

The source does not enforce PHP parameter or return types. A failed or undecodable remote response can result in a non-object value, so defensive callbacks should avoid an `object` type declaration and preserve values they cannot handle.

## Parameters

- `$data` (`object` by the documented contract) — decoded VideoPress details, read from the transient or the public response. It can be `null` on an undecodable response because the implementation does not validate the decoded value before applying the filter.
- `$guid` (`string`) — the validated, eight-character alphanumeric VideoPress video GUID used for the lookup.

## Return behavior

Return the complete video-details value that `videopress_get_video_details()` should return. For the supported path, preserve the object and any fields you do not own. If `$data` is not an object, return it unchanged. Returning `null`, an array, or an object with required fields removed can break callers that expect the VideoPress response shape. Changes made by the callback affect the current call only; this function caches the unfiltered value first.

## Since, deprecation, and replacement

Introduced in Jetpack 4.0.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack VideoPress. Package: `automattic/jetpack-videopress`. Source project: `projects/packages/videopress`. Function: global `videopress_get_video_details()` in `src/utility-functions.php`.

## Example

Place this companion-plugin example directly in `wp-content/mu-plugins/myjp-videopress-details.php` for deterministic registration. It adds a namespaced field only to the decoded response shape:

```php
<?php
/**
 * Plugin Name: My VideoPress details extension
 */

function myjp_extend_videopress_details( $data, $guid ) {
	if ( ! $data instanceof stdClass ) {
		return $data;
	}

	$data->myjp_video_guid = $guid;

	return $data;
}
add_filter( 'videopress_get_video_details', 'myjp_extend_videopress_details', 10, 2 );
```

Use a uniquely prefixed property and document it for every consumer that reads it. Do not overwrite service-owned fields unless the integration explicitly owns that compatibility risk.

## Compatibility and failure cautions

Register the callback before the first video-details lookup you need to affect; a must-use companion plugin provides deterministic coverage across plugin load order. The filter does not run for an invalid GUID. Network failures or malformed response bodies can pass a non-object value despite the documented object type, so keep the defensive guard. Consumers use fields such as file URLs, upload dates, titles, and descriptions; removing or changing their types can cause rendering or media-import failures. Do not use this filter to bypass VideoPress privacy, capability, or ownership checks, and do not treat the returned service shape as a permanent PHP API beyond fields documented by VideoPress.

## Verification

Without making a network request, exercise the registered callback with the same two-argument filter contract:

```sh
wp eval '$data = apply_filters( "videopress_get_video_details", (object) array(), "Ab12Cd34" ); var_export( array( has_filter( "videopress_get_video_details", "myjp_extend_videopress_details" ), $data->myjp_video_guid ?? null ) );'
```

Expect `array ( 0 => 10, 1 => 'Ab12Cd34', )`. Also test a non-object value:

```sh
wp eval 'var_export( apply_filters( "videopress_get_video_details", null, "Ab12Cd34" ) );'
```

Expect `NULL` and no PHP warning. On a disposable VideoPress test site, call `videopress_get_video_details()` with a valid test-video GUID and confirm the prefixed property is present; do not use customer media for this check.

## Source

[View the filter contract and direct return at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress/src/utility-functions.php#L78-L90) The [surrounding function shows GUID validation, retrieval, and cache order](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress/src/utility-functions.php#L47-L90), while the [package initializer controls when the utility file is loaded](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress/src/class-initializer.php#L79-L86).
