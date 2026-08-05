---
title: "videopress_is_current_user_authed_for_video"
description: Filters VideoPress's calculated decision about whether the current user may view a known video.
audience: developer
document_type: reference
sidebar_position: 80
sidebar_collapsed: true
product: videopress
hook_name: videopress_is_current_user_authed_for_video
hook_type: filter
since: "undocumented"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-access-control.php#L485-L511
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"videopress_is_current_user_authed_for_video callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$is_user_authed","type":"bool","required":true,"defaultValue":"","description":"VideoPress's authorization decision before this filter.","values":"","deprecated":false},{"name":"$guid","type":"string","required":true,"defaultValue":"","description":"the video's unique identifier.","values":"","deprecated":false},{"name":"$embedded_post_id","type":"int|null","required":true,"defaultValue":"","description":"the post supplied as the video's embedding context. Normalize defensively because one early path reaches the filter before the implementation's integer cast.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"videopress_is_current_user_authed_for_video.php","code":"\u003c?php\n/**\n * Plugin Name: My VideoPress members-only test rule\n */\n\nfunction myjp_require_login_for_selected_video( $is_user_authed, $guid, $embedded_post_id ) {\n\tunset( $embedded_post_id );\n\n\tif ( ! $is_user_authed ) {\n\t\treturn false;\n\t}\n\n\t$restricted_guid = (string) get_option( 'myjp_members_only_videopress_guid', '' );\n\tif ( '' === $restricted_guid || ! hash_equals( $restricted_guid, (string) $guid ) ) {\n\t\treturn true;\n\t}\n\n\treturn is_user_logged_in();\n}\nadd_filter( 'videopress_is_current_user_authed_for_video', 'myjp_require_login_for_selected_video', 10, 3 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the videopress_is_current_user_authed_for_video contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for videopress_is_current_user_authed_for_video","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: undocumented · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

VideoPress applies this filter to its calculated current-user authorization for a video. Users with the `upload_files` capability reach the filter with an initial `true` value before attachment lookup. Other users reach it after VideoPress finds the attachment, resolves the video's public, private, or site-default privacy setting, validates the supplied embedding post for non-public video, and computes access. Unknown attachments and invalid video information return `false` before the filter runs.

The result is cast to boolean and controls whether the VideoPress access path authorizes the current user. A callback can narrow or broaden the calculated decision; security-conscious integrations should only preserve or narrow it.

## Callback signature

The documented contract is:

```php
function ( bool $is_user_authed, string $guid, ?int $embedded_post_id ): bool
```

Register with three accepted arguments:

```php
add_filter( 'videopress_is_current_user_authed_for_video', 'my_callback', 10, 3 );
```

Do not add strict PHP parameter declarations: the `upload_files` short-circuit occurs before the implementation casts the supplied embedding post ID to an integer.

## Parameters

- `$is_user_authed` (`bool`) — VideoPress's authorization decision before this filter.
- `$guid` (`string`) — the video's unique identifier.
- `$embedded_post_id` (`int|null` by the documented contract) — the post supplied as the video's embedding context. Normalize defensively because one early path reaches the filter before the implementation's integer cast.

## Return behavior

Return an explicit boolean. Preserve `false` unless a separately documented authorization policy is entitled to supersede VideoPress's decision. Any truthy return value is cast to `true` and authorizes the current access path; a falsey value denies it.

## Since, deprecation, and replacement

The pinned filter DocBlock does not include an `@since` annotation, so its introduction version is undocumented rather than inferred. It is not deprecated at the pinned revision and has no documented replacement.

## Ownership

Product: Jetpack VideoPress. Package: `automattic/jetpack-videopress`. Source project: `projects/packages/videopress`. Owner: `Automattic\Jetpack\VideoPress\Access_Control`.

## Example

This companion plugin only narrows access: when a site administrator configures one synthetic test-video GUID in the `myjp_members_only_videopress_guid` option, an anonymous user is denied even if VideoPress's existing decision is `true`. Every existing denial remains denied.

```php
<?php
/**
 * Plugin Name: My VideoPress members-only test rule
 */

function myjp_require_login_for_selected_video( $is_user_authed, $guid, $embedded_post_id ) {
	unset( $embedded_post_id );

	if ( ! $is_user_authed ) {
		return false;
	}

	$restricted_guid = (string) get_option( 'myjp_members_only_videopress_guid', '' );
	if ( '' === $restricted_guid || ! hash_equals( $restricted_guid, (string) $guid ) ) {
		return true;
	}

	return is_user_logged_in();
}
add_filter( 'videopress_is_current_user_authed_for_video', 'myjp_require_login_for_selected_video', 10, 3 );
```

Use only a disposable video identifier while evaluating the example. A production restriction needs an explicit ownership, entitlement, and support policy.

## Compatibility and failure cautions

This is an authorization boundary. Returning `true` after VideoPress returned `false` can expose private, paid, or otherwise restricted media. Never implement the source DocBlock's illustrative “make all videos public” callback on a real site. Preserve prior denials, do not infer access from a GUID alone, and do not log GUIDs, embedding post IDs, user identifiers, or video metadata. Treat the embedding post as untrusted context; VideoPress validates it only on the non-public path and the early capability branch precedes that validation.

Callbacks run during a request for video access. Keep them local, deterministic, and fail closed on missing configuration, exceptions, or unavailable dependencies. Test every user role, privacy mode, embedding context, and paid-content path the site supports. A filter occurrence does not turn VideoPress's surrounding private classes or restriction data into a compatibility contract.

## Verification

On a disposable site, configure a synthetic GUID and test the callback contract without customer media:

```sh
wp option update myjp_members_only_videopress_guid Ab12Cd34
wp eval 'wp_set_current_user( 0 ); var_export( array( apply_filters( "videopress_is_current_user_authed_for_video", true, "Ab12Cd34", 0 ), apply_filters( "videopress_is_current_user_authed_for_video", false, "Ab12Cd34", 0 ), apply_filters( "videopress_is_current_user_authed_for_video", true, "Zy98Xw76", 0 ) ) );'
```

Expect `false`, `false`, and `true`: the selected video is narrowed for an anonymous user, an existing denial remains denied, and an unrelated allowed video remains unchanged. Then use a disposable VideoPress video to exercise public, private, site-default, invalid-embedding, and `upload_files` user paths through the real access flow. Delete the test option and companion plugin afterward.

## Source

[View the filter contract, three parameters, boolean cast, and direct return at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-access-control.php#L485-L511) The [surrounding authorization flow shows the early capability branch, attachment checks, privacy decisions, and embedding validation](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/class-access-control.php#L397-L482).
