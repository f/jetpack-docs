---
title: "jetpack_contact_form_forget_ip_address"
description: Filters whether Jetpack Forms removes a submitter IP address before storing or emailing the response.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
product: forms
hook_name: jetpack_contact_form_forget_ip_address
hook_type: filter
since: "0.33.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3069-L3083
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_contact_form_forget_ip_address callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$remove_ip_address","type":"bool","required":true,"defaultValue":"","description":"current decision; defaults to false.","values":"","deprecated":false},{"name":"$ip_address","type":"string","required":true,"defaultValue":"","description":"detected submission IP address. Treat it as personal data and do not log it.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_contact_form_forget_ip_address.php","code":"function acme_forget_form_ip_address( $remove_ip_address, $ip_address ) {\n\treturn true;\n}\nadd_filter( 'jetpack_contact_form_forget_ip_address', 'acme_forget_form_ip_address', 10, 2 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_contact_form_forget_ip_address contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_contact_form_forget_ip_address","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 0.33.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Forms applies this filter after it has assembled and sanitized submission values but before it saves the response and renders notification email. Returning `true` sets the detected IP address to `null` for storage and email. The address can still be used earlier for spam evaluation.

## Callback signature

```php
function ( bool $remove_ip_address, string $ip_address ): bool
```

## Parameters

- `$remove_ip_address` (`bool`) — current decision; defaults to `false`.
- `$ip_address` (`string`) — detected submission IP address. Treat it as personal data and do not log it.

## Return behavior

Return `true` to omit the IP address from the saved and emailed response, or preserve the incoming boolean. This filter does not disable all processing of the address and does not change other response metadata.

## Since, deprecation, and replacement

Introduced in version 0.33.0 of the Forms package. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Forms. Package: `automattic/jetpack-forms`. Source project: `projects/packages/forms`. Owner: Contact Form response persistence.

## Example

```php
function acme_forget_form_ip_address( $remove_ip_address, $ip_address ) {
	return true;
}
add_filter( 'jetpack_contact_form_forget_ip_address', 'acme_forget_form_ip_address', 10, 2 );
```

## Compatibility and failure cautions

The hook is a data-minimization control, not a complete privacy policy. Spam evaluation can still receive the address before this filter, and integrations can collect their own request or visitor data. Always return a boolean. Do not copy `$ip_address` into custom metadata, logs, analytics, or notification text after asking Forms to forget it.

## Verification

Use a disposable Form Preview response. Confirm the saved response and notification omit the address while the rest of the response remains usable. Verify spam checking still follows its configured path. Remove the test response and inspect no logs or custom metadata for the address.

## Source

[View the filter documentation and null assignment at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3069-L3083)
