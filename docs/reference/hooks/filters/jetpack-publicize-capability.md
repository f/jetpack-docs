---
title: "jetpack_publicize_capability"
description: Filters the WordPress capability required to access Jetpack Social's Publicize data and controls.
audience: developer
document_type: reference
sidebar_position: 110
sidebar_collapsed: true
product: social
hook_name: jetpack_publicize_capability
hook_type: filter
since: "0.1.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/class-publicize-base.php#L1100-L1114
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_publicize_capability callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$capability","type":"string","required":true,"defaultValue":"","description":"the capability selected by Publicize or an earlier callback; initially publish_posts.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_publicize_capability.php","code":"\u003c?php\n/**\n * Plugin Name: Acme Social capability policy\n */\n\nfunction acme_social_capability( $capability ) {\n\tif ( ! is_string( $capability ) || '' === $capability ) {\n\t\treturn 'manage_options';\n\t}\n\n\treturn 'manage_options';\n}\nadd_filter( 'jetpack_publicize_capability', 'acme_social_capability', 10, 1 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_publicize_capability contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_publicize_capability","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 0.1.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

The Publicize package applies this filter whenever it decides whether the current user may access Social data or controls. The default is `publish_posts`. When that exact default remains in place and a post ID is available, Publicize checks WordPress's object-aware `publish_post` meta capability for that post. If a callback returns another capability, Publicize performs the global `current_user_can( $capability )` check instead.

The decision protects editor UI, REST controllers, and registered Publicize post metadata. Changing it is an authorization policy change, not a presentation-only customization.

## Callback signature

```php
function ( string $capability ): string
```

Register with one accepted argument:

```php
add_filter( 'jetpack_publicize_capability', 'acme_social_capability', 10, 1 );
```

## Parameters

- `$capability` (`string`) — the capability selected by Publicize or an earlier callback; initially `publish_posts`.

## Return behavior

Return one valid WordPress capability name as a non-empty string. Preserve an earlier callback's value unless the integration intentionally owns the complete authorization policy. Returning an unknown or malformed capability normally denies access; returning a capability held by broader roles can expose Social controls and data to those roles.

## Since, deprecation, and replacement

Introduced in version 0.1.0 of `automattic/jetpack-publicize` and in Jetpack 4.1.0, according to the pinned annotation. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack Social. Package: `automattic/jetpack-publicize`. Source project: `projects/packages/publicize`. Owner method: `Publicize_Base::current_user_can_access_publicize_data()`.

## Example

This companion plugin raises Social access to administrators. It does not grant a new capability or expose connection data:

```php
<?php
/**
 * Plugin Name: Acme Social capability policy
 */

function acme_social_capability( $capability ) {
	if ( ! is_string( $capability ) || '' === $capability ) {
		return 'manage_options';
	}

	return 'manage_options';
}
add_filter( 'jetpack_publicize_capability', 'acme_social_capability', 10, 1 );
```

## Compatibility and failure cautions

Changing the literal default removes Publicize's special per-post `publish_post` check and replaces it with a global capability check. Test custom post types and mapped meta capabilities accordingly. A broad capability can expose connection selection, share messages, or REST data; an overly narrow or nonexistent capability can remove Social controls for every user. Keep the callback independent of the current screen because REST and metadata authorization also call it. Do not make remote requests or inspect Social credentials in this filter.

## Verification

On a disposable site, test an administrator and an editor against the block editor, Social controls, and the relevant authenticated REST responses. With the example active, the administrator should retain access and the editor should be denied even when the editor can publish the post. Remove the companion plugin and confirm the default object-aware publishing check returns. Repeat with every custom role and publicizable post type used by the site.

## Source

[View the documented filter and the default-versus-custom capability branches at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/class-publicize-base.php#L1093-L1114)

[View representative UI, REST, and post-field consumers of the authorization method.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/publicize/src/rest-api/class-connections-post-field.php#L188-L204)
