---
title: Develop and test Jetpack Forms
description: Work in the Forms package, build its PHP and editor assets, and verify package and Jetpack-plugin integration behavior.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: forms
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

The implementation lives in [`projects/packages/forms`](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/forms). The main Jetpack plugin's Contact Form module loads this package; avoid rebuilding package behavior in `projects/plugins/jetpack`.

At the pinned revision, the package separates block code, contact-form processing, the responses dashboard, and service-integration helpers. Put a change in the subsystem that owns it and include tests at that boundary.

## Build and test the package

From the Jetpack monorepo root:

```bash
jp install packages/forms
jp build packages/forms --deps
jp test php packages/forms
jp test js packages/forms
jp phan packages/forms
```

The Composer project defines both PHP and JavaScript test scripts. A block or dashboard change should include JavaScript tests; submission, storage, email, anti-spam, or hook behavior should include PHP tests. Use the existing test environment rather than replacing WordPress behavior with hand-written mocks when the project already supplies it.

## Verify integration in WordPress

For behavior loaded by the main Jetpack plugin, build Jetpack with dependencies and run its integration environment:

```bash
jp build plugins/jetpack --deps
tools/docker/bin/seed-worktree-env.sh
jp docker up -d
jp docker install
jp docker phpunit jetpack
```

Then create and submit a form through the real editor. Verify:

- Block insertion, field editing, validation, save, and front-end rendering.
- Synchronous and AJAX submission paths where applicable.
- Response storage, administrator access, and deletion.
- Notification rendering and mail handoff without asserting delivery from a fake transport.
- Spam and non-spam outcomes.
- Redirect, webhook, and enabled integration behavior.
- Keyboard use, labels, error messages, and narrow layouts.

Use unique synthetic values and remove test responses. Do not put real addresses, messages, tokens, or webhook secrets in fixtures, snapshots, logs, or a public pull request.

## Contribution requirements

Add a Forms changelog entry with `jp changelog add packages/forms`. If integration code in `plugins/jetpack` also changes, add and test a separate Jetpack plugin changelog. Keep PHP compatible with the minimum version declared by the affected project and retain `$$next-version$$` in new version annotations.

Link the pull request to the behavior and tests, not to private site data. For a security issue involving submission authorization, uploads, data exposure, or webhook validation, follow [Automattic's security reporting process](https://automattic.com/security/) instead of opening a public proof of concept.
