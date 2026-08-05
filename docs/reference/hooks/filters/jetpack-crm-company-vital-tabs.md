---
title: "jetpack-crm-company-vital-tabs"
description: Filters the custom tab definitions rendered in a Jetpack CRM company's Vitals panel.
audience: developer
document_type: reference
sidebar_position: 150
sidebar_collapsed: true
product: crm
hook_name: jetpack-crm-company-vital-tabs
hook_type: filter
since: "Not annotated"
deprecated: false
source_url: https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/company/view.page.php#L202
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack-crm-company-vital-tabs callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"$tabs","type":"array\u003cint, array\u003cstring, mixed\u003e\u003e","required":true,"defaultValue":"","description":"tab definitions returned by earlier callbacks.","values":"","deprecated":false},{"name":"$company_id","type":"int","required":true,"defaultValue":"","description":"ID of the company whose Vitals panel is being rendered.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack-crm-company-vital-tabs.php","code":"\u003c?php\n/**\n * Plugin Name: Acme CRM company summary tab\n */\n\nfunction acme_crm_company_vital_tabs( $tabs, $company_id ) {\n\tif ( ! is_array( $tabs ) ) {\n\t\t$tabs = array();\n\t}\n\n\t$tabs[] = array(\n\t\t'id'            =\u003e 'acme-company-summary',\n\t\t'name'          =\u003e __( 'Integration summary', 'acme-crm-extension' ),\n\t\t'contentaction' =\u003e 'acme_render_crm_company_summary',\n\t);\n\n\treturn $tabs;\n}\nadd_filter( 'jetpack-crm-company-vital-tabs', 'acme_crm_company_vital_tabs', 10, 2 );\n\nfunction acme_render_crm_company_summary( $company_id ) {\n\tif ( ! current_user_can( 'manage_options' ) ) {\n\t\techo esc_html__( 'This summary is not available.', 'acme-crm-extension' );\n\t\treturn;\n\t}\n\n\tprintf(\n\t\t'\u003cp\u003e%s\u003c/p\u003e',\n\t\tesc_html(\n\t\t\tsprintf(\n\t\t\t\t/* translators: %d is a CRM company ID. */\n\t\t\t\t__( 'Company ID: %d', 'acme-crm-extension' ),\n\t\t\t\tabsint( $company_id )\n\t\t\t)\n\t\t)\n\t);\n}","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack-crm-company-vital-tabs contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack-crm-company-vital-tabs","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: Not annotated · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack CRM applies this filter while rendering the administrator-facing Vitals panel for one company. Each returned definition becomes a tab menu item and a matching content segment. A definition can supply a `contentaction` callable, which CRM invokes with the company ID, or a `content` string, which CRM prints directly.

This is a filter, not an action. Its default value is an empty array, and every callback must return the accumulated definitions.

## Callback signature

```php
function ( array $tabs, int $company_id ): array
```

Register with two accepted arguments:

```php
add_filter( 'jetpack-crm-company-vital-tabs', 'acme_crm_company_vital_tabs', 10, 2 );
```

## Parameters

- `$tabs` (`array<int, array<string, mixed>>`) — tab definitions returned by earlier callbacks.
- `$company_id` (`int`) — ID of the company whose Vitals panel is being rendered.

Each appended definition should use a unique `id`, a human-readable `name`, and either a callable `contentaction` or a safely constructed `content` value.

## Return behavior

Return the complete tab array, including every earlier entry. Returning a non-array suppresses all custom tabs because the renderer ignores it. CRM escapes `id` and `name` for the menu, but it directly invokes `contentaction` and directly prints `content`. The extension owns authorization and escaping for tab-body output.

## Since, deprecation, and replacement

The pinned call site has no `@since` annotation, so this page does not claim an exact introduction version. The hook is present in the earliest history imported into the current public CRM repository, whose plugin header was `5.5.2-alpha`; that is a lower bound, not an introduction claim. It is not deprecated and has no replacement at the pinned revision.

## Ownership

Product: Jetpack CRM. Source repository: `Automattic/jetpack-crm`, outside the Jetpack monorepo. Owner: the company administrator view in `admin/company/view.page.php`.

## Example

This companion plugin adds a capability-checked tab that prints only the numeric company ID:

```php
<?php
/**
 * Plugin Name: Acme CRM company summary tab
 */

function acme_crm_company_vital_tabs( $tabs, $company_id ) {
	if ( ! is_array( $tabs ) ) {
		$tabs = array();
	}

	$tabs[] = array(
		'id'            => 'acme-company-summary',
		'name'          => __( 'Integration summary', 'acme-crm-extension' ),
		'contentaction' => 'acme_render_crm_company_summary',
	);

	return $tabs;
}
add_filter( 'jetpack-crm-company-vital-tabs', 'acme_crm_company_vital_tabs', 10, 2 );

function acme_render_crm_company_summary( $company_id ) {
	if ( ! current_user_can( 'manage_options' ) ) {
		echo esc_html__( 'This summary is not available.', 'acme-crm-extension' );
		return;
	}

	printf(
		'<p>%s</p>',
		esc_html(
			sprintf(
				/* translators: %d is a CRM company ID. */
				__( 'Company ID: %d', 'acme-crm-extension' ),
				absint( $company_id )
			)
		)
	);
}
```

## Compatibility and failure cautions

Use the executable hook name `jetpack-crm-company-vital-tabs`. The older public example name `zbs-company-vital-tabs` is stale, and adjacent comments in the pinned company view incorrectly mention the contact hook; neither text changes the filter CRM actually applies. Use a unique tab ID and a callable that exists at render time. An invalid callable, fatal error, thrown exception, or remote request can break or delay the CRM screen. Company records are business data, so enforce authorization and escape every value. Prefer `contentaction` because a `content` value is echoed without additional sanitization.

## Verification

Install the example on a disposable CRM site with synthetic companies. Open two company records as an administrator and confirm exactly one `Integration summary` tab appears with the correct ID for each record. Test a CRM role without `manage_options` and confirm the body is denied without leaking company data. Disable the companion plugin and verify the core Vitals panel and other extensions' tabs remain unchanged. If testing an older snippet, search it for `zbs-company-vital-tabs` and replace that stale name before interpreting a missing tab as a CRM defect.

## Source

[View the exact company filter application and menu rendering at the pinned CRM revision.](https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/company/view.page.php#L201-L232)

[View how CRM invokes contentaction or prints content for each company tab.](https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/admin/company/view.page.php#L423-L445)
