---
title: Jetpack AI Assistant
description: Use Jetpack's editor AI responsibly and find the block and public JavaScript client that implement it.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: ai
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack AI Assistant","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack AI Assistant setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack AI Assistant and verify its primary outcome.","url":"/docs/products/ai/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/ai/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/ai/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/ai/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003ePrompts, generation history, title, preceding content, and whole-post context may be transmitted or stored in block attributes, revisions, and debug logs. Never use secrets or unapproved private content.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack AI is the broader product and access boundary; AI Assistant is its writing surface in the WordPress editor. At the pinned revision, the user-facing block is owned inside the main Jetpack plugin, product access and usage are owned by My Jetpack, site and feature gates are owned by the Jetpack AI settings layer, and shared request, streaming, state, and UI behavior is supplied by the public `@automattic/jetpack-ai-client` package.

AI output is a draft, not an authority. A person remains responsible for accuracy, rights, tone, accessibility, privacy, and the decision to publish.

## Follow the lifecycle

- [Use and configure AI Assistant](/docs/products/ai/use-and-configure/) to enable the editor experience, create a bounded prompt, and verify output before publishing.
- [Extend AI Assistant and its APIs](/docs/products/ai/extend-hooks-and-apis/) to use supported block and JavaScript client surfaces without treating service internals as public APIs.
- [Develop and test AI Assistant](/docs/products/ai/develop-and-test/) to build and test the plugin integration and AI Client package.
- [Troubleshoot and support AI Assistant](/docs/products/ai/troubleshoot-and-support/) to separate availability, authentication, streaming, browser, and content-quality problems.

## Prerequisites and boundaries

- A supported WordPress and Jetpack configuration where the host permits AI, the site is connected, and AI is enabled at both the site-wide and writing-assistant gates.
- A current WordPress.com user connection for the editor as well as permission to edit the target content. A healthy site connection does not prove that the current user is connected.
- Current product access for the requested capability. Availability and usage terms can change, so confirm them in [current Jetpack AI support](https://jetpack.com/support/jetpack-ai/).
- A content policy that tells authors what must not be placed in prompts and what review is required before publication.

Do not send passwords, API keys, private support transcripts, unreleased business information, or personal data that is not necessary for the authoring task. Do not ask the assistant to reproduce third-party material the site is not authorized to publish.

## Implementation ownership

- The pinned [jetpack/ai-assistant block metadata](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant/block.json) defines the block identity and stored attributes for this snapshot.
- The [AI Assistant block PHP source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant) owns registration and asset loading.
- The [AI Assistant plugin integration](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin) owns the editor plugin and sidebar feature around the block.
- The [Jetpack AI Client package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/ai-client) owns shared client exports such as request helpers, streaming, React hooks, contexts, and components.
- The [My Jetpack product class](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/my-jetpack/src/products/class-jetpack-ai.php#L20-L90) owns the broader Jetpack AI product identity, access, and usage model.
- The [Jetpack AI settings class](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/lib/class-jetpack-ai-settings.php#L45-L84) owns host, master, and feature availability gates.

The hosted model, product eligibility, and undocumented request endpoints are not compatibility contracts for third-party code. Use the current support documentation for user behavior and the public package surface for supported development work.
