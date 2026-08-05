---
title: Extend Jetpack Stats, hooks, and APIs
description: Customize documented Stats collection behavior and retrieve reports through the owning package without exposing personal data.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: stats
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

The Stats package exposes WordPress filters for local collection behavior and a PHP client for connected-site reports. Use these surfaces only after reviewing privacy, consent, caching, and service compatibility.

## Add a non-personal tracking dimension

The `stats_array` filter receives the key-value data immediately before it is serialized for the browser tracking code. Its [pinned definition](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats/src/class-tracking-pixel.php#L468-L480) returns an array, and the package README documents it as the extension point for additional parameters.

```php
/**
 * Add a coarse, non-personal content group to Stats requests.
 *
 * @param array $values Tracking values.
 * @return array
 */
function acme_stats_content_group( $values ) {
	if ( is_singular( 'product' ) ) {
		$values['acme_group'] = 'product';
	}

	return $values;
}
add_filter( 'stats_array', 'acme_stats_content_group' );
```

Use a short controlled vocabulary. Never include post titles, URLs with personal query parameters, user IDs, emails, order numbers, free-form input, or another unique identifier. Confirm that the receiving product supports the custom value before making reporting depend on it.

## Privacy and exclusion filters

The pinned package defines:

- `jetpack_honor_dnt_header_for_stats`, a boolean opt-in that makes collection honor a browser DNT header. See its [source and semantics](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats/src/class-main.php#L113-L133).
- `jetpack_stats_excluded_ips`, an array of IP address strings excluded from tracking. The [source warning](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats/src/class-main.php#L243-L262) notes that proxies and caching can make IP behavior unreliable.

These are implementation controls, not a complete consent system. Test them behind the site's real proxy and cache topology and avoid persisting visitor IPs merely to implement an exclusion.

## Retrieve reports

`Automattic\Jetpack\Stats\WPCOM_Stats` provides methods for documented report families. The pinned [`get_stats()` and `get_top_posts()` methods](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/stats/src/class-wpcom-stats.php#L63-L109) use the connected site's authenticated request path and return arrays or `WP_Error` values.

Initialize the Stats package through the documented Jetpack package configuration and Autoloader workflow. Do not hard-code its service URLs or copy connection credentials into a separate HTTP client. Cache results according to the package behavior, check `is_wp_error()`, bound query ranges, and enforce a capability before exposing reports.

Review the [general hooks policy](/docs/reference/hooks/) before adopting another Stats filter. Test collection and reporting with consent on and off, excluded and included visits, cache hits, service errors, and an unauthorized dashboard user.
