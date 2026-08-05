---
title: REST API
description: Discover and consume WordPress REST routes registered by Jetpack products.
audience: developer
document_type: reference
sidebar_position: 30
sidebar_collapsed: true
---

Jetpack products extend the WordPress REST API through route namespaces registered by their active plugin and packages. Routes can differ by product and version, so discover them from the target site's `/wp-json/` index or inspect the owning revision's `register_rest_route()` call.

Every route contract includes an HTTP method, path, argument schema, permission callback, response schema, and error behavior. A namespace such as `jetpack/v4` identifies ownership; it does not grant access or guarantee that every route is present.

- [Authentication](authentication.md)
- [Requests, responses, and errors](requests-responses-and-errors.md)
- [Connection and Sync](../connection-and-sync.md)

Do not build on undocumented connected-service endpoints or reuse Jetpack's stored site/user credentials. For external clients, use the authentication method explicitly documented by the product or the WordPress REST API.
