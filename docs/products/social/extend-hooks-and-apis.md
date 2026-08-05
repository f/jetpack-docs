---
title: Extend Jetpack Social, hooks, and APIs
description: Control Social publication through verified filters and the Publicize package without depending on destination-service internals.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: social
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack Social's local publishing engine is the Publicize package. Use documented WordPress hooks for policy decisions and package APIs for supported reusable behavior. Do not call a destination network with a token recovered from Jetpack data or infer a stable remote endpoint from editor traffic.

## Decide whether a post should be shared

`publicize_should_publicize_published_post` filters the publication decision and receives a boolean plus the current `WP_Post`. Its [pinned source contract](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/publicize/src/class-publicize.php#L601-L609) is the evidence for this revision.

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

`jetpack_publicize_capability` filters the WordPress capability used by Social surfaces. It literally defaults to `publish_posts`. When Publicize checks a specific post and the value is still that default, WordPress's singular `publish_post` meta capability is used for that post; the [pinned source](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/publicize/src/class-publicize-base.php#L1100-L1114) shows that distinction.

Changing this value is an authorization decision. Return a real capability string, test every relevant role, and verify both access to the editor controls and the server-side publishing path. Do not use it to grant a user access to a shared connection that organizational policy forbids.

## REST and block-editor data

The Publicize package registers editor-facing REST fields and post metadata for connection selection and share messages. Those interfaces remain subject to WordPress REST authentication, post capabilities, schema validation, and the installed package version. Treat connection IDs as opaque identifiers and never expose their authorization material to browser code or logs.

Before using another hook, inspect the [pinned Publicize source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/publicize) and the [hooks policy](/docs/reference/hooks/). A hook present only for internal UI assembly is not automatically a third-party compatibility promise.

Test publish, update, scheduled publication, retry, unauthorized user, disconnected account, and destination failure. Confirm the destination receives at most one intended post.
