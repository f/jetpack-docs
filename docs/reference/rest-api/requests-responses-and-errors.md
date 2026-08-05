---
title: REST requests, responses, and errors
description: Validate Jetpack REST methods and schemas and handle WordPress errors predictably.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
---

Use the route's declared method and argument schema. Send JSON with `Content-Type: application/json`; encode query parameters for `GET` requests and avoid sending credentials in URLs.

```js
const response = await fetch( url, options );
const payload = await response.json().catch( () => null );

if ( ! response.ok ) {
	const code = payload?.code || 'unknown_error';
	const message = payload?.message || `HTTP ${ response.status }`;
	throw new Error( `${ code }: ${ message }` );
}
```

WordPress commonly serializes `WP_Error` as `code`, `message`, and `data`, where `data.status` can supply the HTTP status. Clients must still use the HTTP status as the primary success signal and tolerate additional fields.

Test at least: successful request, malformed JSON, unknown argument, missing nonce or credentials, insufficient capability, inactive owning feature, absent route, rate or service failure, and a non-JSON upstream/proxy error. Do not retry validation or authorization failures. Bound retries for transient failures and make state-changing operations safe against duplicate submission.

Inspect the live `/wp-json/` discovery document and compare it with the exact source revision before shipping a route dependency.
