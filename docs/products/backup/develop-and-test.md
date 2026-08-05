---
title: "Develop and test VaultPress Backup"
description: "Build the Backup plugin and package, then verify permissions, activity, download, and restore states."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "backup"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

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
jp phan packages/backup
jp phan plugins/backup
```

Add PHP tests for permission callbacks, REST validation, service errors, capability state, and response normalization. Add Jest coverage for loading, empty, success, failure, and in-progress restore states. A visual success message is not enough: assert that polling stops, errors remain actionable, and a retry cannot accidentally duplicate a destructive operation.

Use mocks for unit tests and a dedicated disposable site for connected integration tests. Never start a restore against production as a test. Seed recognizable files and database rows, take a backup, change both, restore to the test point, and verify the expected scope plus any data intentionally preserved.

## Review checklist

- Require the narrow administrator capability and valid nonce used by the owning controller.
- Keep archive URLs, connection tokens, site credentials, and activity details out of logs and fixtures.
- Test a disconnected site, expired authorization, unavailable service, partial response, timeout, and restore failure.
- Verify accessibility of progress, error, confirmation, and destructive controls.
- Test shared package changes in every consuming product affected by them.
- Add changelog entries for each changed project.

Review the pinned [Backup plugin](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/backup) and [Backup package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/backup). For broader setup, see [Building with Jetpack](/docs/building-with-jetpack/).
