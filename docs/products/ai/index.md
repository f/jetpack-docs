---
title: Jetpack AI Assistant
description: Use Jetpack's editor AI responsibly and find the block and public JavaScript client that implement it.
audience: site-user
document_type: overview
sidebar_position: 1
sidebar_collapsed: false
product: ai
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

Jetpack AI Assistant adds service-backed generation and revision tools to the WordPress editor. At the pinned revision, its user-facing block is owned inside the main Jetpack plugin and shared request, streaming, state, and UI behavior is supplied by the public `@automattic/jetpack-ai-client` package.

AI output is a draft, not an authority. A person remains responsible for accuracy, rights, tone, accessibility, privacy, and the decision to publish.

## Follow the lifecycle

- [Use and configure AI Assistant](/docs/products/ai/use-and-configure/) to enable the editor experience, create a bounded prompt, and verify output before publishing.
- [Extend AI Assistant and its APIs](/docs/products/ai/extend-hooks-and-apis/) to use supported block and JavaScript client surfaces without treating service internals as public APIs.
- [Develop and test AI Assistant](/docs/products/ai/develop-and-test/) to build and test the plugin integration and AI Client package.
- [Troubleshoot and support AI Assistant](/docs/products/ai/troubleshoot-and-support/) to separate availability, authentication, streaming, browser, and content-quality problems.

## Prerequisites and boundaries

- A supported WordPress and Jetpack configuration with a working Jetpack connection for service-backed requests.
- An editor role allowed to edit the target content.
- Current product access for the requested capability. Availability and usage terms can change, so confirm them in [current Jetpack AI support](https://jetpack.com/support/jetpack-ai/).
- A content policy that tells authors what must not be placed in prompts and what review is required before publication.

Do not send passwords, API keys, private support transcripts, unreleased business information, or personal data that is not necessary for the authoring task. Do not ask the assistant to reproduce third-party material the site is not authorized to publish.

## Implementation ownership

- The pinned [`jetpack/ai-assistant` block metadata](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/blocks/ai-assistant/block.json) defines the block identity and stored attributes for this snapshot.
- The [AI Assistant block PHP source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/blocks/ai-assistant) owns registration and asset loading.
- The [AI Assistant plugin integration](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin) owns the editor plugin and sidebar feature around the block.
- The [Jetpack AI Client package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/js-packages/ai-client) owns shared client exports such as request helpers, streaming, React hooks, contexts, and components.

The hosted model, product eligibility, and undocumented request endpoints are not compatibility contracts for third-party code. Use the current support documentation for user behavior and the public package surface for supported development work.
