---
title: Use and configure Jetpack Forms
description: Create a Jetpack form, configure its fields and response path, and verify storage, notification, privacy, and access behavior.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: forms
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Choose the form model","content":"\u003cp\u003eSelect a form variation and decide whether it should be local to a post or a synced reusable form.\u003c/p\u003e"},{"title":"Choose response destinations","content":"\u003cp\u003eConfigure local storage, notifications, and only the integrations or webhooks the site is authorized to use.\u003c/p\u003e"},{"title":"Submit from Form Preview","content":"\u003cp\u003eUse a synthetic test response, confirm its Test status, permissions, and every configured destination.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eResponses can include submitted fields plus request metadata such as IP address, browser, country, and source. Apply least privilege, retention rules, and the documented IP-forgetting filter where required.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Design the form first

Define the form's purpose, who will respond, who can read responses, and when the data should be deleted. Do not collect a phone number, address, account identifier, or free-form sensitive content merely because a field is available.

For each field, decide:

- Whether it is required for the stated purpose.
- The expected format and validation message.
- Whether it can safely appear in an email notification.
- Which administrator role should be able to view it.
- Whether an anti-spam or third-party integration will receive it.

## Build and configure

1. Open a page or post in the block editor and add the **Form** block or a Contact, RSVP, Registration, Appointment, Feedback, Multistep, or Lead Capture variation.
2. Add, remove, and order fields. Give every field a visible, specific label; do not rely on placeholder text as the only instruction.
3. Decide whether the form is local to this post or synced for reuse. A synced form stores a `ref` to a `jetpack_form` entity instead of copying its inner blocks into every post; changing that entity can affect every reference.
4. Configure the submit button and success behavior. If the form redirects, use a same-site HTTPS destination you control and test it while signed out.
5. Choose response destinations independently: local response storage, email notifications, and only the integrations or webhooks the workflow requires. Review each external destination and authorization before enabling it.
6. Publish to a staging or private page before exposing the form publicly.

Current editor controls can change. Follow the [Contact Form block support guide](https://jetpack.com/support/jetpack-blocks/contact-form/) for the installed version's UI.

## Verify a submission

Prefer a unique, non-sensitive submission from the built-in Form Preview. Preview submissions carry a **Test** marker and are excluded from the default CSV export. Then verify each layer separately:

1. The browser shows the intended success message or redirect once.
2. Validation rejects an intentionally invalid required field with an understandable message.
3. The response appears once in the central Responses dashboard with its Test marker. Viewing requires the site's response-management permission boundary, including `edit_pages` and site membership; deletion requires `delete_others_pages`.
4. The notification arrives at the configured destination and does not expose unintended fields.
5. Enabled anti-spam and integrations report the expected result.
6. A user without response-management permission cannot read the submission.

Repeat the test on a narrow viewport and with keyboard-only navigation. If the form accepts uploads, verify type, size, storage, and download permissions with harmless test files.

Stored or emailed response context can include form fields, IP address, user agent or browser, country, and source metadata. The `jetpack_contact_form_forget_ip_address` filter can remove the IP address before database storage and email while still permitting its use for spam evaluation. Apply that contract only after reviewing the site's privacy needs.

## Operate safely

- Review response access and retention regularly.
- Export data only to an approved location; delete temporary exports when the task is complete.
- Treat email as a notification channel, not necessarily a secure record system.
- Re-test after changing caching, anti-spam, JavaScript optimization, mail delivery, or a connected integration.
- Keep a documented fallback for urgent contact if the form depends on a service that can be unavailable.

If a test fails, do not submit real customer data repeatedly. Move to [Forms troubleshooting](/docs/products/forms/troubleshoot-and-support/) and isolate storage, email, anti-spam, redirect, and integration behavior as separate outcomes.
