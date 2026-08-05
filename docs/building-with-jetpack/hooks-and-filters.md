---
title: Use hooks and filters
description: Integrate with documented Jetpack actions and filters while preserving timing, types, and failure behavior.
audience: developer
document_type: how-to
sidebar_position: 30
sidebar_collapsed: true
---

Actions announce that something happened; filters ask callbacks to return a value. A hook name alone is not enough to build against: confirm its parameter list, firing context, owning product, introduction version, and deprecation state in the [hooks reference](../reference/hooks/index.md).

## Register deliberately

Use a unique callable, the default priority unless ordering matters, and an accepted-argument count that matches the documented signature.

```php
function myjp_after_jetpack_loaded( $jetpack ) {
	// Attach a documented integration after Jetpack's autoloader is ready.
}
add_action( 'jetpack_loaded', 'myjp_after_jetpack_loaded', 10, 1 );
```

For filters, return a value on every path and do not change its type:

```php
function myjp_offline_mode_for_local_host( $offline ) {
	return $offline || 'local.example' === wp_parse_url( home_url(), PHP_URL_HOST );
}
add_filter( 'jetpack_offline_mode', 'myjp_offline_mode_for_local_host' );
```

## Protect the integration

- Treat hook parameters as untrusted unless their contract says otherwise.
- Never log tokens, request bodies containing personal data, or connection secrets.
- Avoid remote calls in request-critical hooks; queue work when possible.
- Remove temporary hooks after tests so callbacks do not leak between cases.
- Use the feature's public status method before assuming that installation means activation.

See [`jetpack_loaded`](../reference/hooks/actions/jetpack-loaded.md) and [`jetpack_offline_mode`](../reference/hooks/filters/jetpack-offline-mode.md) for complete contracts.
