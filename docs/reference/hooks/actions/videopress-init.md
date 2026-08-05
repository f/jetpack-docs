---
title: "videopress_init"
description: Runs after the VideoPress package completes the initialization path selected for the current request.
audience: developer
document_type: reference
sidebar_position: 70
sidebar_collapsed: true
product: videopress
hook_name: videopress_init
hook_type: action
since: "0.1.1"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-initializer.php#L31-L50
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"videopress_init callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"parameters","type":"none","required":false,"defaultValue":"","description":"This hook passes no callback parameters.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"videopress_init.php","code":"\u003c?php\n/**\n * Plugin Name: My VideoPress readiness marker\n */\n\nfunction myjp_mark_videopress_package_ready() {\n\tif ( ! empty( $GLOBALS['myjp_videopress_package_ready'] ) ) {\n\t\treturn;\n\t}\n\n\t$GLOBALS['myjp_videopress_package_ready'] = true;\n}\n\nif ( did_action( 'videopress_init' ) ) {\n\tmyjp_mark_videopress_package_ready();\n} else {\n\tadd_action( 'videopress_init', 'myjp_mark_videopress_package_ready', 10, 0 );\n}","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the videopress_init contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for videopress_init","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 0.1.1 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

The VideoPress package fires this action from `Initializer::init()`. On the first call in a request, the initializer performs unconditional setup, then initializes active VideoPress features or the configured inactive admin menu, and finally fires the action. The setup branch is guarded by `did_action( 'videopress_init' )`, but the `do_action()` call itself is outside that guard. A later call to `Initializer::init()` can therefore fire the action again without repeating the package setup.

Treat the action as a request-local package initialization signal. It does not prove that VideoPress is active, connected, entitled, or able to upload or play a video.

## Callback signature

```php
function (): void
```

Register with zero accepted arguments:

```php
add_action( 'videopress_init', 'my_callback', 10, 0 );
```

## Parameters

This action passes no parameters.

## Return behavior

This is an action. WordPress ignores callback return values.

## Since, deprecation, and replacement

Introduced in version 0.1.1 of `automattic/jetpack-videopress`. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack VideoPress. Package: `automattic/jetpack-videopress`. Source project: `projects/packages/videopress`. Emitter: `Automattic\Jetpack\VideoPress\Initializer::init()`.

## Example

Place this companion plugin in `wp-content/mu-plugins/myjp-videopress-ready.php`. The fallback covers package initialization that happened earlier, and the callback is idempotent because the action can fire more than once.

```php
<?php
/**
 * Plugin Name: My VideoPress readiness marker
 */

function myjp_mark_videopress_package_ready() {
	if ( ! empty( $GLOBALS['myjp_videopress_package_ready'] ) ) {
		return;
	}

	$GLOBALS['myjp_videopress_package_ready'] = true;
}

if ( did_action( 'videopress_init' ) ) {
	myjp_mark_videopress_package_ready();
} else {
	add_action( 'videopress_init', 'myjp_mark_videopress_package_ready', 10, 0 );
}
```

Replace the request-scoped marker with an idempotent registration that depends only on public VideoPress surfaces.

## Compatibility and failure cautions

A normal plugin can load too late to observe the first action, so use the `did_action()` fallback whenever late registration is possible. Do not assume `did_action()` equals one; the initializer can fire this action again. Make callbacks idempotent and avoid remote work, database writes, or registrations that fail when repeated. Do not invoke `videopress_init` yourself or call the initializer to force the event.

The unconditional path can run while the module is inactive, and the inactive-menu path can run without active playback or upload features. Feature-detect the specific public class, function, or hook required by the integration after observing this action. Package initialization is not an authorization or privacy check.

## Verification

With VideoPress provided by the test site and the example installed as a must-use plugin, run:

```sh
wp eval 'var_export( array( did_action( "videopress_init" ), ! empty( $GLOBALS["myjp_videopress_package_ready"] ) ) );'
```

Expect a positive action count and `true` for the marker. Exercise both active and inactive-module configurations and confirm the marker alone does not claim feature availability. In an isolated test, call the public initializer twice and verify the callback remains harmless when the action count increases.

## Source

[View the initialization guard, selected setup path, @since, and action call at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-initializer.php#L31-L50) The [unconditional setup that precedes the first firing starts here](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-initializer.php#L79-L118).
