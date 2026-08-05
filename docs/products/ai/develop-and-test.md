---
title: Develop and test Jetpack AI Assistant
description: Build and test the AI Assistant block integration and Jetpack AI Client package without exposing prompts or service credentials.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: ai
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

AI Assistant spans three principal source areas:

- [`projects/plugins/jetpack/extensions/blocks/ai-assistant`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/blocks/ai-assistant) owns the block registration and block implementation.
- [`projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin) owns the editor plugin and sidebar integration.
- [`projects/js-packages/ai-client`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/js-packages/ai-client) owns shared request, streaming, hooks, contexts, components, and types.

Put reusable client behavior in the package and product-specific editor behavior in the plugin integration. Do not duplicate package code into the block bundle.

## Build and test the AI Client

```bash
jp install js-packages/ai-client
jp build js-packages/ai-client --deps
jp test js js-packages/ai-client
jp test typecheck js-packages/ai-client
```

Test loading, streaming chunks, completion, cancellation, empty data, authentication failure, service error, and unmount behavior. Use deterministic mocked responses; public tests must not call a metered service or contain production credentials.

## Build and test the plugin integration

```bash
jp build plugins/jetpack --deps
jp test js plugins/jetpack
tools/docker/bin/seed-worktree-env.sh
jp docker up -d
jp docker install
jp docker phpunit jetpack
jp phan plugins/jetpack
```

Exercise the real editor after automated tests:

1. Insert the AI Assistant block as an eligible user.
2. Verify requesting, streaming, success, error, retry, and save/reload behavior.
3. Confirm no request is sent without an explicit user action.
4. Confirm editor content remains usable when the service or connection is unavailable.
5. Inspect the saved post and front-end render for unsafe HTML or leaked request metadata.
6. Test keyboard operation, announcements, focus movement, reduced motion, and narrow layouts.

## Protect test data

Use synthetic prompts and generated fixtures. Strip prompt bodies, response content, tokens, cookies, site URLs, and user identifiers from logs and snapshots. Error handling can assert a stable code and state without recording the payload.

Add a changelog entry for every changed project: `jp changelog add js-packages/ai-client` for the client and `jp changelog add plugins/jetpack` for the plugin. Keep the package's public exports backward compatible or document and test the intended migration. Report an authentication, authorization, prompt-exposure, or output-injection vulnerability through [Automattic Security](https://automattic.com/security/).
