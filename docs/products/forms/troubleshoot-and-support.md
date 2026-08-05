---
title: Troubleshoot and support Jetpack Forms
description: Diagnose Forms block, validation, storage, notification, spam, redirect, and integration failures without exposing responses.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: forms
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Use a synthetic submission with a unique marker. Never ask a customer to repeat sensitive data while you are still determining whether the form, storage, email, or integration layer failed.

## Find the failing layer

| Symptom | Check |
| --- | --- |
| Form block is unavailable | Confirm the main Jetpack plugin and Contact Form feature are active, the editor has loaded without REST or JavaScript errors, and the current user can edit the post. |
| Submit button does nothing | Check browser console and network errors, required-field validation, JavaScript optimization, caching, and security rules. Retest on staging with unrelated plugins disabled. |
| Success appears but no response is visible | Confirm the response-management screen, user capability, spam view, and the exact site on which the form was submitted. Check PHP errors around the submission time. |
| Response exists but notification is missing | Treat storage and mail as separate outcomes. Verify the configured recipient, WordPress mail handoff, mail-provider logs, and spam filtering. Repeated form submissions are not a mail diagnostic. |
| Legitimate response is marked as spam | Preserve a sanitized identifier, review anti-spam configuration, and test a controlled non-sensitive response. Do not disable protection globally as the first step. |
| Redirect fails or loops | Remove custom redirect code, confirm the destination is valid HTTPS, and check caching and security redirects. Test while signed out. |
| CRM, webhook, or another integration fails | Confirm the base response was stored, then check that integration's activation, authorization, endpoint, and logs independently. |

## Safe diagnostic record

Collect the WordPress, PHP, Jetpack, theme, and related integration versions; form page URL; timestamp with timezone; user role; and whether storage, notification, spam, and redirect each succeeded. Redact field values, email addresses, IP addresses, upload URLs, nonces, JWTs, webhook secrets, and request bodies.

On staging, reproduce with a minimal form containing one text field and one submit button. If that works, add the original fields and integrations one at a time. This distinguishes a package regression from a specific field, theme, optimization, or remote destination.

## Recover safely

- Disable only the failing integration before disabling Forms itself.
- Preserve response records and retention obligations before rolling back or deleting anything.
- Restore known-good form markup from revision history if an editor change corrupted the layout.
- Re-test both signed-out submission and administrator access after an update or rollback.

## Get help

Use the current [Jetpack Contact Form documentation](https://jetpack.com/support/jetpack-blocks/contact-form/) and [Jetpack support](https://jetpack.com/contact-support/) for setup, delivery, account, and site-specific issues. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) only for reproducible public-source defects with sanitized steps. Report a suspected authorization or data-exposure vulnerability through [Automattic Security](https://automattic.com/security/).
