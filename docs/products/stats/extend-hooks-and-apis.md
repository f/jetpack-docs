---
title: Extend Jetpack Stats, hooks, and APIs
description: Customize documented Stats collection behavior and retrieve reports through the owning package without exposing personal data.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: stats
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Stats extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Tracking filters","type":"object","required":false,"defaultValue":"","description":"Use documented filters for privacy, exclusions, and non-personal custom dimensions.","values":"","deprecated":false},{"name":"WordPress Abilities","type":"object","required":false,"defaultValue":"","description":"Use the seven feature-gated Stats abilities with view_stats or manage_options as required.","values":"","deprecated":false},{"name":"Reports and packages","type":"object","required":false,"defaultValue":"","description":"Use documented WPCOM_Stats reports and package entry points while preserving caching and capability checks.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

The Stats package exposes WordPress filters for local collection behavior and a PHP client for connected-site reports. Use these surfaces only after reviewing privacy, consent, caching, and service compatibility.

## Add a non-personal tracking dimension

The curated [stats_array](/docs/reference/hooks/filters/stats-array/) filter receives the key-value data immediately before it is serialized for the browser tracking code. It returns an array, and the package README documents it as the extension point for additional parameters.

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

- `jetpack_honor_dnt_header_for_stats`, a boolean opt-in that makes collection honor a browser DNT header. See its [source and semantics](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-main.php#L113-L133).
- [jetpack_stats_excluded_ips](/docs/reference/hooks/filters/jetpack-stats-excluded-ips/), an array of IP address strings excluded from tracking. The source warns that proxies and caching can make IP behavior unreliable.

These are implementation controls, not a complete consent system. Test them behind the site's real proxy and cache topology and avoid persisting visitor IPs merely to implement an exclusion.

## Retrieve reports

`Automattic\Jetpack\Stats\WPCOM_Stats` provides methods for documented report families. The pinned [get_stats() and get_top_posts() methods](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/stats/src/class-wpcom-stats.php#L63-L109) use the connected site's authenticated request path and return arrays or `WP_Error` values.

The package README documents summary, visits, top posts/pages, referrers, clicks, search terms, video plays, tags/categories, authors, followers, and other report families. Results use a five-minute transient cache by default; `get_top_posts( ..., true )` bypasses that cache. Handle a cached `WP_Error` as an error, not as an empty report.

## WordPress Abilities

When `jetpack_wp_abilities_enabled` is on, Stats registers:

- `jetpack-stats/get-site-overview`
- `jetpack-stats/get-top-content`
- `jetpack-stats/get-post-views`
- `jetpack-stats/get-visits`
- `jetpack-stats/get-followers`
- `jetpack-stats/get-settings`
- `jetpack-stats/update-settings`

Reads require `view_stats`; the settings mutation requires `manage_options`. The overview can return `partial: true` with an `errors` list when only some service calls succeed, so a placeholder zero is not automatically a confirmed count. Require human confirmation before changing settings and discover the current schemas through WordPress Abilities.

Initialize the Stats package through the documented Jetpack package configuration and Autoloader workflow. Do not hard-code its service URLs or copy connection credentials into a separate HTTP client. Cache results according to the package behavior, check `is_wp_error()`, bound query ranges, and enforce a capability before exposing reports.

Review the [general hooks policy](/docs/reference/hooks/) before adopting another Stats filter. Test collection and reporting with consent on and off, excluded and included visits, cache hits, service errors, and an unauthorized dashboard user.
