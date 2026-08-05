---
title: Develop and test Jetpack AI Assistant
description: Build and test the AI Assistant block integration and Jetpack AI Client package without exposing prompts or service credentials.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: ai
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/jetpack/\n  extensions/blocks/ai-assistant/\n  extensions/plugins/ai-assistant-plugin/\n  _inc/lib/class-jetpack-ai-settings.php\nprojects/js-packages/ai-client/\nprojects/packages/my-jetpack/","caption":"Jetpack AI Assistant source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack AI Assistant project checks","shell":"bash","prompt":"$","command":"jp build js-packages/ai-client \u002d\u002ddeps\njp test js js-packages/ai-client\njp test typecheck js-packages/ai-client\njp build plugins/jetpack \u002d\u002ddeps\njp test typecheck plugins/jetpack\njp docker phpunit jetpack \u002d\u002d \u002d\u002dfilter=AI_Assistant","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

AI Assistant spans several ownership areas:

- [projects/plugins/jetpack/extensions/blocks/ai-assistant](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant) owns the block registration and block implementation.
- [projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin) owns the editor plugin and sidebar integration.
- [projects/js-packages/ai-client](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/ai-client) owns shared request, streaming, hooks, contexts, components, and types.
- [projects/packages/my-jetpack/src/products/class-jetpack-ai.php](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/my-jetpack/src/products/class-jetpack-ai.php#L20-L90) owns product access and usage.
- [class-jetpack-ai-settings.php](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/lib/class-jetpack-ai-settings.php#L45-L84) owns site and feature gates. Nearby REST controllers are site-side implementation, not automatically third-party API contracts.

Put reusable client behavior in the package and product-specific editor behavior in the plugin integration. Do not duplicate package code into the block bundle.

## Build and test the AI Client

```bash
jp install js-packages/ai-client
jp build js-packages/ai-client --deps
jp test js js-packages/ai-client
jp test typecheck js-packages/ai-client
```

The AI Client's current test file at this revision contains only a placeholder assertion, so do not describe streaming or authentication coverage as already established. A change in those areas should add deterministic tests for loading, streaming chunks, completion, cancellation, empty data, authentication failure, service error, and unmount behavior. Public tests must not call a metered service or contain production credentials.

## Build and test the plugin integration

```bash
jp build plugins/jetpack --deps
jp test js plugins/jetpack
tools/docker/bin/seed-worktree-env.sh
jp docker up -d
jp docker install
jp docker phpunit jetpack -- --filter=AI_Assistant
jp phan plugins/jetpack
jp test typecheck plugins/jetpack
```

Exercise the real editor after automated tests:

1. Insert the AI Assistant block as an eligible user.
2. Verify requesting, streaming, success, error, retry, and save/reload behavior.
3. Confirm ordinary render sends no unsolicited request; any automatic continuation must follow a clearly initiated user flow.
4. Confirm editor content remains usable when the service or connection is unavailable.
5. Inspect the saved post and front-end render for unsafe HTML or leaked request metadata.
6. Test keyboard operation, announcements, focus movement, reduced motion, and narrow layouts.

## Protect test data

Use synthetic prompts and generated fixtures. Strip prompt bodies, response content, tokens, cookies, site URLs, and user identifiers from logs and snapshots. Error handling can assert a stable code and state without recording the payload.

Add a changelog entry for every changed project: `jp changelog add js-packages/ai-client` for the client and `jp changelog add plugins/jetpack` for the plugin. Keep the package's public exports backward compatible or document and test the intended migration. Report an authentication, authorization, prompt-exposure, or output-injection vulnerability through [Automattic Security](https://automattic.com/security/).
