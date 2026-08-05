---
title: Use and configure Jetpack Forms
description: Create a Jetpack form, configure its fields and response path, and verify storage, notification, privacy, and access behavior.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: forms
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Design the form first

Define the form's purpose, who will respond, who can read responses, and when the data should be deleted. Do not collect a phone number, address, account identifier, or free-form sensitive content merely because a field is available.

For each field, decide:

- Whether it is required for the stated purpose.
- The expected format and validation message.
- Whether it can safely appear in an email notification.
- Which administrator role should be able to view it.
- Whether an anti-spam or third-party integration will receive it.

## Build and configure

1. Open a page or post in the block editor and add the **Form** block or an appropriate form variation.
2. Add, remove, and order fields. Give every field a visible, specific label; do not rely on placeholder text as the only instruction.
3. Configure the submit button and the success behavior. If the form redirects, use a same-site HTTPS destination you control and test it while signed out.
4. Set the notification recipient and subject according to your organization's access rules. Avoid distributing response data to broad mailing lists.
5. Configure only the integrations the workflow requires. Review each integration's data destination and authorization before enabling it.
6. Publish to a staging or private page before exposing the form publicly.

Current editor controls can change. Follow the [Contact Form block support guide](https://jetpack.com/support/jetpack-blocks/contact-form/) for the installed version's UI.

## Verify a submission

Submit a unique, non-sensitive test value in a signed-out browser session, then verify each layer separately:

1. The browser shows the intended success message or redirect once.
2. Validation rejects an intentionally invalid required field with an understandable message.
3. The response appears once in the Forms or Feedback area for an authorized administrator.
4. The notification arrives at the configured destination and does not expose unintended fields.
5. Enabled anti-spam and integrations report the expected result.
6. A user without response-management permission cannot read the submission.

Repeat the test on a narrow viewport and with keyboard-only navigation. If the form accepts uploads, verify type, size, storage, and download permissions with harmless test files.

## Operate safely

- Review response access and retention regularly.
- Export data only to an approved location; delete temporary exports when the task is complete.
- Treat email as a notification channel, not necessarily a secure record system.
- Re-test after changing caching, anti-spam, JavaScript optimization, mail delivery, or a connected integration.
- Keep a documented fallback for urgent contact if the form depends on a service that can be unavailable.

If a test fails, do not submit real customer data repeatedly. Move to [Forms troubleshooting](/docs/products/forms/troubleshoot-and-support/) and isolate storage, email, anti-spam, redirect, and integration behavior as separate outcomes.
