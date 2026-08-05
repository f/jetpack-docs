---
title: Troubleshoot and support Jetpack Forms
description: Diagnose Forms block, validation, storage, notification, spam, redirect, and integration failures without exposing responses.
audience: site-user
document_type: troubleshooting
sidebar_position: 40
sidebar_collapsed: false
product: forms
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack Forms","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Can the editor load the form or synced-form reference and is at least one response destination enabled?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck the form reference, edit_pages access, collection settings, and administrator authority for outbound destinations.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eA Form Preview submission is labeled as a test and reaches each authorized destination exactly once.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Use a synthetic submission with a unique marker. Never ask a customer to repeat sensitive data while you are still determining whether the form, storage, email, or integration layer failed.

## Find the failing layer

| Symptom | Check |
| --- | --- |
| Form block is unavailable | Confirm the main Jetpack plugin and Contact Form feature are active, the editor has loaded without REST or JavaScript errors, and the current user can edit the post. |
| Synced form is missing or denied | Confirm the referenced `jetpack_form` entity still exists and the editor can read it. Do not replace the reference until you know whether the cause is deletion or permissions. |
| Submit button does nothing | Check browser console and network errors, required-field validation, JavaScript optimization, caching, and security rules. Retest on staging with unrelated plugins disabled. |
| Form says it is not collecting responses | Enable at least one intended destination: local storage, an email notification, or an authorized integration. Do not assume publishing a form automatically selects a destination. |
| Success appears but no response is visible | Confirm the central Responses dashboard, `edit_pages`, site membership, spam view, and the exact site on which the form was submitted. A Form Preview response should carry a Test marker. |
| Response exists but notification is missing | Treat storage and mail as separate outcomes. Verify the configured recipient, WordPress mail handoff, mail-provider logs, and spam filtering. Repeated form submissions are not a mail diagnostic. |
| Legitimate response is marked as spam | Preserve a sanitized identifier, review anti-spam configuration, and test a controlled non-sensitive response. Do not disable protection globally as the first step. |
| Redirect fails or loops | Remove custom redirect code, confirm the destination is valid HTTPS, and check caching and security redirects. Test while signed out. |
| CRM, webhook, Post to URL, Salesforce, or another integration fails | Confirm the base response was stored, then check integration activation and authorization. Outbound destinations may be omitted when the source author lacks the required administrator-level authority. |
| A spam response disappeared | Check whether it passed the dashboard's 15-day spam-retention window before treating it as unexpected deletion. Preserve only sanitized evidence. |

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
