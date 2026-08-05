---
title: "jetpack_stats_excluded_ips"
description: Filters the exact visitor IP address strings Jetpack Stats excludes from view tracking.
audience: developer
document_type: reference
sidebar_position: 130
sidebar_collapsed: true
product: stats
hook_name: jetpack_stats_excluded_ips
hook_type: filter
since: "10.6"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-main.php#L241-L262
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_stats_excluded_ips callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$excluded_ips","type":"array\u003cint, string\u003e","required":true,"defaultValue":"","description":"exact IP address strings supplied by earlier callbacks; initially empty.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_stats_excluded_ips.php","code":"\u003c?php\n/**\n * Plugin Name: Acme Stats monitoring exclusion\n */\n\nfunction acme_stats_excluded_ips( $excluded_ips ) {\n\t$configured_ip = get_option( 'acme_stats_monitoring_ip', '' );\n\n\tif ( is_string( $configured_ip ) \u0026\u0026 filter_var( $configured_ip, FILTER_VALIDATE_IP ) ) {\n\t\t$excluded_ips[] = $configured_ip;\n\t}\n\n\treturn array_values( array_unique( $excluded_ips ) );\n}\nadd_filter( 'jetpack_stats_excluded_ips', 'acme_stats_excluded_ips', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_stats_excluded_ips contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_stats_excluded_ips","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 10.6 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Stats applies this filter while deciding whether the current request should be tracked. It compares the visitor IP resolved by Jetpack with the returned list using strict, exact string matching. A match stops tracking for that request.

The filter runs after several earlier exclusions, including feed, preview, Do Not Track, Safe Mode, and logged-in role checks. A callback therefore is not guaranteed to run on every request.

## Callback signature

```php
function ( array $excluded_ips ): array
```

Register with one accepted argument:

```php
add_filter( 'jetpack_stats_excluded_ips', 'acme_stats_excluded_ips', 10, 1 );
```

## Parameters

- `$excluded_ips` (`array<int, string>`) — exact IP address strings supplied by earlier callbacks; initially empty.

## Return behavior

Return the complete array of exact IPv4 or IPv6 strings to exclude. Preserve earlier entries. The implementation does not interpret CIDR ranges, prefixes, hostnames, or wildcard syntax.

## Since, deprecation, and replacement

Introduced in Jetpack 10.6 according to the pinned annotation. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack Stats. Package: `automattic/jetpack-stats`. Source project: `projects/packages/stats`. Owner method: `Automattic\Jetpack\Stats\Main::should_track()`.

## Example

This companion plugin appends one administrator-configured IP only after validating it. Configure the option through a trusted administrative process; do not accept it directly from a public request.

```php
<?php
/**
 * Plugin Name: Acme Stats monitoring exclusion
 */

function acme_stats_excluded_ips( $excluded_ips ) {
	$configured_ip = get_option( 'acme_stats_monitoring_ip', '' );

	if ( is_string( $configured_ip ) && filter_var( $configured_ip, FILTER_VALIDATE_IP ) ) {
		$excluded_ips[] = $configured_ip;
	}

	return array_values( array_unique( $excluded_ips ) );
}
add_filter( 'jetpack_stats_excluded_ips', 'acme_stats_excluded_ips', 10, 1 );
```

## Compatibility and failure cautions

Proxy and load-balancer headers determine which address Jetpack resolves, and a full-page cache can serve tracking markup generated for a different visitor. Test through the production-shaped proxy and cache topology before relying on this filter. Exact matching means differently compressed IPv6 text may not match, and a changing shared address can exclude unintended visitors. Do not collect or retain visitor IPs merely to populate this list. This filter is a narrow collection control, not a complete consent or privacy policy.

## Verification

On a disposable environment that reproduces the site's proxy behavior, configure a known test-client IP and bypass full-page caching. Confirm a request from that client does not receive Stats tracking markup, while a control request from a different address does. Then enable the real cache path and repeat both requests in both orders. Remove the option and confirm the test client returns to the normal tracking decision without exposing its address in logs or screenshots.

## Source

[View the hook annotation, resolved visitor address, and strict comparison at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-main.php#L241-L262)
