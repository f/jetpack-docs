---
title: "did_jetpack_search_query"
description: Runs after a Jetpack Search remote request produces the query data used by Classic or Instant Search.
audience: developer
document_type: reference
sidebar_position: 60
sidebar_collapsed: true
product: search
hook_name: did_jetpack_search_query
hook_type: action
since: "5.0.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/classic-search/class-classic-search.php#L409-L428
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"did_jetpack_search_query callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"$query","type":"array","required":true,"defaultValue":"","description":"query telemetry with args (array), response (decoded response, normally an array), response_code (int), elapsed_time (float, milliseconds), es_time (float|int|null, milliseconds), and url (string). Request arguments, response records, and URLs can contain search terms or site data.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"did_jetpack_search_query.php","code":"\u003c?php\n/**\n * Plugin Name: My Search timing diagnostic\n */\n\nfunction myjp_record_search_timing( $query ) {\n\tif ( ! is_array( $query ) ) {\n\t\treturn;\n\t}\n\n\t$timing = array(\n\t\t'response_code' =\u003e isset( $query['response_code'] ) ? (int) $query['response_code'] : 0,\n\t\t'elapsed_ms'    =\u003e isset( $query['elapsed_time'] ) ? (float) $query['elapsed_time'] : null,\n\t\t'engine_ms'     =\u003e isset( $query['es_time'] ) ? (float) $query['es_time'] : null,\n\t);\n\n\tset_transient( 'myjp_last_search_timing', $timing, MINUTE_IN_SECONDS );\n}\nadd_action( 'did_jetpack_search_query', 'myjp_record_search_timing', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the did_jetpack_search_query contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for did_jetpack_search_query","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 5.0.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Search fires this action after a non-error remote Classic Search or Instant Search request has been decoded and summarized. The action receives request arguments, the decoded response, the HTTP response code, round-trip time, reported search-engine time, and the requested URL. Instant Search writes its local four-hour response transient after callbacks return; Classic Search returns the response immediately afterward.

At the pinned revision, transport errors and non-2xx responses return before this action. A cached Instant Search response also returns before making a request and does not fire it. The `@since 5.8.0` annotation says the action changed to fire on all queries rather than only successful queries, but the current control flow is not a general failure hook.

## Callback signature

```php
function ( array $query ): void
```

Register with one accepted argument:

```php
add_action( 'did_jetpack_search_query', 'my_callback', 10, 1 );
```

## Parameters

- `$query` (`array`) — query telemetry with `args` (`array`), `response` (decoded response, normally an `array`), `response_code` (`int`), `elapsed_time` (`float`, milliseconds), `es_time` (`float|int|null`, milliseconds), and `url` (`string`). Request arguments, response records, and URLs can contain search terms or site data.

## Return behavior

This is an action. WordPress ignores callback return values. Mutating the local `$query` argument does not alter the Search response returned to its caller.

## Since, deprecation, and replacement

Introduced in Jetpack 5.0.0. Its annotation records a behavior change in Jetpack 5.8.0: it fires on all queries rather than only successful queries. At the pinned source revision, early transport and non-2xx failures still do not reach this action. It is not deprecated and has no replacement.

## Ownership

Product: Jetpack Search. Package: `automattic/jetpack-search`. Source project: `projects/packages/search`. Emitters: the Classic Search and Instant Search remote request implementations.

## Example

This diagnostic companion plugin keeps only bounded numeric timing data for one minute. It intentionally discards request arguments, the response, and the request URL.

```php
<?php
/**
 * Plugin Name: My Search timing diagnostic
 */

function myjp_record_search_timing( $query ) {
	if ( ! is_array( $query ) ) {
		return;
	}

	$timing = array(
		'response_code' => isset( $query['response_code'] ) ? (int) $query['response_code'] : 0,
		'elapsed_ms'    => isset( $query['elapsed_time'] ) ? (float) $query['elapsed_time'] : null,
		'engine_ms'     => isset( $query['es_time'] ) ? (float) $query['es_time'] : null,
	);

	set_transient( 'myjp_last_search_timing', $timing, MINUTE_IN_SECONDS );
}
add_action( 'did_jetpack_search_query', 'myjp_record_search_timing', 10, 1 );
```

Use this bounded storage only during a controlled diagnostic window, then remove the companion plugin.

## Compatibility and failure cautions

The action runs synchronously in the search request. Slow callbacks and remote telemetry calls delay results; exceptions or fatal errors can interrupt Search after the service response has already arrived. High-traffic sites should not write a transient for every search as a permanent integration. Never log or persist the raw `args`, `response`, or `url`: they can reveal visitor search terms, result content, site identifiers, or request details. Aggregate the smallest numeric measurements required, apply a retention limit, and follow the site's privacy and consent policy.

Do not treat absence of this action as proof that Search was unused or failed. Instant Search cache hits, transport errors, and non-2xx responses do not fire it at the pinned revision. The array is descriptive telemetry, not a stable service-response SDK; feature-check keys and do not mutate or retain the decoded response.

## Verification

On a disposable connected site, install the example and run a unique synthetic search that requires a remote request. Then inspect only the sanitized transient:

```sh
wp transient get myjp_last_search_timing --format=json
```

Confirm the response code and timings are numeric and that no query string, URL, site identifier, or result data was stored. Repeat the same Instant Search request within its local cache window and confirm the action is not assumed to fire again. Simulate or observe a controlled non-2xx response and verify this transient is not used as failure telemetry.

## Source

[View the Classic Search action contract and emitter at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/classic-search/class-classic-search.php#L409-L428) The [Classic control flow defines its six fields and early returns](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/classic-search/class-classic-search.php#L380-L430), while [Instant Search applies the same contract before caching the decoded response](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/instant-search/class-instant-search.php#L285-L322).
