---
title: Browse hooks by product
description: Move from a Jetpack product to its curated hooks and supported extension surfaces.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
---

The initial catalog contains these complete local contracts:

| Product or foundation | Curated contract |
| --- | --- |
| Jetpack plugin bootstrap | [`jetpack_loaded`](actions/jetpack-loaded.md) |
| Jetpack Status and offline development | [`jetpack_offline_mode`](filters/jetpack-offline-mode.md) |
| Jetpack Boost | [`jetpack_boost_render_blocking_js_exclude_handles`](filters/jetpack-boost-render-blocking-js-exclude-handles.md), [`jetpack_boost_critical_css_urls`](filters/jetpack-boost-critical-css-urls.md) |
| Jetpack Search | [`jetpack_search_should_handle_query`](filters/jetpack-search-should-handle-query.md), [`jetpack_search_es_wp_query_args`](filters/jetpack-search-es-wp-query-args.md) |
| Jetpack VideoPress | [`videopress_get_video_details`](filters/videopress-get-video-details.md) |
| VaultPress Backup | [`jetpack_backup_initialized`](actions/jetpack-backup-initialized.md) |

For additional supported surfaces, start from each product's extension page: [Jetpack](../../products/jetpack/extend-hooks-and-apis.md), [Forms](../../products/forms/extend-hooks-and-apis.md), [AI Assistant](../../products/ai/extend-hooks-and-apis.md), [CRM](../../products/crm/extend-hooks-and-apis.md), [Social](../../products/social/extend-hooks-and-apis.md), [Stats](../../products/stats/extend-hooks-and-apis.md), [Boost](../../products/boost/extend-hooks-and-apis.md), [Search](../../products/search/extend-hooks-and-apis.md), [VideoPress](../../products/videopress/extend-hooks-and-apis.md), [Akismet](../../products/akismet/extend-hooks-and-apis.md), [Backup](../../products/backup/extend-hooks-and-apis.md), [Protect](../../products/protect/extend-hooks-and-apis.md), and [Scan](../../products/scan/extend-hooks-and-apis.md).

Some products expose blocks, REST routes, or packages instead of supported public PHP hooks. Their extension page states that boundary rather than inventing a hook contract.
