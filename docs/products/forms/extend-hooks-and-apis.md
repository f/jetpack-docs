---
title: Extend Jetpack Forms, hooks, and APIs
description: Customize Forms through verified WordPress hooks and supported block or integration surfaces without bypassing validation and permissions.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: forms
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack Forms has local PHP hooks, WordPress blocks, and supported integrations. Choose the surface closest to the required behavior and preserve the package's submission validation, spam checks, permissions, and response lifecycle.

## Run code after a response is stored

The `grunion_after_feedback_post_inserted` action fires after the feedback post has been inserted. At the pinned revision it receives the feedback post ID, form fields, spam result, and normalized entry values. Review the [immutable source contract](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms/src/contact-form/class-contact-form.php#L3109-L3117) before registering a callback.

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
		wp_schedule_single_event( time() + 5, 'acme_process_form_response', $args );
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

The `grunion_contact_form_redirect_url` filter receives the proposed URL, form ID, and containing post ID. It must return a URL string. Its [pinned definition](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms/src/contact-form/class-contact-form.php#L3337-L3345) is the compatibility evidence for this revision.

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

## Other extension boundaries

- Use WordPress block registration and editor APIs around the documented Jetpack form and field blocks. Do not import private symbols from compiled editor bundles.
- Use the package's supported integration UI for CRM, email, webhook, and anti-spam destinations. Do not write directly to another plugin's tables.
- Treat Forms REST routes as authenticated application interfaces. Check the current controller schema and permissions in the pinned source before calling one; do not infer a public API from a network trace.
- Consult the [hooks policy and index](/docs/reference/hooks/) before relying on another Forms hook. Its name alone does not define parameter stability or security requirements.

Test extensions with valid, invalid, spam, duplicate, and unauthorized submissions. An after-storage callback must skip or contain failed dependent work while preserving Forms' own storage and response path; fail closed only for authorization or other security decisions.
