---
title: Extend Jetpack Forms, hooks, and APIs
description: Customize Forms through verified WordPress hooks and supported block or integration surfaces without bypassing validation and permissions.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: forms
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Forms extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Forms hooks","type":"object","required":false,"defaultValue":"","description":"Use the documented post-insert, redirect, and IP-forgetting contracts.","values":"","deprecated":false},{"name":"WordPress Abilities","type":"object","required":false,"defaultValue":"","description":"Use the eight Forms abilities for validated form and response operations when available.","values":"","deprecated":false},{"name":"Blocks and integrations","type":"object","required":false,"defaultValue":"","description":"Use synced-form entities, registered block attributes, and product-owned integrations rather than private tables.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Forms has local PHP hooks, WordPress blocks, and supported integrations. Choose the surface closest to the required behavior and preserve the package's submission validation, spam checks, permissions, and response lifecycle.

## Run code after a response is stored

The [grunion_after_feedback_post_inserted action](/docs/reference/hooks/actions/grunion-after-feedback-post-inserted/) fires after the feedback post has been inserted. At the pinned revision it receives the feedback post ID, form fields, spam result, and normalized entry values. It runs synchronously before notification rendering, so a blocking callback or uncaught error can interrupt later Forms behavior.

```php
/**
 * Queue a local, non-blocking follow-up after a Forms response is stored.
 *
 * @param int   $feedback_id Feedback post ID.
 * @param array $fields      Form field objects.
 * @param bool  $is_spam     Whether the submission was classified as spam.
 * @param array $values      Normalized entry values.
 */
function acme_after_jetpack_form( $feedback_id, $fields, $is_spam, $values ) {
	if ( $is_spam || ! $feedback_id ) {
		return;
	}

	$args = array( (int) $feedback_id );
	if ( ! wp_next_scheduled( 'acme_process_form_response', $args ) ) {
		$scheduled = wp_schedule_single_event( time() + 5, 'acme_process_form_response', $args, true );
		if ( is_wp_error( $scheduled ) || ! $scheduled ) {
			// Record a sanitized local failure without logging the response values.
			return;
		}
	}
}
add_action( 'grunion_after_feedback_post_inserted', 'acme_after_jetpack_form', 10, 4 );

/**
 * Process the stored response outside the visitor's request.
 *
 * @param int $feedback_id Feedback post ID.
 */
function acme_process_form_response( $feedback_id ) {
	$feedback = get_post( (int) $feedback_id );
	if ( ! $feedback || 'feedback' !== $feedback->post_type ) {
		return;
	}

	// Replace this marker with bounded, retry-safe local work.
	update_post_meta( $feedback->ID, '_acme_processed_at', time() );
}
add_action( 'acme_process_form_response', 'acme_process_form_response', 10, 1 );
```

The example queues work instead of making the visitor wait for a remote request. Load the stored response later with normal capability and privacy controls; do not log the `$values` array.

## Change the post-submit redirect

The [grunion_contact_form_redirect_url filter](/docs/reference/hooks/filters/grunion-contact-form-redirect-url/) receives the proposed URL, form ID, and containing post ID. It must return a URL string. Its pinned definition is the compatibility evidence for this revision.

```php
function acme_forms_redirect( $redirect, $form_id, $post_id ) {
	if ( 42 !== (int) $form_id ) {
		return $redirect;
	}

	return home_url( '/thanks/' );
}
add_filter( 'grunion_contact_form_redirect_url', 'acme_forms_redirect', 10, 3 );
```

Return a same-site HTTPS URL unless the workflow has an explicit, reviewed reason to leave the site. Never build a redirect directly from untrusted form input.

## Remove saved and emailed IP addresses

The [jetpack_contact_form_forget_ip_address filter](/docs/reference/hooks/filters/jetpack-contact-form-forget-ip-address/) receives the default `false` value and the detected submission IP address. Return `true` to remove the address before storage and email. Forms can still use the address during spam evaluation, so this is a storage and notification contract rather than a promise that no processing occurs.

## WordPress Abilities and agents

Forms registers eight abilities for form CRUD and response listing, retrieval, update, deletion, and spam handling. The implementation delegates to the owning REST controllers so validation and permission checks stay aligned. Prefer these declared abilities for agents and MCP-enabled integrations; do not infer a stable third-party API from private dashboard network traffic.

## Other extension boundaries

- Use WordPress block registration and editor APIs around the documented Jetpack form and field blocks. Do not import private symbols from compiled editor bundles.
- Use the package's supported integration UI for CRM, email, webhook, and anti-spam destinations. Do not write directly to another plugin's tables.
- Treat Forms REST routes as authenticated application interfaces. Use the declared Abilities surface for agent operations, and do not infer a public API from a network trace.
- Consult the [hooks policy and index](/docs/reference/hooks/) before relying on another Forms hook. Its name alone does not define parameter stability or security requirements.

Test extensions with valid, invalid, spam, duplicate, and unauthorized submissions. An after-storage callback must skip or contain failed dependent work while preserving Forms' own storage and response path; fail closed only for authorization or other security decisions.
