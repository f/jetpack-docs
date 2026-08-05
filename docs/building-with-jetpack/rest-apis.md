---
title: Work with REST APIs
description: Discover Jetpack REST routes, authenticate through WordPress, and handle schemas and errors safely.
audience: developer
document_type: how-to
sidebar_position: 50
sidebar_collapsed: true
---

Jetpack extends the WordPress REST API. A route is usable only when its owning plugin or package registers it, and each route's permission callback remains authoritative.

## Build the request

1. Discover routes from `/wp-json/` on the target site or inspect the pinned source registration.
2. Use the method and schema declared by the route.
3. For requests made by a logged-in WordPress user, send same-origin cookies and an `X-WP-Nonce` created for `wp_rest`.
4. Check the HTTP status before reading data; a JSON body can be a `WP_Error` representation rather than a success payload.

```js
const response = await fetch( '/wp-json/jetpack/v4/connection', {
	credentials: 'same-origin',
	headers: { 'X-WP-Nonce': window.myPlugin.restNonce },
} );

const payload = await response.json();
if ( ! response.ok ) {
	throw new Error( payload.message || `Request failed: ${ response.status }` );
}
```

Localize only the nonce and root your script needs; do not copy connection tokens into browser state. Never infer authorization from the route namespace—capabilities are route-specific.

Continue with [REST authentication](../reference/rest-api/authentication.md) and [requests, responses, and errors](../reference/rest-api/requests-responses-and-errors.md).
