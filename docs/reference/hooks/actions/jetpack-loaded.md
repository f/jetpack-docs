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
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/class.jetpack.php#L1161-L1169
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_loaded callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"$jetpack","type":"Jetpack","required":true,"defaultValue":"","description":"the main plugin class instance for the current request.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_loaded.php","code":"\u003c?php\n/**\n * Plugin Name: My Jetpack ready check\n */\n\nfunction myjp_mark_jetpack_ready( $jetpack ) {\n\tif ( $jetpack instanceof Jetpack ) {\n\t\t$GLOBALS['myjp_jetpack_ready'] = true;\n\t}\n}\nadd_action( 'jetpack_loaded', 'myjp_mark_jetpack_ready', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_loaded contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_loaded","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 8.1.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

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

[View the documented action and call at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/class.jetpack.php#L1161-L1169)
