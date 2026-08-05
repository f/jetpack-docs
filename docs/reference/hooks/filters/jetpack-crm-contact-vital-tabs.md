---
title: "jetpack-crm-contact-vital-tabs"
description: Filters the custom tab definitions rendered in a Jetpack CRM contact's Vitals panel.
audience: developer
document_type: reference
sidebar_position: 140
sidebar_collapsed: true
product: crm
hook_name: jetpack-crm-contact-vital-tabs
hook_type: filter
since: "Not annotated"
deprecated: false
source_url: https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/contact/view.page.php#L323
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack-crm-contact-vital-tabs callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$tabs","type":"array\u003cint, array\u003cstring, mixed\u003e\u003e","required":true,"defaultValue":"","description":"tab definitions returned by earlier callbacks.","values":"","deprecated":false},{"name":"$contact_id","type":"int","required":true,"defaultValue":"","description":"ID of the contact whose Vitals panel is being rendered.","values":"","deprecated":false},{"name":"$contact","type":"array\u003cstring, mixed\u003e","required":true,"defaultValue":"","description":"the current CRM contact record; treat its values as sensitive.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack-crm-contact-vital-tabs.php","code":"\u003c?php\n/**\n * Plugin Name: Acme CRM contact summary tab\n */\n\nfunction acme_crm_contact_vital_tabs( $tabs, $contact_id, $contact ) {\n\tif ( ! is_array( $tabs ) ) {\n\t\t$tabs = array();\n\t}\n\n\t$tabs[] = array(\n\t\t'id'            =\u003e 'acme-contact-summary',\n\t\t'name'          =\u003e __( 'Integration summary', 'acme-crm-extension' ),\n\t\t'contentaction' =\u003e 'acme_render_crm_contact_summary',\n\t);\n\n\treturn $tabs;\n}\nadd_filter( 'jetpack-crm-contact-vital-tabs', 'acme_crm_contact_vital_tabs', 10, 3 );\n\nfunction acme_render_crm_contact_summary( $contact_id, $contact ) {\n\tif ( ! current_user_can( 'manage_options' ) ) {\n\t\techo esc_html__( 'This summary is not available.', 'acme-crm-extension' );\n\t\treturn;\n\t}\n\n\tprintf(\n\t\t'\u003cp\u003e%s\u003c/p\u003e',\n\t\tesc_html(\n\t\t\tsprintf(\n\t\t\t\t/* translators: %d is a CRM contact ID. */\n\t\t\t\t__( 'Contact ID: %d', 'acme-crm-extension' ),\n\t\t\t\tabsint( $contact_id )\n\t\t\t)\n\t\t)\n\t);\n}","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack-crm-contact-vital-tabs contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack-crm-contact-vital-tabs","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: Not annotated · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack CRM applies this filter while rendering the administrator-facing Vitals panel for one contact. Each returned tab becomes a menu item and a matching content segment. A tab can provide a `contentaction` callable, which CRM invokes with the contact ID and contact record, or a `content` string, which CRM prints directly.

This is a filter despite its UI-extension purpose: callbacks must return the accumulated array. The default value is an empty array.

## Callback signature

```php
function ( array $tabs, int $contact_id, array $contact ): array
```

Register with three accepted arguments:

```php
add_filter( 'jetpack-crm-contact-vital-tabs', 'acme_crm_contact_vital_tabs', 10, 3 );
```

## Parameters

- `$tabs` (`array<int, array<string, mixed>>`) — tab definitions returned by earlier callbacks.
- `$contact_id` (`int`) — ID of the contact whose Vitals panel is being rendered.
- `$contact` (`array<string, mixed>`) — the current CRM contact record; treat its values as sensitive.

Each appended tab should use a unique `id`, a human-readable `name`, and either a callable `contentaction` or a safely constructed `content` value.

## Return behavior

Return the complete tab array, including every earlier entry. Returning a non-array removes all custom tabs because the renderer ignores it. CRM escapes the tab `id` and `name` when building the menu, but it directly invokes `contentaction` and directly prints `content`. The extension owns authorization and output escaping for the tab body.

## Since, deprecation, and replacement

The pinned call site has no `@since` annotation, so this page does not invent an introduction version. The hook is present in the earliest history imported into the current public CRM repository, whose plugin header was `5.5.2-alpha`; that establishes availability by that version, not the exact version in which it was introduced. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack CRM. Source repository: `Automattic/jetpack-crm`, outside the Jetpack monorepo. Owner: the contact administrator view in `admin/contact/view.page.php`.

## Example

This companion plugin adds a tab whose callable prints only a non-sensitive identifier. It checks a capability and escapes all output:

```php
<?php
/**
 * Plugin Name: Acme CRM contact summary tab
 */

function acme_crm_contact_vital_tabs( $tabs, $contact_id, $contact ) {
	if ( ! is_array( $tabs ) ) {
		$tabs = array();
	}

	$tabs[] = array(
		'id'            => 'acme-contact-summary',
		'name'          => __( 'Integration summary', 'acme-crm-extension' ),
		'contentaction' => 'acme_render_crm_contact_summary',
	);

	return $tabs;
}
add_filter( 'jetpack-crm-contact-vital-tabs', 'acme_crm_contact_vital_tabs', 10, 3 );

function acme_render_crm_contact_summary( $contact_id, $contact ) {
	if ( ! current_user_can( 'manage_options' ) ) {
		echo esc_html__( 'This summary is not available.', 'acme-crm-extension' );
		return;
	}

	printf(
		'<p>%s</p>',
		esc_html(
			sprintf(
				/* translators: %d is a CRM contact ID. */
				__( 'Contact ID: %d', 'acme-crm-extension' ),
				absint( $contact_id )
			)
		)
	);
}
```

## Compatibility and failure cautions

Contact records can contain names, addresses, email addresses, phone numbers, and commercial history. Do not log the `$contact` array or render a field without an explicit business need, authorization check, and context-appropriate escaping. Use a globally unique tab ID and a callable that is available when the page renders. An invalid callable, thrown exception, fatal error, or slow remote request can break or delay the CRM administrator screen. Prefer `contentaction` so output is escaped at render time; `content` is echoed without additional sanitization.

## Verification

Install the example on a disposable CRM site with synthetic data. Open one contact as an administrator and confirm exactly one `Integration summary` tab appears, switches to the matching panel, and shows only the numeric contact ID. Open a different contact and confirm its ID changes. Test a CRM role without `manage_options` and verify the body is denied without exposing contact data. Disable the companion plugin and confirm the core Vitals panel and other extensions' tabs remain unchanged.

## Source

[View the filter application and tab-menu rendering at the pinned CRM revision.](https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/contact/view.page.php#L322-L355)

[View how CRM invokes contentaction or prints content for each returned tab.](https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/contact/view.page.php#L572-L595)
