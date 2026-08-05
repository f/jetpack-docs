---
title: "jetpack_loaded"
description: Runs when the main Jetpack plugin instance and managed package autoloader are ready.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
product: jetpack
hook_name: jetpack_loaded
hook_type: action
since: "8.1.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/class.jetpack.php#L1161-L1169
last_reviewed: "2026-08-05"
---

## Behavior

The Jetpack plugin fires this action near the end of constructing its main `Jetpack` instance. At that point, Jetpack says it is fully loaded and classes managed by the Jetpack Autoloader can be instantiated.

## Callback signature

```php
function ( Jetpack $jetpack ): void
```

Register with one accepted argument:

```php
add_action( 'jetpack_loaded', 'my_callback', 10, 1 );
```

## Parameters

- `$jetpack` (`Jetpack`) — the main plugin class instance for the current request.

## Return behavior

This is an action. No callback return value is consumed.

## Since, deprecation, and replacement

Introduced in Jetpack 8.1.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack. Project: `projects/plugins/jetpack`. Owner: the global `Jetpack` class constructor in `class.jetpack.php`.

## Example

Place this external example in `wp-content/mu-plugins/my-jetpack-ready-check.php` so it loads before normal plugins:

```php
<?php
/**
 * Plugin Name: My Jetpack ready check
 */

function myjp_mark_jetpack_ready( $jetpack ) {
	if ( $jetpack instanceof Jetpack ) {
		$GLOBALS['myjp_jetpack_ready'] = true;
	}
}
add_action( 'jetpack_loaded', 'myjp_mark_jetpack_ready', 10, 1 );
```

Replace the global marker with the documented package or hook registration your integration needs.

## Compatibility and failure cautions

The action fires during Jetpack's own plugin bootstrap. A normal plugin loaded after Jetpack can register too late and miss it; a must-use plugin is deterministic for this example. Do not call the action yourself to simulate readiness. The `Jetpack` object exposes internal methods as well as public ones, so receiving it does not make every method a supported API. When Jetpack is inactive or pauses because its build is incomplete, the action does not fire.

## Verification

With Jetpack active and the example installed as a must-use plugin, run:

```sh
wp eval 'var_export( ! empty( $GLOBALS["myjp_jetpack_ready"] ) );'
```

Expect `true`. Deactivate Jetpack and repeat; expect `false` without a PHP warning or fatal error.

## Source

[View the documented action and call at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/class.jetpack.php#L1161-L1169)
