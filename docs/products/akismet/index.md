---
title: "Akismet Anti-spam"
description: "Protect comments and form submissions with Akismet's externally maintained anti-spam service."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "akismet"
last_reviewed: "2026-08-05"
---

Akismet checks comments and other supported submissions for spam. It combines a WordPress plugin with the Akismet service: the site sends relevant submission and request context, receives a classification, and lets moderators review the result.

**Ownership boundary:** Akismet is maintained outside the Jetpack monorepo. Its public plugin source is in [WordPress.org's Akismet SVN repository](https://plugins.svn.wordpress.org/akismet/), its integration contract is the [Akismet developer documentation](https://akismet.com/developers/), and user guidance is at [Akismet Support](https://akismet.com/support/). The Jetpack source revision used for the rest of this site is an inventory reference only; do not use Jetpack `jp` commands or Jetpack package paths for Akismet development.

## Where Akismet fits

Use Akismet for public input that has a supported integration, such as WordPress comments or a form plugin that explicitly documents Akismet support. Akismet is not a firewall, malware scanner, authentication system, or substitute for authorization and input validation.

An anti-spam decision is probabilistic. Keep a moderation and recovery path so a legitimate submission can be restored and reported as a false positive. Decide how long spam is retained and who is allowed to review it.

## Start safely

1. Install or update Akismet Anti-spam from the WordPress plugin directory.
2. Activate it and configure the site's Akismet API key through the plugin UI.
3. Review the privacy disclosure shown by the plugin and update the site's own privacy notice for the forms actually checked.
4. Submit an obvious test through a staging form, then confirm ordinary submissions remain available.
5. Review the spam queue regularly during rollout and mark mistakes as spam or not spam.

Do not put the API key in browser JavaScript, page source, documentation, screenshots, or a public repository.

Continue with [Use and configure](/docs/products/akismet/use-and-configure/). Developers building a non-WordPress or custom-form integration should use [Extend, hooks, and APIs](/docs/products/akismet/extend-hooks-and-apis/) and the canonical developer contract.
