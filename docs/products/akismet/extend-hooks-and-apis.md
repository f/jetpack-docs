---
title: "Extend Akismet: API integrations"
description: "Build a server-side Akismet integration against the externally maintained public API contract."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "akismet"
last_reviewed: "2026-08-05"
---

Akismet's public integration surface is maintained outside Jetpack. Use the [Akismet developer documentation](https://akismet.com/developers/) as the API authority and [WordPress.org's Akismet SVN repository](https://plugins.svn.wordpress.org/akismet/) for public plugin source. Do not look for a Jetpack package, copy private WordPress plugin requests, or describe Akismet internals as a Jetpack compatibility contract.

## Server-side request flow

1. Verify the API key with the published `verify-key` method for the site's canonical `blog` URL.
2. Send a candidate submission to `comment-check` over HTTPS.
3. Include the required site and request context, including `blog`, `user_ip`, and `user_agent`, plus the documented comment or form fields that are actually available.
4. Interpret only documented response values and headers.
5. Keep the submission recoverable unless the documented response explicitly supports a discard policy that the site has approved.
6. Send moderator-confirmed mistakes to `submit-spam` or `submit-ham`.

Canonical method documentation: [`comment-check`](https://akismet.com/developers/detailed-docs/comment-check/), [`submit-spam`](https://akismet.com/developers/detailed-docs/submit-spam-missed-spam/), and [`submit-ham`](https://akismet.com/developers/detailed-docs/submit-ham-false-positives/).

## Security and failure behavior

- Call Akismet only from a trusted server. Never ship the key to a browser or mobile client.
- Derive the visitor address through a trusted proxy configuration; do not accept an arbitrary client-supplied forwarding header.
- Set a short network timeout and distinguish a network or API error from a valid “not spam” response.
- Queue a safe retry or route the item to moderation when the service is unavailable. Do not discard it because a request failed.
- Redact the API key and personal fields from application logs.
- Preserve the exact field semantics from the public API; invented values reduce classification quality.

## WordPress integrations

When extending WordPress, first use the installed Akismet plugin or the form plugin's documented Akismet integration. Hooks and functions found in the external plugin source can be implementation details unless the Akismet project documents them. If you must build directly against the API, isolate the client behind your own interface, mock HTTP in tests, and make moderation decisions visible to an authorized user.

Akismet has no Jetpack-owned hook pages. The general [hooks reference](/docs/reference/hooks/) applies to Jetpack products, while Akismet compatibility questions belong in its external developer documentation.
