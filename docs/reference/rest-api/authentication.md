---
title: REST API authentication
description: Authenticate Jetpack REST requests with WordPress sessions, nonces, capabilities, and route permissions.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
---

For same-origin requests made by a logged-in WordPress user, use WordPress cookie authentication plus an `X-WP-Nonce` created for the `wp_rest` action.

```php
wp_add_inline_script(
	'myjp-admin',
	'window.myjpRest = ' . wp_json_encode(
		array(
			'root'  => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		)
	) . ';',
	'before'
);
```

```js
await fetch( `${ window.myjpRest.root }jetpack/v4/connection`, {
	credentials: 'same-origin',
	headers: { 'X-WP-Nonce': window.myjpRest.nonce },
} );
```

The nonce proves request intent for the current session; it is not authorization by itself. The route's `permission_callback` must check the appropriate capability or connection state. Never place nonces in long-lived caches, public markup, logs, or documentation examples containing real values.

Application Passwords may be suitable for a trusted external WordPress REST client when both WordPress and the specific route support that flow. Do not extract or reuse Jetpack connection tokens. See the [WordPress authentication guide](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/).
