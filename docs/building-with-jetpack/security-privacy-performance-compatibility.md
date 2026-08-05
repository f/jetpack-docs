---
title: Design for security, privacy, performance, and compatibility
description: Review a Jetpack integration's trust boundaries, data use, runtime cost, and version behavior.
audience: developer
document_type: how-to
sidebar_position: 100
sidebar_collapsed: true
---

Run this review before release and whenever the integration changes its Jetpack surface.

## Security

Authorize every state-changing operation with a WordPress capability and request-specific nonce. Sanitize input according to meaning, escape at the final output context, use prepared SQL, and allowlist remote destinations. Never expose connection tokens, signing material, nonces, or personal data in logs and client-visible configuration.

## Privacy

Map each field that leaves the site, its purpose, recipient, retention, export, and erasure behavior. Collect the minimum required data and make consent or notice behavior explicit. Do not assume that enabling Jetpack gives a companion plugin permission to send additional data.

## Performance

Avoid unconditional work on every request. Register callbacks narrowly, cache only data with a valid invalidation rule, bound collections, and move remote or expensive work off the response path. Measure editor and front-end impact with the integration enabled and disabled.

## Compatibility

Declare supported WordPress, PHP, Jetpack, and product versions. Feature-detect optional surfaces, preserve filter types, and provide a harmless fallback. Test before raising minimums, and treat deprecation notices as migration work rather than suppressing them.

Use the [compatibility policy](../reference/compatibility-and-version-policy.md) and [privacy boundaries](../reference/privacy-and-data-boundaries.md) as release gates.
