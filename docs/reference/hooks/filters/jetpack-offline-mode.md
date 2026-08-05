---
title: "jetpack_offline_mode"
description: Filters whether the Jetpack Status package reports offline mode as active.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
product: jetpack
hook_name: jetpack_offline_mode
hook_type: filter
since: "1.3.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/status/src/class-status.php#L45-L54
last_reviewed: "2026-08-05"
---

## Behavior

The Status package applies this filter while calculating offline mode, after checking the `JETPACK_DEV_DEBUG` and `WP_LOCAL_DEV` constants and local-site detection. If the filtered result remains false, the package also considers the stored `jetpack_offline_mode` option. The final result is cached for the request.

The Connection package also applies the same filter to a literal `false` while assembling connection-status diagnostics. That second call reports whether a callback itself enables offline mode; it does not include the constants, local-site detection, or stored option.

## Callback signature

```php
function ( bool $offline_mode ): bool
```

## Parameters

- `$offline_mode` (`bool`) — the caller's current decision. `Status::is_offline_mode()` passes the result calculated from constants and local-site detection before the option fallback; the Connection status diagnostic passes `false` to isolate filter behavior.

## Return behavior

Return `true` to enable offline mode or `false` to leave it disabled at this stage. The Status package casts the filtered value to `bool`. Preserve an incoming `true` unless the integration intentionally overrides a stronger configuration signal.

## Since, deprecation, and replacement

Introduced in version 1.3.0 of `automattic/jetpack-status`. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack foundation. Package: `automattic/jetpack-status`. Source project: `projects/packages/status`. Method: `Automattic\Jetpack\Status::is_offline_mode()`.

## Example

This companion-plugin example enables offline mode only when an administrator has set an integration-specific option:

```php
<?php
/**
 * Plugin Name: My controlled Jetpack offline mode
 */

function myjp_controlled_offline_mode( $offline_mode ) {
	return $offline_mode || (bool) get_option( 'myjp_force_jetpack_offline', false );
}
add_filter( 'jetpack_offline_mode', 'myjp_controlled_offline_mode' );
```

## Compatibility and failure cautions

Offline mode disables or changes cloud-backed Jetpack behavior; it is not merely a visual flag. Register before the first call to `Status::is_offline_mode()` because the result is cached. Do not enable it on production as a workaround for a connection error. `Status::is_offline_mode()` casts its filtered value, but the Connection diagnostic exposes the callback result directly; always return a boolean for every caller. Strings such as `'false'` are unsafe because the Status call casts them to true. The filter does not replace capability checks, nonces, or network-failure handling.

## Verification

Install the example on a disposable site, enable its private option, and exercise the filter with a known incoming value:

```sh
wp option update myjp_force_jetpack_offline 1
wp eval 'var_export( apply_filters( "jetpack_offline_mode", false ) );'
wp option delete myjp_force_jetpack_offline
wp eval 'var_export( apply_filters( "jetpack_offline_mode", false ) );'
```

Expect `true` and then `false`. These direct calls prove the callback independently of Jetpack's other offline-mode signals. Then enable the option again, use a new request to call `Status::is_offline_mode()`, and confirm the relevant connected features show their documented offline behavior. Delete the option after the test. Use a new request between Status cases so its request cache is rebuilt.

## Source

[View the filter documentation and boolean cast at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/status/src/class-status.php#L45-L54) The [Connection status diagnostic applies the same filter to `false`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/connection/src/class-rest-connector.php#L493-L510).
