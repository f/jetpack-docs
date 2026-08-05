---
title: "publicize_should_publicize_published_post"
description: Filters whether Jetpack Social should mark a newly published post for automatic sharing.
audience: developer
document_type: reference
sidebar_position: 100
sidebar_collapsed: true
product: social
hook_name: publicize_should_publicize_published_post
hook_type: filter
since: "0.1.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/class-publicize.php#L597-L609
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"publicize_should_publicize_published_post callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$should_publicize","type":"bool","required":true,"defaultValue":"","description":"the decision produced by Publicize pre-checks and earlier callbacks.","values":"","deprecated":false},{"name":"$post","type":"WP_Post","required":true,"defaultValue":"","description":"the post being evaluated for automatic sharing.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"publicize_should_publicize_published_post.php","code":"\u003c?php\n/**\n * Plugin Name: Acme Social publication policy\n */\n\nfunction acme_social_publication_policy( $should_publicize, $post ) {\n\tif ( ! $should_publicize || ! $post instanceof WP_Post ) {\n\t\treturn $should_publicize;\n\t}\n\n\tif ( has_term( 'internal', 'category', $post ) ) {\n\t\treturn false;\n\t}\n\n\treturn $should_publicize;\n}\nadd_filter( 'publicize_should_publicize_published_post', 'acme_social_publication_policy', 10, 2 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the publicize_should_publicize_published_post contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for publicize_should_publicize_published_post","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 0.1.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Social applies this filter after the Publicize package runs its own publication pre-checks. During a transition into `publish`, the returned value determines whether the post is marked for sharing. The package applies the same filter while building its published-post flags, so a callback can run more than once for one publication workflow.

Treat the incoming boolean as authoritative. It can already be `false` because of post type, request context, connection, or another package decision.

## Callback signature

```php
function ( bool $should_publicize, WP_Post $post ): bool
```

Register with two accepted arguments:

```php
add_filter( 'publicize_should_publicize_published_post', 'acme_social_publication_policy', 10, 2 );
```

## Parameters

- `$should_publicize` (`bool`) — the decision produced by Publicize pre-checks and earlier callbacks.
- `$post` (`WP_Post`) — the post being evaluated for automatic sharing.

## Return behavior

Return a boolean. Return `false` to prevent this publication from being marked for Social sharing. Preserve an incoming `false` unless the integration intentionally and safely replaces every pre-check that produced it; forcing `true` can bypass protections the callback cannot observe.

## Since, deprecation, and replacement

Introduced in version 0.1.0 of `automattic/jetpack-publicize` and in Jetpack 4.1.0, according to the annotations at the pinned call site. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack Social. Package: `automattic/jetpack-publicize`. Source project: `projects/packages/publicize`. The filter is applied by `Automattic\Jetpack\Publicize\Publicize` during publication flagging.

## Example

This companion-plugin callback prevents automatic sharing for posts in an `internal` category. It only narrows the current decision and has no side effects:

```php
<?php
/**
 * Plugin Name: Acme Social publication policy
 */

function acme_social_publication_policy( $should_publicize, $post ) {
	if ( ! $should_publicize || ! $post instanceof WP_Post ) {
		return $should_publicize;
	}

	if ( has_term( 'internal', 'category', $post ) ) {
		return false;
	}

	return $should_publicize;
}
add_filter( 'publicize_should_publicize_published_post', 'acme_social_publication_policy', 10, 2 );
```

## Compatibility and failure cautions

Keep the callback deterministic, fast, and free of remote requests because Publicize may evaluate it more than once. Never create shares, mutate the post, or write an audit event from this filter. Do not assume the incoming value defaults to `true` even though an older annotation uses that wording; current source passes the result of `should_submit_post_pre_checks()`. The filter does not run when Social or the Publicize package is inactive, and returning `false` does not cancel a share that was already sent.

## Verification

On a disposable site with Social active, create two otherwise identical draft posts and assign the `internal` category to one. Confirm `apply_filters( 'publicize_should_publicize_published_post', true, get_post( $post_id ) )` returns `false` only for the categorized post. Publish through the normal editor workflow and verify Social offers or queues only the control post. Repeat a scheduled publication and confirm the callback does not create duplicate side effects.

## Source

[View the annotated filter application during the publish transition at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/class-publicize.php#L590-L614)

[View the second application while Publicize builds published-post flags.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/class-publicize.php#L708-L736)
