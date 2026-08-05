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

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Akismet Anti-spam extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Akismet HTTP API","type":"object","required":false,"defaultValue":"","description":"Use only documented verify-key, comment-check, submit-spam, and submit-ham methods.","values":"","deprecated":false},{"name":"WordPress hook and Abilities","type":"object","required":false,"defaultValue":"","description":"Use akismet_request_args and the two permission-gated abilities with explicit MCP opt-in.","values":"","deprecated":false},{"name":"External ownership","type":"object","required":false,"defaultValue":"","description":"Route Akismet plugin changes to its pinned public SVN source and support process, not the Jetpack monorepo.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Akismet's public integration surface is maintained outside Jetpack. Use the [Akismet developer documentation](https://akismet.com/developers/) as the API authority and the [pinned Akismet 5.7 source](https://plugins.trac.wordpress.org/browser/akismet/tags/5.7?rev=3514187) for plugin behavior. Do not look for a Jetpack package, copy private WordPress plugin requests, or describe Akismet internals as a Jetpack compatibility contract.

## Server-side request flow

1. Verify the API key with the published `verify-key` method for the site's canonical `blog` URL.
2. Send a candidate submission to `comment-check` over HTTPS.
3. Include the required site and request context, including `blog`, `user_ip`, and `user_agent`, plus the documented comment or form fields that are actually available.
4. Interpret only documented response values and headers.
5. Keep the submission recoverable unless the documented response explicitly supports a discard policy that the site has approved.
6. Send moderator-confirmed mistakes to `submit-spam` or `submit-ham`.

Canonical method documentation: [comment-check](https://akismet.com/developers/detailed-docs/comment-check/), [submit-spam](https://akismet.com/developers/detailed-docs/submit-spam-missed-spam/), and [submit-ham](https://akismet.com/developers/detailed-docs/submit-ham-false-positives/).

```php
function acme_akismet_comment_check( $api_key, $site_url, $submission ) {
	$response = wp_remote_post(
		sprintf( 'https://%s.rest.akismet.com/1.1/comment-check', rawurlencode( $api_key ) ),
		array(
			'timeout' => 5,
			'body'    => array_merge(
				array( 'blog' => $site_url ),
				$submission
			),
		)
	);

	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
		return new WP_Error( 'akismet_unavailable', 'Send the item to moderation.' );
	}

	return 'true' === trim( wp_remote_retrieve_body( $response ) );
}
```

Call this only after `verify-key` succeeds, derive `user_ip` through a trusted proxy policy, validate the documented fields, and never log the URL because it contains the key in the hostname.

## WordPress Abilities and hooks

Akismet 5.7 registers `akismet/get-stats` and `akismet/comment-check` when WordPress Abilities is available and the API key is configured. Both require `moderate_comments` and appear through the Abilities REST surface. `comment-check` is classified read-only but non-idempotent because it contacts the classification service. MCP exposure is an explicit opt-in through `akismet_enable_mcp_access`; do not enable it merely because an agent can discover the ability.

The curated [akismet_request_args](/docs/reference/hooks/filters/akismet-request-args/) filter adjusts Akismet HTTP request arguments and therefore needs strict timeout, TLS, proxy, and credential-log cautions. Local settings/key REST routes are administrator implementation details, not a public remote-client API.

## Security and failure behavior

- Call Akismet only from a trusted server. Never ship the key to a browser or mobile client.
- Derive the visitor address through a trusted proxy configuration; do not accept an arbitrary client-supplied forwarding header.
- Set a short network timeout and distinguish a network or API error from a valid “not spam” response.
- Queue a safe retry or route the item to moderation when the service is unavailable. Do not discard it because a request failed.
- Redact the API key and personal fields from application logs.
- Preserve the exact field semantics from the public API; invented values reduce classification quality.

## WordPress integrations

When extending WordPress, first use the installed Akismet plugin or the form plugin's documented Akismet integration. Hooks and functions found in the external plugin source can be implementation details unless the Akismet project documents them. If you must build directly against the API, isolate the client behind your own interface, mock HTTP in tests, and make moderation decisions visible to an authorized user.

Akismet's hook ownership remains external even when this site documents a verified page. The general [hooks reference](/docs/reference/hooks/) defines the curation and stability policy; Akismet compatibility questions still belong in its external developer documentation.
