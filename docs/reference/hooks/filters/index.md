---
title: Filters index
description: Curated Jetpack filters with verified input and return contracts.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
---

Filters pass a value through callbacks. Every callback must return a value compatible with the documented type.

| Filter | Owner | Purpose | Since |
| --- | --- | --- | --- |
| [jetpack_offline_mode](jetpack-offline-mode.md) | Jetpack Status package | Overrides whether Jetpack operates in offline mode | Status package 1.3.0 |
| [grunion_contact_form_redirect_url](grunion-contact-form-redirect-url.md) | Jetpack Forms | Changes the post-submission redirect URL | Jetpack Forms package 1.9.0 |
| [jetpack_contact_form_forget_ip_address](jetpack-contact-form-forget-ip-address.md) | Jetpack Forms | Removes a submitter IP address before response storage and email | Jetpack Forms package 0.33.0 |
| [jetpack_ai_enabled](jetpack-ai-enabled.md) | Jetpack AI Assistant | Vetoes a provisional AI-availability decision before final gates | Jetpack 11.8 |
| [jetpack.ai.imageGenerationHandler](jetpack-ai-image-generation-handler.md) | Jetpack AI Assistant | Selects the editor callable that opens image generation | Jetpack 15.6.0 release provenance |
| [jetpack_boost_render_blocking_js_exclude_handles](jetpack-boost-render-blocking-js-exclude-handles.md) | Jetpack Boost | Keeps selected script handles in their original document position | Boost 1.0.0 |
| [jetpack_boost_critical_css_urls](jetpack-boost-critical-css-urls.md) | Jetpack Boost | Changes the public URLs used for Critical CSS generation | Boost 1.0.0 |
| [jetpack_boost_cache_bypass_patterns](jetpack-boost-cache-bypass-patterns.md) | Jetpack Boost | Adds narrowly scoped URL-path patterns that bypass Page Cache | Boost 3.2.0 |
| [jetpack_search_should_handle_query](jetpack-search-should-handle-query.md) | Jetpack Search package | Decides whether Search handles a specific `WP_Query` | Jetpack 5.6.0 |
| [jetpack_search_es_wp_query_args](jetpack-search-es-wp-query-args.md) | Jetpack Search package | Changes WP-style arguments before service-query translation | Jetpack 5.0.0 |
| [jetpack_instant_search_options](jetpack-instant-search-options.md) | Jetpack Search package | Changes Instant Search presentation and shared query options | Jetpack 7.7.0 |
| [videopress_get_video_details](videopress-get-video-details.md) | Jetpack VideoPress package | Filters decoded details for a valid video GUID | Jetpack 4.0.0 |
| [videopress_is_current_user_authed_for_video](videopress-is-current-user-authed-for-video.md) | Jetpack VideoPress package | Changes the current user's protected-video authorization decision | Not annotated |
| [jetpack-crm-contact-vital-tabs](jetpack-crm-contact-vital-tabs.md) | Jetpack CRM | Adds administrator Vitals tabs for a contact | Not annotated |
| [jetpack-crm-company-vital-tabs](jetpack-crm-company-vital-tabs.md) | Jetpack CRM | Adds administrator Vitals tabs for a company | Not annotated |
| [publicize_should_publicize_published_post](publicize-should-publicize-published-post.md) | Jetpack Social | Decides whether a newly published post is marked for automatic sharing | Publicize package 0.1.0 |
| [jetpack_publicize_capability](jetpack-publicize-capability.md) | Jetpack Social | Changes the WordPress capability required by Publicize controls | Publicize package 0.1.0 |
| [stats_array](stats-array.md) | Jetpack Stats | Changes the values serialized into browser tracking code | Jetpack 1.1.0 |
| [jetpack_stats_excluded_ips](jetpack-stats-excluded-ips.md) | Jetpack Stats | Excludes exact visitor IP strings from view tracking | Jetpack 10.6 |
| [akismet_request_args](akismet-request-args.md) | Akismet Anti-spam | Changes an Akismet API request array for a named method | Akismet 5.3.1 |
| [jetpack_account_protection_user_requires_protection](jetpack-account-protection-user-requires-protection.md) | Jetpack Protect | Decides whether a qualifying user receives leaked-password protection | Account Protection package 0.1.0 |
| [jetpack_protect_can_send_recovery_emails](jetpack-protect-can-send-recovery-emails.md) | Jetpack Protect | Controls whether a blocked login offers email recovery | Jetpack 5.6.0 |

Preserve an incoming restrictive or enabled value unless the contract explicitly allows overriding it.
