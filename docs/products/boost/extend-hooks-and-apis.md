---
title: "Extend Jetpack Boost: hooks and APIs"
description: "Use Boost compatibility filters without depending on its private dashboard endpoints."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "boost"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Boost provides PHP hooks primarily for compatibility between output optimization and other WordPress code. Use the narrowest hook that solves the problem, preserve its value type, and test with the exact Boost version deployed.

## Exclude a registered script from deferred loading

[`jetpack_boost_render_blocking_js_exclude_handles`](/docs/reference/hooks/filters/jetpack-boost-render-blocking-js-exclude-handles/) receives an array of WordPress script handles. Add a handle only after confirming deferral causes a failure.

```php
add_filter(
	'jetpack_boost_render_blocking_js_exclude_handles',
	function ( $handles ) {
		$handles[] = 'acme-checkout';
		return array_values( array_unique( $handles ) );
	}
);
```

Register the callback in a small site plugin, use the handle passed to `wp_enqueue_script()`, and verify that the affected interaction works after clearing caches. Do not use a guessed file name in place of the handle.

## Add a critical-CSS target

[`jetpack_boost_critical_css_urls`](/docs/reference/hooks/filters/jetpack-boost-critical-css-urls/) filters URLs for a source provider. Preserve the provider's existing URLs and add only public, representative routes.

```php
add_filter(
	'jetpack_boost_critical_css_urls',
	function ( $urls, $provider ) {
		$urls[] = home_url( '/membership/' );
		return array_values( array_unique( $urls ) );
	},
	10,
	2
);
```

Never add a URL that exposes account data, preview tokens, or private content to a remote generator. Regenerate critical CSS and compare the route at multiple viewport sizes.

Other source-defined hooks cover cache parameters, output filtering, module state, and connection behavior. Some are intended for Boost itself or tightly coupled compatibility code. Review [the hooks policy](/docs/reference/hooks/) before using them; do not treat a hook's existence as a permanent stability promise.

## API boundary

The Boost dashboard uses authenticated REST and data-sync mechanisms. They are not documented as a public API for external clients. Do not copy dashboard requests, nonces, route names, or connection tokens into an integration. For remote automation, use supported WordPress APIs for your own plugin and leave Boost configuration to an authorized administrator.

After adding a hook, test activation with Boost absent, inactive, active with the relevant module off, and active with it on. Your integration must fail open when the hook never runs.
