---
title: "Develop and test VaultPress Backup"
description: "Build the Backup plugin and package, then verify permissions, activity, download, and restore states."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "backup"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/backup/\nprojects/packages/\n  backup/\n  backup-helper-script-manager/","caption":"VaultPress Backup source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"VaultPress Backup project checks","shell":"bash","prompt":"$","command":"jp install plugins/backup\njp build plugins/backup \u002d\u002ddeps\njp test php packages/backup\njp test js packages/backup\njp test php plugins/backup\njp test php packages/backup-helper-script-manager\npnpm \u002d\u002ddir projects/packages/backup run typecheck\njp phan packages/backup\njp phan plugins/backup","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

The standalone shell is `projects/plugins/backup`; shared UI, REST controllers, state, and service bridges live in `projects/packages/backup`. The plugin's watch command delegates to the package.

## Build

```bash
jp install plugins/backup
jp build plugins/backup --deps
```

Use `jp watch packages/backup` for package assets. Do not install an unbuilt monorepo directory on a test site; the plugin entry point reports incomplete dependencies when generated package files are absent.

## Test the owning package

```bash
jp test php packages/backup
jp test js packages/backup
jp test php plugins/backup
jp test php packages/backup-helper-script-manager
pnpm --dir projects/packages/backup run typecheck
jp phan packages/backup
jp phan plugins/backup
```

Add PHP tests for permission callbacks, REST validation, service errors, capability state, response normalization, the global Abilities feature gate, and all four ability schemas. Add Jest coverage for loading, empty, success, failure, and in-progress restore states. A visual success message is not enough: assert that polling stops, errors remain actionable, and a retry cannot accidentally duplicate a destructive operation. In particular, verify that `request-backup` is treated as a non-idempotent mutation and that no restore/download ability is registered.

Use mocks for unit tests and a dedicated disposable site for connected integration tests. Never start a restore against production as a test. Seed recognizable files and database rows, take a backup, change both, restore to the test point, and verify the expected scope plus any data intentionally preserved.

## Review checklist

- Require the narrow administrator capability and valid nonce used by the owning controller.
- Keep archive URLs, connection tokens, site credentials, and activity details out of logs and fixtures.
- Test a disconnected site, expired authorization, unavailable service, partial response, timeout, and restore failure.
- Verify accessibility of progress, error, confirmation, and destructive controls.
- Test shared package changes in every consuming product affected by them.
- Add changelog entries for each changed project.

Review the pinned [Backup plugin](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/backup) and [Backup package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup). For broader setup, see [Building with Jetpack](/docs/building-with-jetpack/).
