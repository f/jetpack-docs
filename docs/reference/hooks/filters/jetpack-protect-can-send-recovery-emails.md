---
title: "jetpack_protect_can_send_recovery_emails"
description: Filters whether a Protect-blocked login can use the email recovery flow.
audience: developer
document_type: reference
sidebar_position: 100
sidebar_collapsed: true
product: protect
hook_name: jetpack_protect_can_send_recovery_emails
hook_type: filter
since: "5.6.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/waf/src/abstract-blocked-login-page.php#L84-L96
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_protect_can_send_recovery_emails callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$can_send_recovery_emails","type":"bool","required":true,"defaultValue":"","description":"current decision. The pinned source call site passes true by default.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_protect_can_send_recovery_emails.php","code":"function acme_protect_recovery_policy( $can_send_recovery_emails ) {\n\tif ( ! $can_send_recovery_emails ) {\n\t\treturn false;\n\t}\n\n\t$helpdesk_only = defined( 'ACME_HELPDESK_ONLY_LOGIN_RECOVERY' )\n\t\t\u0026\u0026 ACME_HELPDESK_ONLY_LOGIN_RECOVERY;\n\n\treturn ! $helpdesk_only;\n}\nadd_filter(\n\t'jetpack_protect_can_send_recovery_emails',\n\t'acme_protect_recovery_policy'\n);","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_protect_can_send_recovery_emails contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_protect_can_send_recovery_emails","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 5.6.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

The Jetpack WAF package applies this filter when it constructs the login page for a hard-blocked IP address. The result controls whether Protect shows and processes its email recovery form and whether a recovery token can be validated. When disabled, Protect renders the blocked-login message without the email recovery route.

The filter does not unblock an address, send an email by itself, or disable Protect. It is evaluated once for the blocked-login-page instance, so the callback must be registered before that instance is created.

## Callback signature

```php
function ( bool $can_send_recovery_emails ): bool
```

## Parameters

- `$can_send_recovery_emails` (`bool`) — current decision. The pinned source call site passes `true` by default.

## Return behavior

Return `true` to keep Protect's email recovery form and token flow available. Return `false` to show only the blocked-login message and prevent that recovery path. Preserve an incoming `false` so another policy cannot be accidentally overridden.

## Since, deprecation, and replacement

Introduced in Jetpack 5.6.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Protect, brute-force protection recovery. Package: `automattic/jetpack-waf`. Source project: `projects/packages/waf`. Class: `Automattic\Jetpack\Waf\Blocked_Login_Page`.

## Example

This companion-plugin example disables email recovery only when a site-owner configuration explicitly routes blocked administrators through a staffed help desk. The incoming decision is always preserved:

```php
function acme_protect_recovery_policy( $can_send_recovery_emails ) {
	if ( ! $can_send_recovery_emails ) {
		return false;
	}

	$helpdesk_only = defined( 'ACME_HELPDESK_ONLY_LOGIN_RECOVERY' )
		&& ACME_HELPDESK_ONLY_LOGIN_RECOVERY;

	return ! $helpdesk_only;
}
add_filter(
	'jetpack_protect_can_send_recovery_emails',
	'acme_protect_recovery_policy'
);
```

## Compatibility and failure cautions

Returning false can strand every administrator behind a hard IP block. Establish and test a separate, authenticated recovery route before deploying that policy. The filter receives no IP address, user, or email, so do not infer a per-user decision from untrusted query or form input. It is not a rate limiter, firewall bypass, mail transport switch, or replacement for nonce and recovery-token validation. Register it early; changing the callback after the blocked-login-page singleton is constructed does not change that instance. Never log submitted email addresses, recovery tokens, connection credentials, or the blocked address while testing.

## Verification

Use a disposable staging site, a dedicated test administrator, and verified console or hosting access so the test cannot lock out the site owner. First invoke `apply_filters( 'jetpack_protect_can_send_recovery_emails', true )` with the configuration absent and expect `true`; enable `ACME_HELPDESK_ONLY_LOGIN_RECOVERY` and expect `false`. In a controlled hard-block scenario, confirm the false case shows only the blocked message and does not accept a recovery-email submission. Restore the default and confirm the form and a synthetic recovery flow return. Verify the alternative help-desk recovery route before enabling the policy anywhere persistent.

## Source

[View the filter documentation and assignment at the pinned Jetpack revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/waf/src/abstract-blocked-login-page.php#L84-L96) The [render and token-validation paths both honor the stored decision](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/waf/src/abstract-blocked-login-page.php#L225-L315).
