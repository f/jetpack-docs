---
title: "jetpack_ai_enabled"
description: Filters a call site's provisional decision about whether Jetpack AI is enabled before final host and master gates.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
product: ai
hook_name: jetpack_ai_enabled
hook_type: filter
since: "11.8"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/lib/class-jetpack-ai-settings.php#L184-L212
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_ai_enabled callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$enabled","type":"bool","required":true,"defaultValue":"","description":"current provisional decision. Its default varies by caller.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_ai_enabled.php","code":"function acme_apply_ai_policy( $enabled ) {\n\treturn $enabled \u0026\u0026 ! defined( 'ACME_DISABLE_JETPACK_AI' );\n}\nadd_filter( 'jetpack_ai_enabled', 'acme_apply_ai_policy' );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_ai_enabled contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_ai_enabled","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 11.8 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack applies this PHP filter to a call site's provisional AI availability decision, then applies host policy and the master AI switch as final gates. Defaults differ by call site. Use it to veto AI availability under an external policy; do not use it as a feature integration API or assume returning `true` can force AI on.

## Callback signature

```php
function ( bool $enabled ): bool
```

## Parameters

- `$enabled` (`bool`) — current provisional decision. Its default varies by caller.

## Return behavior

Return a boolean. Returning `false` disables the filtered surface. Returning `true` preserves only the provisional decision; a host policy or master switch can still disable AI afterward.

## Since, deprecation, and replacement

The Jetpack plugin contract records `@since 11.8`. A My Jetpack package call site has its own package-version annotation; do not treat that as a replacement for the plugin version. The filter is not deprecated at the pinned revision.

## Ownership

Product: Jetpack AI. Plugin owner: `projects/plugins/jetpack/_inc/lib/class-jetpack-ai-settings.php`. Package consumers can apply the same named filter with caller-specific defaults.

## Example

```php
function acme_apply_ai_policy( $enabled ) {
	return $enabled && ! defined( 'ACME_DISABLE_JETPACK_AI' );
}
add_filter( 'jetpack_ai_enabled', 'acme_apply_ai_policy' );
```

## Compatibility and failure cautions

Do not discard the incoming value, because one caller can already have disabled AI. The filter does not bypass host policy, the master setting, user connection, permissions, entitlement, quota, or feature-specific settings. Register before the relevant feature checks availability. Use a host-level policy constant only when the site operator understands the product impact.

## Verification

On a disposable site, define `ACME_DISABLE_JETPACK_AI`, start a fresh request, and run `wp eval 'var_export( apply_filters( "jetpack_ai_enabled", true ) );'`; expect `false`. Remove the constant and repeat; expect the incoming value. Then verify the editor surface respects all later host, master, connection, and product gates.

## Source

[View the filter and final host/master gate application at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/lib/class-jetpack-ai-settings.php#L184-L212)
