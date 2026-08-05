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
| [jetpack_loaded](jetpack-loaded.md) | Jetpack plugin | Signals that the main Jetpack instance and managed package autoloader are ready | Jetpack 8.1.0 |
| [grunion_after_feedback_post_inserted](grunion-after-feedback-post-inserted.md) | Jetpack Forms | Runs after a response is stored and before later notification work completes | Jetpack 8.6.0 |
| [jetpack_ai_assistant_generation_complete](jetpack-ai-assistant-generation-complete.md) | Jetpack AI Assistant | Signals completed editor-side generation for an extended block | Jetpack 15.6.0 |
| [jetpack_boost_clear_page_cache_url](jetpack-boost-clear-page-cache-url.md) | Jetpack Boost | Requests Page Cache invalidation for one site URL and its recursive scope | Not annotated |
| [did_jetpack_search_query](did-jetpack-search-query.md) | Jetpack Search | Observes the result, URL, and arguments after a remote search request | Jetpack 5.0.0 |
| [videopress_init](videopress-init.md) | Jetpack VideoPress | Signals that the selected VideoPress package initialization path completed | VideoPress package 0.1.1 |
| [jetpack_backup_initialized](jetpack-backup-initialized.md) | VaultPress Backup package | Signals that the package's immediate WordPress registration is complete | Backup package 1.3.0 |

Read the complete detail page before registering a callback; action timing and plugin load order matter as much as its parameter list.
