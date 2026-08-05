---
title: Filters index
description: Curated Jetpack filters with verified input and return contracts.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: false
---

Filters pass a value through callbacks. Every callback must return a value compatible with the documented type.

| Filter | Owner | Purpose | Since |
| --- | --- | --- | --- |
| [`jetpack_offline_mode`](jetpack-offline-mode.md) | Jetpack Status package | Overrides whether Jetpack operates in offline mode | Status package 1.3.0 |
| [`jetpack_boost_render_blocking_js_exclude_handles`](jetpack-boost-render-blocking-js-exclude-handles.md) | Jetpack Boost | Keeps selected script handles in their original document position | Boost 1.0.0 |
| [`jetpack_boost_critical_css_urls`](jetpack-boost-critical-css-urls.md) | Jetpack Boost | Changes the public URLs used for Critical CSS generation | Boost 1.0.0 |
| [`jetpack_search_should_handle_query`](jetpack-search-should-handle-query.md) | Jetpack Search package | Decides whether Search handles a specific `WP_Query` | Jetpack 5.6.0 |
| [`jetpack_search_es_wp_query_args`](jetpack-search-es-wp-query-args.md) | Jetpack Search package | Changes WP-style arguments before service-query translation | Jetpack 5.0.0 |
| [`videopress_get_video_details`](videopress-get-video-details.md) | Jetpack VideoPress package | Filters decoded details for a valid video GUID | Jetpack 4.0.0 |

Preserve an incoming restrictive or enabled value unless the contract explicitly allows overriding it.
