---
title: "jetpack_account_protection_user_requires_protection"
description: Filters whether Account Protection checks a qualifying user's password against its leaked-password service.
audience: developer
document_type: reference
sidebar_position: 90
sidebar_collapsed: true
product: protect
hook_name: jetpack_account_protection_user_requires_protection
hook_type: filter
since: "0.1.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/account-protection/src/class-password-detection.php#L420-L429
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_account_protection_user_requires_protection callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$requires_protection","type":"bool","required":true,"defaultValue":"","description":"current decision, true at the pinned source call site.","values":"","deprecated":false},{"name":"$user","type":"WP_User","required":true,"defaultValue":"","description":"user being authenticated. The callback receives no plaintext password.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_account_protection_user_requires_protection.php","code":"function acme_account_protection_policy( $requires_protection, $user ) {\n\tif ( user_can( $user, 'manage_options' ) ) {\n\t\treturn true;\n\t}\n\n\treturn (bool) $requires_protection;\n}\nadd_filter(\n\t'jetpack_account_protection_user_requires_protection',\n\t'acme_account_protection_policy',\n\tPHP_INT_MAX,\n\t2\n);","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_account_protection_user_requires_protection contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_account_protection_user_requires_protection","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 0.1.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Account Protection applies this filter during login after WordPress supplies a user and password, but before the package verifies that password and checks it against the leaked-password service. The filter runs only for users who can publish posts or edit published posts; users outside that capability gate return before the filter runs.

Returning false skips the package's leaked-password detection and its verification-email flow for that login. The password itself is deliberately not passed to the callback.

## Callback signature

```php
function ( bool $requires_protection, WP_User $user ): bool
```

## Parameters

- `$requires_protection` (`bool`) — current decision, `true` at the pinned source call site.
- `$user` (`WP_User`) — user being authenticated. The callback receives no plaintext password.

## Return behavior

Return `true` to keep Account Protection's password check in the login path. Return `false` only when a separately enforced authentication control makes that password check inapplicable. Preserve an incoming `false`; a callback must not try to expand this filter beyond the package's earlier capability gate.

## Since, deprecation, and replacement

Introduced in version 0.1.0 of `automattic/jetpack-account-protection`. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Protect, Account Protection feature. Package: `automattic/jetpack-account-protection`. Source project: `projects/packages/account-protection`. Method: `Automattic\Jetpack\Account_Protection\Password_Detection::user_requires_protection()`.

## Example

This companion-plugin example enforces Account Protection for administrators even if an earlier callback attempted to opt them out. It preserves the incoming decision for every other qualifying user:

```php
function acme_account_protection_policy( $requires_protection, $user ) {
	if ( user_can( $user, 'manage_options' ) ) {
		return true;
	}

	return (bool) $requires_protection;
}
add_filter(
	'jetpack_account_protection_user_requires_protection',
	'acme_account_protection_policy',
	PHP_INT_MAX,
	2
);
```

## Compatibility and failure cautions

Returning false removes a login-security check; it is not a display preference. Do not opt out by role, IP address, environment name, or administrator convenience. Confirm that the alternative authentication control cannot fall back to a password through recovery, XML-RPC, application passwords, or another login path before disabling this check. Keep policy data local and fast because the callback runs during authentication. Never serialize or log the `WP_User` object, which includes a password hash, and never attempt to recover the plaintext password: the hook intentionally does not provide it. A callback cannot make Account Protection cover users outside the package's earlier capability gate.

## Verification

Use dedicated accounts on a disposable staging site. Call `apply_filters( 'jetpack_account_protection_user_requires_protection', false, $admin )` with a test administrator and confirm the late policy callback returns `true`. Repeat with a test editor and confirm the callback preserves `false`. Then perform ordinary test logins for both accounts and confirm the callback causes no authentication error. Testing the leaked-password branch requires the package's mocked validation service; do not test with a real compromised password or production account.

## Source

[View the filter documentation and call site at the pinned Jetpack revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/account-protection/src/class-password-detection.php#L420-L429) The [surrounding method shows the capability and password checks](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/account-protection/src/class-password-detection.php#L407-L435).
