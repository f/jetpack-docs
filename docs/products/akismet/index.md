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

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Akismet Anti-spam","title":"Choose the next lifecycle step","description":"Move from a safe Akismet Anti-spam setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Akismet Anti-spam and verify its primary outcome.","url":"/docs/products/akismet/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/akismet/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/akismet/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/akismet/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eAkismet evaluates submitted content and request metadata. Minimize fields, document the disclosure, protect keys, and never put real visitor submissions into development fixtures.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Akismet checks comments and other supported submissions for spam. It combines a WordPress plugin with the Akismet service: the site sends relevant submission and request context, receives a classification, and lets moderators review the result.

**Ownership boundary:** Akismet is maintained outside the Jetpack monorepo. This review pins Akismet 5.7 at [WordPress.org SVN revision 3514187](https://plugins.trac.wordpress.org/browser/akismet/tags/5.7?rev=3514187); its integration contract is the [Akismet developer documentation](https://akismet.com/developers/), and user guidance is at [Akismet Support](https://akismet.com/support/). Do not use Jetpack `jp` commands or Jetpack package paths for Akismet development.

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

At the reviewed 5.7 release, Akismet requires WordPress 5.8 or newer and PHP 7.2 or newer. Its agent-facing Abilities and Connectors support require the corresponding WordPress APIs and remain subject to Akismet configuration and permissions.

Continue with [Use and configure](/docs/products/akismet/use-and-configure/). Developers building a non-WordPress or custom-form integration should use [Extend, hooks, and APIs](/docs/products/akismet/extend-hooks-and-apis/) and the canonical developer contract.
