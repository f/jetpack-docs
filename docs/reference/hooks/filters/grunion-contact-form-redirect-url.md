---
title: "grunion_contact_form_redirect_url"
description: Filters the URL used after a Jetpack Form submission.
audience: developer
document_type: reference
sidebar_position: 35
sidebar_collapsed: true
product: forms
hook_name: grunion_contact_form_redirect_url
hook_type: filter
since: "1.9.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3334-L3345
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"grunion_contact_form_redirect_url callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$redirect","type":"string","required":true,"defaultValue":"","description":"proposed post-submission URL.","values":"","deprecated":false},{"name":"$id","type":"int","required":true,"defaultValue":"","description":"Contact Form ID.","values":"","deprecated":false},{"name":"$post_id","type":"int","required":true,"defaultValue":"","description":"ID of the post containing the form.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"grunion_contact_form_redirect_url.php","code":"function acme_forms_redirect( $redirect, $form_id, $post_id ) {\n\tif ( 42 !== (int) $form_id ) {\n\t\treturn $redirect;\n\t}\n\n\treturn home_url( '/thanks/' );\n}\nadd_filter( 'grunion_contact_form_redirect_url', 'acme_forms_redirect', 10, 3 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the grunion_contact_form_redirect_url contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for grunion_contact_form_redirect_url","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 1.9.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Forms applies this filter after it resolves the configured success redirect or builds the default return URL. Use it to replace the destination for a known form. The redirect is part of the visitor-facing submission response; it does not confirm storage, email, spam, or integration success.

## Callback signature

```php
function ( string $redirect, int $id, int $post_id ): string
```

## Parameters

- `$redirect` (`string`) — proposed post-submission URL.
- `$id` (`int`) — Contact Form ID.
- `$post_id` (`int`) — ID of the post containing the form.

## Return behavior

Return a valid URL string. Preserve `$redirect` when the callback does not own this form. Prefer a same-site HTTPS destination and never build it directly from untrusted submission fields.

## Since, deprecation, and replacement

Introduced in Jetpack 1.9.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Forms. Package: `automattic/jetpack-forms`. Source project: `projects/packages/forms`. Owner: Contact Form redirect selection.

## Example

```php
function acme_forms_redirect( $redirect, $form_id, $post_id ) {
	if ( 42 !== (int) $form_id ) {
		return $redirect;
	}

	return home_url( '/thanks/' );
}
add_filter( 'grunion_contact_form_redirect_url', 'acme_forms_redirect', 10, 3 );
```

## Compatibility and failure cautions

An invalid, off-site, cached, or looping URL can make a successful submission appear broken. Do not encode response values, email addresses, or tokens in the destination. The form ID can change when content is copied; verify the installed form rather than treating an example ID as portable. Other callbacks can run before or after yours, so preserve incoming URLs you do not own.

## Verification

On staging, update the example to a real synthetic form ID. Submit once while signed out and confirm the browser reaches `/thanks/` over HTTPS. Submit a different form and confirm its original redirect remains unchanged. Check the response record separately; reaching the page is not storage proof.

## Source

[View the documented filter and return site at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3334-L3345)
