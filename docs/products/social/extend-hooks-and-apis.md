---
title: Extend Jetpack Social, hooks, and APIs
description: Control Social publication through verified filters and the Publicize package without depending on destination-service internals.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: social
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Social extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Publication filters","type":"object","required":false,"defaultValue":"","description":"Use documented filters for sharing decisions, messages, and capability behavior.","values":"","deprecated":false},{"name":"Publicize package","type":"object","required":false,"defaultValue":"","description":"Make shared changes in projects/packages/publicize rather than a removed modules/publicize path.","values":"","deprecated":false},{"name":"Editor data","type":"object","required":false,"defaultValue":"","description":"Use registered editor and REST contracts without copying private destination endpoints.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Social's local publishing engine is the Publicize package. Use documented WordPress hooks for policy decisions and package APIs for supported reusable behavior. Do not call a destination network with a token recovered from Jetpack data or infer a stable remote endpoint from editor traffic.

## Decide whether a post should be shared

[publicize_should_publicize_published_post](/docs/reference/hooks/filters/publicize-should-publicize-published-post/) filters the publication decision and receives a boolean plus the current `WP_Post`. Its pinned detail page defines the return and failure contract.

```php
/**
 * Keep posts in the internal category out of automatic social sharing.
 *
 * @param bool    $should_share Current sharing decision.
 * @param WP_Post $post         Post being considered.
 * @return bool
 */
function acme_social_publication_policy( $should_share, $post ) {
	if ( ! $should_share || ! $post instanceof WP_Post ) {
		return $should_share;
	}

	return has_term( 'internal', 'category', $post ) ? false : $should_share;
}
add_filter( 'publicize_should_publicize_published_post', 'acme_social_publication_policy', 10, 2 );
```

Keep this callback deterministic and free of remote requests. It can run more than once during publication checks, so side effects can produce duplicates or inconsistent decisions.

## Change the required capability

[jetpack_publicize_capability](/docs/reference/hooks/filters/jetpack-publicize-capability/) filters the WordPress capability used by Social surfaces. It literally defaults to `publish_posts`. When Publicize checks a specific post and the value is still that default, WordPress's singular `publish_post` meta capability is used for that post.

Changing this value is an authorization decision. Return a real capability string, test every relevant role, and verify both access to the editor controls and the server-side publishing path. Do not use it to grant a user access to a shared connection that organizational policy forbids.

## REST and block-editor data

The Publicize package registers editor-facing REST fields and post metadata for connection selection and share messages. Those interfaces remain subject to WordPress REST authentication, post capabilities, schema validation, and the installed package version. Treat connection IDs as opaque identifiers and never expose their authorization material to browser code or logs.

Publicize operates on post types that declare `publicize` support; the package registers that support for `post`. Supported extensions can also set the default checkbox, veto a service, format a message, adjust Open Graph output, or suppress Social Image Generator text through the relevant documented hook. The `wpcom/v2/publicize/*` routes are editor/product plumbing, not a general remote publishing API.

Before using another hook, inspect the [pinned Publicize source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize) and the [hooks policy](/docs/reference/hooks/). A hook present only for internal UI assembly is not automatically a third-party compatibility promise.

Test publish, update, scheduled publication, retry, unauthorized user, disconnected account, and destination failure. Confirm the destination receives at most one intended post.
