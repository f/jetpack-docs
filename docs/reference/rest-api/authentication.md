---
title: REST API authentication
description: Authenticate Jetpack REST requests with WordPress sessions, nonces, capabilities, and route permissions.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
---

For same-origin requests made by a logged-in WordPress user, use WordPress cookie authentication plus an `X-WP-Nonce` created for the `wp_rest` action.

<!-- wp:docspress/code-tabs {"tabs":[{"label":"PHP","language":"php","filename":"enqueue.php","code":"wp_add_inline_script(\n\t'myjp-admin',\n\t'window.myjpRest = ' . wp_json_encode(\n\t\tarray(\n\t\t\t'root'  => esc_url_raw( rest_url() ),\n\t\t\t'nonce' => wp_create_nonce( 'wp_rest' ),\n\t\t)\n\t) . ';',\n\t'before'\n);"},{"label":"JavaScript","language":"javascript","filename":"settings.js","code":"const response = await fetch(\n\t`${ window.myjpRest.root }jetpack/v4/settings`,\n\t{\n\t\tcredentials: 'same-origin',\n\t\theaders: { 'X-WP-Nonce': window.myjpRest.nonce },\n\t}\n);\n\nif ( ! response.ok ) {\n\tthrow new Error( `Jetpack settings request failed: ${ response.status }` );\n}"}],"showLineNumbers":true,"caption":"A same-origin request to the currently registered Jetpack v4 settings route. Confirm the route and its permission callback at the source revision you support."} /-->

The nonce proves request intent for the current session; it is not authorization by itself. The route's `permission_callback` must check the appropriate capability or connection state. Never place nonces in long-lived caches, public markup, logs, or documentation examples containing real values.

Application Passwords may be suitable for a trusted external WordPress REST client when both WordPress and the specific route support that flow. Do not extract or reuse Jetpack connection tokens. See the [WordPress authentication guide](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/).
