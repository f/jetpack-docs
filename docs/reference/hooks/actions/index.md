---
title: Actions index
description: Curated Jetpack actions with verified timing and callback parameters.
audience: developer
document_type: reference
sidebar_position: 30
sidebar_collapsed: false
---

Actions notify callbacks and do not consume return values.

| Action | Owner | Purpose | Since |
| --- | --- | --- | --- |
| [`jetpack_loaded`](jetpack-loaded.md) | Jetpack plugin | Signals that the main Jetpack instance and managed package autoloader are ready | Jetpack 8.1.0 |
| [`jetpack_backup_initialized`](jetpack-backup-initialized.md) | VaultPress Backup package | Signals that the package's immediate WordPress registration is complete | Backup package 1.3.0 |

Read the complete detail page before registering a callback; action timing and plugin load order matter as much as its parameter list.
