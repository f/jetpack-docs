---
title: Deprecated hooks and replacements
description: Identify Jetpack hooks that emit deprecation notices and migrate to their documented replacements.
audience: developer
document_type: reference
sidebar_position: 60
sidebar_collapsed: true
---

Do not start a new integration on a hook documented as deprecated. Existing consumers should keep their old callback only for the oldest supported Jetpack version, add the replacement for newer versions, and test that both are not applied twice.

One source-verified example at the pinned revision is:

| Deprecated filter | Since | Deprecated in | Replacement |
| --- | --- | --- | --- |
| `jetpack_api_exclude_comment_types_count` | Jetpack 6.9.0 | Jetpack 11.1 | `jetpack_api_include_comment_types_count` |

The semantic direction changed from an exclusion list to an inclusion list, so migrating requires translating intent rather than renaming the callback. See the [immutable source and replacement call](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/class.json-api.php#L1131-L1155).

Jetpack also maintains a runtime list of older hooks that can no longer emit a notice at their original call site. Use deprecation output, source annotations, and changelog entries together; do not rely on this page as an exhaustive inventory.
