---
title: "Extend Jetpack Boost: hooks and APIs"
description: "Use Boost compatibility filters without depending on its private dashboard endpoints."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "boost"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Boost extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Cache and optimization hooks","type":"object","required":false,"defaultValue":"","description":"Use curated Cache API actions and filters plus render-blocking and Critical CSS contracts.","values":"","deprecated":false},{"name":"WordPress Abilities","type":"object","required":false,"defaultValue":"","description":"Use the four manage_options-gated Boost abilities when the installed version exposes them.","values":"","deprecated":false},{"name":"Boost packages","type":"object","required":false,"defaultValue":"","description":"Make shared changes in boost-core, boost-speed-score, or boost-score-api at the owning layer.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Boost provides PHP hooks primarily for compatibility between output optimization and other WordPress code. Use the narrowest hook that solves the problem, preserve its value type, and test with the exact Boost version deployed.

## Exclude a registered script from deferred loading

[jetpack_boost_render_blocking_js_exclude_handles](/docs/reference/hooks/filters/jetpack-boost-render-blocking-js-exclude-handles/) receives an array of WordPress script handles. Add a handle only after confirming deferral causes a failure.

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

[jetpack_boost_critical_css_urls](/docs/reference/hooks/filters/jetpack-boost-critical-css-urls/) filters URLs for a source provider. Preserve the provider's existing URLs and add only public, representative routes.

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

Boost also publishes a [Page Cache API guide](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/docs/Cache_API.md#L1-L106). Prefer its deliberate invalidation actions over deleting cache files: use [jetpack_boost_clear_page_cache_url](/docs/reference/hooks/actions/jetpack-boost-clear-page-cache-url/) for one URL and [jetpack_boost_cache_bypass_patterns](/docs/reference/hooks/filters/jetpack-boost-cache-bypass-patterns/) for narrowly defined paths. Review [the hooks policy](/docs/reference/hooks/) before using any other raw occurrence; module-state and connection hooks may be internal compatibility plumbing.

## WordPress Abilities

At the pinned revision Boost registers four deliberate operations with the WordPress Abilities API:

- `jetpack-boost/get-modules`
- `jetpack-boost/set-module-status`
- `jetpack-boost/get-speed-score`
- `jetpack-boost/clear-page-cache`

All four require `manage_options`. Treat the two mutations as administrator operations and require human confirmation before changing a module or clearing a cache. Discover their live input and output schemas through WordPress Abilities rather than rebuilding the private dashboard request. See the [ability registry](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/abilities/class-boost-abilities.php#L21-L245).

## API boundary

The Boost dashboard uses authenticated REST and data-sync mechanisms. They are not documented as a public API for external clients. Do not copy dashboard requests, nonces, route names, or connection tokens into an integration. For remote automation, use the documented WordPress Abilities above or supported WordPress APIs for your own plugin; do not replay dashboard requests.

After adding a hook, test activation with Boost absent, inactive, active with the relevant module off, and active with it on. Your integration must fail open when the hook never runs.
