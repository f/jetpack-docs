---
title: Understand data, privacy, and consent
description: Review data flows and permissions before enabling a connected Jetpack capability.
audience: site-user
document_type: reference
sidebar_position: 60
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Connected features may process site, account, visitor, content, request, or diagnostic data. The exact flow depends on the product and configuration.

Before enabling a feature:

- Identify the data collected, its purpose, and where it is processed.
- Confirm who can view, export, change, or delete it.
- Review retention, deletion, and account-disconnection behavior.
- Update consent and privacy notices when required for the site's audience and jurisdiction.
- Use synthetic content for tests, screenshots, bug reports, and agent prompts.
- Treat tokens, form submissions, private posts, logs, and complete request payloads as sensitive.

Do not infer a data contract from browser requests or database tables alone. Use the product's canonical privacy material and [privacy reference](/docs/reference/privacy-and-data-boundaries/), and re-check claims when product behavior or legal requirements change.
