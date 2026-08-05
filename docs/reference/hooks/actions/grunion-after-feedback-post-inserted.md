---
title: "grunion_after_feedback_post_inserted"
description: Runs after Jetpack Forms saves a response and before it finishes notification rendering and delivery work.
audience: developer
document_type: reference
sidebar_position: 30
sidebar_collapsed: true
product: forms
hook_name: grunion_after_feedback_post_inserted
hook_type: action
since: "8.6.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3105-L3117
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"grunion_after_feedback_post_inserted callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"$post_id","type":"int","required":true,"defaultValue":"","description":"ID of the saved feedback post. Check it before scheduling work.","values":"","deprecated":false},{"name":"$fields","type":"array","required":true,"defaultValue":"","description":"form field objects for this submission.","values":"","deprecated":false},{"name":"$is_spam","type":"bool","required":true,"defaultValue":"","description":"whether Forms classified the response as spam.","values":"","deprecated":false},{"name":"$entry_values","type":"array","required":true,"defaultValue":"","description":"normalized response entry values. Treat them as sensitive.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"grunion_after_feedback_post_inserted.php","code":"function acme_queue_form_response( $post_id, $fields, $is_spam, $entry_values ) {\n\tif ( $is_spam || ! $post_id ) {\n\t\treturn;\n\t}\n\n\t$args = array( (int) $post_id );\n\tif ( wp_next_scheduled( 'acme_process_form_response', $args ) ) {\n\t\treturn;\n\t}\n\n\t$scheduled = wp_schedule_single_event( time() + 5, 'acme_process_form_response', $args, true );\n\tif ( is_wp_error( $scheduled ) || ! $scheduled ) {\n\t\t// Record a sanitized local failure without logging form values.\n\t\treturn;\n\t}\n}\nadd_action( 'grunion_after_feedback_post_inserted', 'acme_queue_form_response', 10, 4 );","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the grunion_after_feedback_post_inserted contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for grunion_after_feedback_post_inserted","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 8.6.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

Jetpack Forms fires this action synchronously after it saves the `feedback` post, its extra fields, unread count, and any Akismet values. Notification rendering and later submission work continue after callbacks return. Use it to hand bounded local follow-up work to a queue; do not make the visitor wait for a remote integration.

## Callback signature

```php
function ( int $post_id, array $fields, bool $is_spam, array $entry_values ): void
```

Register with four accepted arguments:

```php
add_action( 'grunion_after_feedback_post_inserted', 'acme_queue_form_response', 10, 4 );
```

## Parameters

- `$post_id` (`int`) — ID of the saved `feedback` post. Check it before scheduling work.
- `$fields` (`array`) — form field objects for this submission.
- `$is_spam` (`bool`) — whether Forms classified the response as spam.
- `$entry_values` (`array`) — normalized response entry values. Treat them as sensitive.

## Return behavior

This is an action. No callback return value is consumed.

## Since, deprecation, and replacement

Introduced in Jetpack 8.6.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack Forms. Package: `automattic/jetpack-forms`. Source project: `projects/packages/forms`. Owner: Contact Form submission processing.

## Example

This companion-plugin example schedules local work without copying response values into the cron arguments:

```php
function acme_queue_form_response( $post_id, $fields, $is_spam, $entry_values ) {
	if ( $is_spam || ! $post_id ) {
		return;
	}

	$args = array( (int) $post_id );
	if ( wp_next_scheduled( 'acme_process_form_response', $args ) ) {
		return;
	}

	$scheduled = wp_schedule_single_event( time() + 5, 'acme_process_form_response', $args, true );
	if ( is_wp_error( $scheduled ) || ! $scheduled ) {
		// Record a sanitized local failure without logging form values.
		return;
	}
}
add_action( 'grunion_after_feedback_post_inserted', 'acme_queue_form_response', 10, 4 );
```

Register `acme_process_form_response` separately and enforce the capability, retention, consent, retry, and idempotency rules for the intended integration.

## Compatibility and failure cautions

Callbacks run in the visitor's request and before Forms completes later notification work. A slow callback, fatal error, or thrown exception can interrupt the submission path even though the response post exists. Do not log `$fields` or `$entry_values`, send them as cron arguments, or treat `$post_id` as proof that notification or an external integration succeeded. Spam responses still reach the hook; decide explicitly whether to ignore them.

## Verification

Submit a unique synthetic Form Preview response. Confirm exactly one `feedback` post exists, then run `wp cron event list --hook=acme_process_form_response` and verify one event contains only its post ID. Confirm spam input does not schedule the event and that a queue failure does not expose form values.

## Source

[View the documented action and its position before email rendering at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form.php#L3105-L3130)
