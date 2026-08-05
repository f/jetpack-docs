---
title: Build a first integration
description: Create a small companion plugin that uses a public Jetpack interface without coupling to internals.
audience: developer
document_type: tutorial
sidebar_position: 20
sidebar_collapsed: true
---

A companion plugin is the safest starting point: it owns its activation lifecycle, can declare requirements, and leaves Jetpack source untouched.

## 1. Create the plugin

Create `wp-content/plugins/my-jetpack-integration/my-jetpack-integration.php` with a normal WordPress plugin header. Prefix functions with a unique project prefix and load them from WordPress hooks rather than executing product logic at file scope.

```php
<?php
/**
 * Plugin Name: My Jetpack Integration
 * Requires PHP: 7.2
 */

defined( 'ABSPATH' ) || exit;

function myjp_boot() {
	if ( ! class_exists( 'Jetpack', false ) ) {
		return;
	}

	// Register only documented integrations here.
}
add_action( 'plugins_loaded', 'myjp_boot', 20 );
```

`class_exists()` is only an availability guard; it does not make arbitrary Jetpack class methods public API. Use a documented hook or package after the guard.

## 2. Implement one contract

Choose an interface from [Reference](../reference/index.md). Copy its callback signature exactly, sanitize data at the input boundary, escape at output, and preserve the original value unless the filter's contract explicitly calls for a replacement.

## 3. Exercise both states

Activate Jetpack and the owning feature, confirm the integration runs once, then deactivate Jetpack and confirm the site still loads without warnings. Repeat on a staging site with the oldest and newest supported versions you claim.

## 4. Package the behavior

Document the Jetpack product and interface name, required versions, configuration, data use, rollback, and a verification step. Continue with [test an integration](test-an-integration.md).
