---
title: "jetpack_boost_clear_page_cache_url"
description: Requests deletion of Jetpack Boost page-cache entries for one site URL and its recursive cache scope.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
product: boost
hook_name: jetpack_boost_clear_page_cache_url
hook_type: action
since: "undocumented"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/boost-cache-actions.php#L24-L31
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_boost_clear_page_cache_url callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"$url","type":"string","required":true,"defaultValue":"","description":"the absolute, canonical URL whose recursive Boost page-cache scope should be deleted.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_boost_clear_page_cache_url.php","code":"\u003c?php\n/**\n * Plugin Name: My Boost campaign cache invalidation\n */\n\nfunction myjp_clear_campaign_cache( $relative_path ) {\n\t$relative_path = ltrim( (string) $relative_path, '/' );\n\tif ( '' === $relative_path || false !== strpos( $relative_path, '..' ) ) {\n\t\treturn;\n\t}\n\n\t$url = home_url( '/' . $relative_path . '/' );\n\tif ( wp_parse_url( $url, PHP_URL_HOST ) !== wp_parse_url( home_url(), PHP_URL_HOST ) ) {\n\t\treturn;\n\t}\n\n\tdo_action( 'jetpack_boost_clear_page_cache_url', $url );\n}\nadd_action( 'myjp_campaign_content_changed', 'myjp_clear_campaign_cache', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_boost_clear_page_cache_url contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_boost_clear_page_cache_url","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: undocumented · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Boost registers its page-cache URL deletion callback on this action. Calling the action passes a URL to `jetpack_boost_delete_cache_for_url()`, which asks Boost's cache storage to delete that URL recursively without rebuilding it. Use the action after content outside WordPress's normal post invalidation flow changes a public route.

This is a command-style action for integrations to invoke. Boost's public Cache API guide says the page-cache hooks are loaded early and recommends waiting until after `init` before invoking them. If Boost or its Page Cache module is unavailable, WordPress still fires the action but Boost has no deletion callback to run.

## Callback signature

The Boost callback registered on this action accepts one argument:

```php
function ( string $url ): void
```

Invoke the action with one URL:

```php
do_action( 'jetpack_boost_clear_page_cache_url', $url );
```

## Parameters

- `$url` (`string`) — the absolute, canonical URL whose recursive Boost page-cache scope should be deleted.

## Return behavior

This is an action. WordPress ignores callback return values, and `do_action()` does not report whether Boost found or deleted a cache entry.

## Since, deprecation, and replacement

The pinned callback DocBlock and public Cache API guide do not provide an `@since` version for this action. Its introduction version is therefore undocumented rather than inferred. It is not deprecated at the pinned revision and has no documented replacement.

## Ownership

Product: Jetpack Boost. Project: `projects/plugins/boost`. Module: Page Cache. Public callback: `jetpack_boost_delete_cache_for_url()` in the pre-WordPress cache implementation.

## Example

This companion plugin maps a controlled, relative campaign path to the current site's canonical URL before asking Boost to clear it. The custom `myjp_campaign_content_changed` action should run only after the integration has committed its content change.

```php
<?php
/**
 * Plugin Name: My Boost campaign cache invalidation
 */

function myjp_clear_campaign_cache( $relative_path ) {
	$relative_path = ltrim( (string) $relative_path, '/' );
	if ( '' === $relative_path || false !== strpos( $relative_path, '..' ) ) {
		return;
	}

	$url = home_url( '/' . $relative_path . '/' );
	if ( wp_parse_url( $url, PHP_URL_HOST ) !== wp_parse_url( home_url(), PHP_URL_HOST ) ) {
		return;
	}

	do_action( 'jetpack_boost_clear_page_cache_url', $url );
}
add_action( 'myjp_campaign_content_changed', 'myjp_clear_campaign_cache', 10, 1 );
```

Call the custom action with a trusted application path, for example `do_action( 'myjp_campaign_content_changed', 'campaign/summer' );`, after `init`.

## Compatibility and failure cautions

Pass only a URL owned by the current site. Do not accept an arbitrary request URL, token-bearing preview URL, customer-specific URL, or private route and forward it to this action. Boost performs recursive deletion for the supplied path, so an unexpectedly broad path can evict more cache entries than intended. Cache deletion can increase origin load while pages are repopulated; debounce bulk updates instead of firing once per record. The action is not proof that Page Cache is active, that a cache entry existed, or that storage deletion succeeded. Feature-detect the registered Boost callback when an integration must distinguish the inactive case, but do not call that callback directly.

## Verification

On a disposable site with Boost Page Cache enabled, warm a synthetic public URL and confirm it is served from cache using the cache diagnostics available to the site administrator. Then verify that Boost registered its callback and invoke the action:

```sh
wp eval 'var_export( has_action( "jetpack_boost_clear_page_cache_url", "jetpack_boost_delete_cache_for_url" ) );'
wp eval 'do_action( "jetpack_boost_clear_page_cache_url", home_url( "/campaign/summer/" ) );'
```

The first command should print the callback priority. Request the same URL again and confirm the old cache entry is gone and the current public content is returned. Repeat with Page Cache disabled and confirm the integration fails harmlessly.

## Source

[View the public callback registration and its URL parameter at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/boost-cache-actions.php#L24-L31) The [public Cache API guide shows the supported invocation](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/docs/Cache_API.md#L33-L42), and the [callback delegates to recursive deletion](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/boost/app/modules/optimizations/page-cache/pre-wordpress/boost-cache-actions.php#L67-L75).
