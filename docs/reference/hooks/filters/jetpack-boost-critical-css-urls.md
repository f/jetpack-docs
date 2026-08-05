---
title: "jetpack_boost_critical_css_urls"
description: Filters the public URLs Jetpack Boost uses to generate Critical CSS for a source-provider group.
audience: developer
document_type: reference
sidebar_position: 30
sidebar_collapsed: true
product: boost
hook_name: jetpack_boost_critical_css_urls
hook_type: filter
since: "1.0.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost/app/lib/critical-css/source-providers/class-source-providers.php#L136-L174
last_reviewed: "2026-08-05"
---

## Behavior

Boost applies this filter while collecting the URLs used to generate Critical CSS. It runs separately for each non-empty group returned by each source-provider class. For non-core and non-cornerstone providers, Boost first removes URLs already owned by core or cornerstone groups; it then converts the remaining URLs to absolute form. Core and cornerstone groups bypass that cross-group removal. The filtered array becomes that group's `urls` value in the Critical CSS source list.

## Callback signature

```php
function ( array $urls, string $provider ): array
```

Register with two accepted arguments:

```php
add_filter( 'jetpack_boost_critical_css_urls', 'my_callback', 10, 2 );
```

## Parameters

- `$urls` (`array<int, string>`) — absolute public URLs for the current provider group.
- `$provider` (`class-string`) — the fully qualified source-provider class name. Despite the source DocBlock's “provider name” wording, the value passed at the pinned revision is the provider class from `Source_Providers::get_providers()`.

## Return behavior

Return an indexed array of absolute URL strings for the current group. Preserve relevant incoming URLs. Removing a URL means its route will not contribute to that group's generated Critical CSS; adding a URL can cause Boost's generator to request it. Returning a non-array breaks the downstream source contract.

## Since, deprecation, and replacement

Introduced in Jetpack Boost 1.0.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Boost. Project: `projects/plugins/boost`. Library: Critical CSS source providers. Method: `Automattic\Jetpack_Boost\Lib\Critical_CSS\Source_Providers\Source_Providers::get_provider_sources()`.

## Example

This companion plugin removes an account area that should never be fetched for Critical CSS. It leaves every unrelated URL and provider group unchanged:

```php
<?php
/**
 * Plugin Name: My Boost Critical CSS boundaries
 */

function myjp_remove_private_critical_css_urls( $urls, $provider ) {
	unset( $provider );

	$public_urls = array_filter(
		$urls,
		function ( $url ) {
			$path = wp_parse_url( $url, PHP_URL_PATH );

			return ! is_string( $path ) || 1 !== preg_match( '#^/account(?:/|$)#', $path );
		}
	);

	return array_values( $public_urls );
}
add_filter(
	'jetpack_boost_critical_css_urls',
	'myjp_remove_private_critical_css_urls',
	10,
	2
);
```

## Compatibility and failure cautions

Use only public, canonical URLs that are safe for an automated generator to request. Never add preview links, authentication tokens, customer-specific pages, or routes containing private data. A callback may run for several groups and providers, so it must be deterministic and fast. Provider class names identify the current implementation and can change; use them only when a provider-specific rule is unavoidable. Removing all URLs from a group can leave it without a useful generation target. Regeneration and caches can delay visible results after this filter changes.

## Verification

Install the example on a disposable site that could otherwise discover an `/account/` route. Regenerate Critical CSS from Boost, then inspect Boost's generation status and request logs available to the site administrator. Confirm no `/account` URL is requested, public representative routes still generate successfully, and the affected public templates render correctly at desktop and mobile widths. Disable the companion plugin and regenerate again to prove the difference comes from the filter.

## Source

[View the provider-group preprocessing, assembly, and filter application at the pinned revision.](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/boost/app/lib/critical-css/source-providers/class-source-providers.php#L136-L174)
