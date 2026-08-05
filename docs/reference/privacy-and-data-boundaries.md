---
title: Privacy and data boundaries
description: Identify local, connected-service, user, and diagnostic data boundaries in Jetpack integrations.
audience: developer
document_type: reference
sidebar_position: 100
sidebar_collapsed: true
---

Jetpack combines local WordPress processing with optional connected services. Document the boundary for each feature rather than applying one statement to the entire product family.

| Boundary | Questions to answer |
| --- | --- |
| Local site | Which posts, options, users, files, and logs are read or written? |
| Connected service | Which fields leave the site, for what purpose, and under which account or site identity? |
| Third-party integration | Which independent recipient receives data, and who configures it? |
| Browser/editor | Which values are exposed to JavaScript, markup, cookies, or analytics? |
| Support diagnostics | Can the report omit secrets and personal content while remaining useful? |

Use data minimization, clear purpose, least privilege, bounded retention, and appropriate export/erasure behavior. Connection tokens, signing secrets, REST nonces, form submissions, IP addresses, email addresses, private post content, and backup material require special care.

A public hook that passes data does not automatically authorize forwarding it elsewhere. Review the owning product's privacy documentation, give site owners the required controls or notice, and test deletion and disconnect behavior.

See [Connection and Sync](connection-and-sync.md), [REST authentication](rest-api/authentication.md), and [official support](canonical-sources-and-support-map.md).
