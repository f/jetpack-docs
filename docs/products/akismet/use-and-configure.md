---
title: "Use and configure Akismet Anti-spam"
description: "Connect Akismet, verify form coverage, moderate classifications, and handle submission data responsibly."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "akismet"
last_reviewed: "2026-08-05"
---

Akismet is externally owned and its public plugin source is in [WordPress.org SVN](https://plugins.svn.wordpress.org/akismet/), not in Jetpack's `projects/plugins` tree. Follow [Akismet Support](https://akismet.com/support/) when its current UI differs from this workflow.

## Activate the service

Install and activate **Akismet Anti-spam**. Open its settings, enter or obtain the API key through the authorized account flow, and confirm that the plugin reports a working connection. A key is a credential: store it in the plugin's server-side configuration, limit who can view settings, and never paste it into a public diagnostic report.

Review the plugin's privacy-related options and explanatory text. Akismet checks need request and submission context to classify spam. Your privacy notice should accurately describe which public forms are checked, what data is sent, why it is sent, and how long the site retains moderation records.

## Verify each input surface

WordPress comments are the standard integration. Contact, registration, review, and other forms are covered only when the responsible plugin explicitly integrates with Akismet or custom code uses the published API.

For each form:

1. Identify the integration owner and its documentation.
2. Submit a normal staging entry and confirm it reaches the expected inbox or moderation queue.
3. Submit the integration's documented spam test, if one exists.
4. Confirm the spam result can be reviewed and recovered.
5. Verify network failure does not silently destroy a legitimate submission.

Do not test with real personal data. Never assume that activating Akismet automatically protects every form on the site.

## Moderate and improve decisions

Review the spam queue, especially after adding a form or changing traffic sources. Mark missed spam as spam and restore false positives as not spam; those actions provide feedback through supported integrations. Inspect repeated false positives for missing request metadata, proxy configuration that hides the visitor IP, or a form plugin that sends field names incorrectly.

Akismet is one layer. Keep rate limiting, nonces or equivalent CSRF protection, validation, authorization, and abuse monitoring appropriate to the form.

For API-based integrations, read [Extend, hooks, and APIs](/docs/products/akismet/extend-hooks-and-apis/). For key, connectivity, or classification problems, use [Troubleshoot and support](/docs/products/akismet/troubleshoot-and-support/).
