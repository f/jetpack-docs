---
title: Browse hooks by product
description: Move from a Jetpack product to its curated hooks and supported extension surfaces.
audience: developer
document_type: reference
sidebar_position: 50
sidebar_collapsed: true
---

The initial catalog contains these 29 complete local contracts:

| Product or foundation | Curated contract |
| --- | --- |
| Jetpack plugin bootstrap | [jetpack_loaded](actions/jetpack-loaded.md) |
| Jetpack Status and offline development | [jetpack_offline_mode](filters/jetpack-offline-mode.md) |
| Jetpack Forms | [grunion_after_feedback_post_inserted](actions/grunion-after-feedback-post-inserted.md), [grunion_contact_form_redirect_url](filters/grunion-contact-form-redirect-url.md), [jetpack_contact_form_forget_ip_address](filters/jetpack-contact-form-forget-ip-address.md) |
| Jetpack AI Assistant | [jetpack_ai_assistant_generation_complete](actions/jetpack-ai-assistant-generation-complete.md), [jetpack.ai.imageGenerationHandler](filters/jetpack-ai-image-generation-handler.md), [jetpack_ai_enabled](filters/jetpack-ai-enabled.md) |
| Jetpack CRM | [jetpack-crm-contact-vital-tabs](filters/jetpack-crm-contact-vital-tabs.md), [jetpack-crm-company-vital-tabs](filters/jetpack-crm-company-vital-tabs.md) |
| Jetpack Social | [publicize_should_publicize_published_post](filters/publicize-should-publicize-published-post.md), [jetpack_publicize_capability](filters/jetpack-publicize-capability.md) |
| Jetpack Stats | [stats_array](filters/stats-array.md), [jetpack_stats_excluded_ips](filters/jetpack-stats-excluded-ips.md) |
| Jetpack Boost | [jetpack_boost_render_blocking_js_exclude_handles](filters/jetpack-boost-render-blocking-js-exclude-handles.md), [jetpack_boost_critical_css_urls](filters/jetpack-boost-critical-css-urls.md), [jetpack_boost_cache_bypass_patterns](filters/jetpack-boost-cache-bypass-patterns.md), [jetpack_boost_clear_page_cache_url](actions/jetpack-boost-clear-page-cache-url.md) |
| Jetpack Search | [jetpack_search_should_handle_query](filters/jetpack-search-should-handle-query.md), [jetpack_search_es_wp_query_args](filters/jetpack-search-es-wp-query-args.md), [jetpack_instant_search_options](filters/jetpack-instant-search-options.md), [did_jetpack_search_query](actions/did-jetpack-search-query.md) |
| Jetpack VideoPress | [videopress_get_video_details](filters/videopress-get-video-details.md), [videopress_is_current_user_authed_for_video](filters/videopress-is-current-user-authed-for-video.md), [videopress_init](actions/videopress-init.md) |
| Akismet Anti-spam | [akismet_request_args](filters/akismet-request-args.md) |
| VaultPress Backup | [jetpack_backup_initialized](actions/jetpack-backup-initialized.md) |
| Jetpack Protect | [jetpack_account_protection_user_requires_protection](filters/jetpack-account-protection-user-requires-protection.md), [jetpack_protect_can_send_recovery_emails](filters/jetpack-protect-can-send-recovery-emails.md) |
| Jetpack Scan | No curated public hook at the pinned revision; use its documented JavaScript package or contribution path. |

For additional supported surfaces, start from each product's extension page: [Jetpack](../../products/jetpack/extend-hooks-and-apis.md), [Forms](../../products/forms/extend-hooks-and-apis.md), [AI Assistant](../../products/ai/extend-hooks-and-apis.md), [CRM](../../products/crm/extend-hooks-and-apis.md), [Social](../../products/social/extend-hooks-and-apis.md), [Stats](../../products/stats/extend-hooks-and-apis.md), [Boost](../../products/boost/extend-hooks-and-apis.md), [Search](../../products/search/extend-hooks-and-apis.md), [VideoPress](../../products/videopress/extend-hooks-and-apis.md), [Akismet](../../products/akismet/extend-hooks-and-apis.md), [Backup](../../products/backup/extend-hooks-and-apis.md), [Protect](../../products/protect/extend-hooks-and-apis.md), and [Scan](../../products/scan/extend-hooks-and-apis.md).

Some products expose blocks, WordPress Abilities, REST routes, or packages instead of supported public PHP hooks. Their extension page states that boundary rather than inventing a hook contract.
