---
title: "akismet_request_args"
description: Filters the data used to build an Akismet API request body.
audience: developer
document_type: reference
sidebar_position: 80
sidebar_collapsed: true
product: akismet
hook_name: akismet_request_args
hook_type: filter
since: "5.3.1"
deprecated: false
source_url: https://plugins.trac.wordpress.org/browser/akismet/tags/5.7/class.akismet.php?rev=3514187#L532-L540
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"akismet_request_args callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$request_args","type":"array","required":true,"defaultValue":"","description":"data that Akismet will encode into the request body. Its keys and sensitivity vary by endpoint.","values":"","deprecated":false},{"name":"$endpoint","type":"string","required":true,"defaultValue":"","description":"Akismet API method that will receive the request.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"akismet_request_args.php","code":"function acme_akismet_contact_form_context( $request_args, $endpoint ) {\n\tif (\n\t\t'comment-check' !== $endpoint ||\n\t\t'contact-form' !== ( $request_args['comment_type'] ?? '' )\n\t) {\n\t\treturn $request_args;\n\t}\n\n\t$context = isset( $request_args['comment_context'] ) \u0026\u0026 is_array( $request_args['comment_context'] )\n\t\t? $request_args['comment_context']\n\t\t: array();\n\t$context[] = 'membership-support';\n\t$request_args['comment_context'] = array_values( array_unique( $context ) );\n\n\treturn $request_args;\n}\nadd_filter( 'akismet_request_args', 'acme_akismet_contact_form_context', 10, 2 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the akismet_request_args contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for akismet_request_args","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 5.3.1 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Akismet applies this filter immediately before it encodes request data and sends an API request. The second argument identifies the API method, so a callback can make a narrow change without altering unrelated requests. Verified Akismet 5.7 call sites use endpoint values including `comment-check`, `submit-spam`, `submit-ham`, `verify-key`, `get-stats`, `get-subscription`, `verify-wpcom-key`, `token`, and `deactivate`.

Request arrays can contain an API key, visitor network data, author details, and submitted content. Treat the complete array as sensitive even when a callback only needs one non-sensitive field.

## Callback signature

```php
function ( array $request_args, string $endpoint ): array
```

## Parameters

- `$request_args` (`array`) — data that Akismet will encode into the request body. Its keys and sensitivity vary by endpoint.
- `$endpoint` (`string`) — Akismet API method that will receive the request.

## Return behavior

Return the complete request array. Preserve every existing key unless the documented API contract for this endpoint explicitly permits changing or removing it. Returning a non-array can break request encoding; removing required values can make the API reject the request or reduce classification quality.

## Since, deprecation, and replacement

Introduced in Akismet 5.3.1. It is not deprecated in Akismet 5.7 and has no replacement.

## Ownership

Product: Akismet Anti-spam. External plugin: Akismet 5.7, maintained outside the Jetpack monorepo. Primary owner: `class.akismet.php`; additional admin, REST, and WP-CLI call sites use the same filter.

## Example

This companion-plugin example adds a non-sensitive context label only to `comment-check` requests that already identify themselves as contact-form submissions:

```php
function acme_akismet_contact_form_context( $request_args, $endpoint ) {
	if (
		'comment-check' !== $endpoint ||
		'contact-form' !== ( $request_args['comment_type'] ?? '' )
	) {
		return $request_args;
	}

	$context = isset( $request_args['comment_context'] ) && is_array( $request_args['comment_context'] )
		? $request_args['comment_context']
		: array();
	$context[] = 'membership-support';
	$request_args['comment_context'] = array_values( array_unique( $context ) );

	return $request_args;
}
add_filter( 'akismet_request_args', 'acme_akismet_contact_form_context', 10, 2 );
```

## Compatibility and failure cautions

Scope changes by `$endpoint`; fields valid for `comment-check` may be meaningless or harmful for key, account, stats, or feedback requests. Do not alter `blog`, `user_ip`, `user_agent`, key, or submission fields unless the corresponding public Akismet API contract requires it. Never log or expose the array: some call sites include credentials, IP addresses, email addresses, tokens, or content. Do not make a second Akismet request from the callback, which can recurse or duplicate classification and feedback. Keep the callback fast and deterministic, and return the incoming array unchanged when it does not own the request.

## Verification

On a disposable site with the companion plugin active, invoke the filter with synthetic data rather than a real API key or customer submission:

```sh
wp eval '$args = array( "comment_type" => "contact-form", "comment_context" => array( "existing" ) ); var_export( apply_filters( "akismet_request_args", $args, "comment-check" ) );'
wp eval '$args = array( "blog" => "https://example.test" ); var_export( apply_filters( "akismet_request_args", $args, "verify-key" ) );'
```

Confirm the first result contains both context labels and the second result is unchanged. Then submit only documented Akismet test data through the intended staging form and confirm classification still succeeds. Inspect outcomes, not raw request bodies, and keep API keys and personal fields out of logs.

## Source

[View the documented filter and its application at the pinned Akismet 5.7 SVN revision.](https://plugins.trac.wordpress.org/browser/akismet/tags/5.7/class.akismet.php?rev=3514187#L532-L540)
