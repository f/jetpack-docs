---
title: Develop and test Jetpack Forms
description: Work in the Forms package, build its PHP and editor assets, and verify package and Jetpack-plugin integration behavior.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: forms
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/packages/forms/\n  src/abilities/\n  src/blocks/\n  src/contact-form/\n  src/dashboard/\n  src/routes/\n  tests/","caption":"Jetpack Forms source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Forms project checks","shell":"bash","prompt":"$","command":"jp install packages/forms\njp build packages/forms \u002d\u002ddeps\njp test php packages/forms\njp test js packages/forms\njp test typecheck packages/forms\njp phan packages/forms","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

The implementation lives in [projects/packages/forms](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms). The main Jetpack plugin's Contact Form module loads this package; avoid rebuilding package behavior in `projects/plugins/jetpack`.

At the pinned revision, the package separates `src/abilities`, block and synced-form code, contact-form processing, authenticated routes, package initialization, the Forms and Responses dashboards, and service-integration helpers. Put a change in the subsystem that owns it and include tests at that boundary.

## Build and test the package

From the Jetpack monorepo root:

```bash
jp install packages/forms
jp build packages/forms --deps
jp test php packages/forms
jp test js packages/forms
jp test typecheck packages/forms
jp phan packages/forms
```

The package defines PHP, JavaScript, and typecheck scripts. A block or dashboard change should include JavaScript and type checks; submission, storage, email, anti-spam, ability, endpoint, webhook, preview-submission, or hook behavior should include PHP coverage at the owning layer. Use the existing test environment rather than replacing WordPress behavior with hand-written mocks when the project already supplies it. Run `pnpm --dir projects/packages/forms generate-icons` when changing form-field icons, then review the generated result.

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
- Synced form creation, reuse, missing-reference, and permission-denied states.
- Form Preview submissions and their Test marker and export behavior.
- Forms Abilities with the same validation and capability outcomes as their controllers.
- Keyboard use, labels, error messages, and narrow layouts.

Use unique synthetic values and remove test responses. Do not put real addresses, messages, tokens, or webhook secrets in fixtures, snapshots, logs, or a public pull request.

## Contribution requirements

Add a Forms changelog entry with `jp changelog add packages/forms`. If integration code in `plugins/jetpack` also changes, add and test a separate Jetpack plugin changelog. Keep PHP compatible with the minimum version declared by the affected project and retain `$$next-version$$` in new version annotations.

Link the pull request to the behavior and tests, not to private site data. For a security issue involving submission authorization, uploads, data exposure, or webhook validation, follow [Automattic's security reporting process](https://automattic.com/security/) instead of opening a public proof of concept.
