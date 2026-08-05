---
title: Use and configure Jetpack Stats
description: Enable Stats, define access and privacy behavior, create a controlled visit, and interpret the resulting report responsibly.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: stats
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Choose a collection policy","content":"\u003cp\u003eDefine consent, excluded roles or visitors, retention expectations, and who may view reports.\u003c/p\u003e"},{"title":"Enable the correct Stats surface","content":"\u003cp\u003eConfirm the package or main-plugin integration loads without duplicating another analytics snippet.\u003c/p\u003e"},{"title":"Verify collection and reporting","content":"\u003cp\u003eUse a controlled signed-out visit, inspect consent and blockers, then allow for documented processing time.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eMetrics and custom dimensions must not carry personal or unapproved data. Compare analytics tools only after aligning consent, exclusions, timezone, bots, and metric definitions.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Decide before collecting

Identify why the site needs traffic data, which roles can view it, how long reports or exports are retained, and whether consent is required for the site's audience and jurisdiction. Review the current [Jetpack Stats support documentation](https://jetpack.com/support/jetpack-stats/) and the site's privacy policy before enabling collection.

Do not add custom tracking values that contain names, email addresses, account IDs, full query strings, or another stable personal identifier.

## Enable Stats

1. Confirm the main Jetpack plugin is connected and current for the site's supported WordPress and PHP versions.
2. Enable Jetpack Stats through the installed version's Jetpack settings.
3. Review the available privacy, visitor exclusion, and access settings rather than accepting defaults without a policy decision.
4. Confirm only intended WordPress roles can reach the Stats dashboard.
5. Purge only the necessary public-page cache if the tracking markup was added after a cached page was generated.

The source-defined settings are `admin_bar`, `roles` (roles granted `view_stats`), `count_roles` (logged-in roles whose visits are counted), `do_not_track`, `honor_cookie_consent`, and `enable_odyssey_stats`. Review each independently. `honor_cookie_consent` integrates with the WP Consent API only when its gate is enabled; test the unavailable, late-loading, granted, denied, and changed states.

At this revision, the stored `do_not_track` setting and the tracking runtime are not a single proven contract: runtime collection checks the `jetpack_honor_dnt_header_for_stats` filter, whose default is false. Do not promise that toggling the stored option alone changes collection until the implementation is reconciled on the installed version.

## Verify collection

Use a public test page with no sensitive query parameters:

1. Open it in a signed-out browser session that is not intentionally excluded by the site's Stats configuration.
2. Confirm the public HTML loads the expected Stats browser asset without a content-security-policy, consent, optimization, or network error.
3. Navigate once to another test page so the visit has a distinct, harmless path.
4. Allow for the product's normal processing interval, then check the report for the test content and expected timezone.
5. Repeat from an intentionally excluded user or environment and confirm the configured exclusion behaves as expected.

A single visit is a functional check, not an accuracy benchmark. Avoid generating artificial traffic to force a dashboard update.

## Read reports

- Compare periods with the same timezone and metric definition.
- Distinguish views from visitors and content totals from site totals.
- Treat referrers and search terms as signals that may be absent, grouped, or privacy-limited.
- Annotate major site launches, campaigns, outages, consent changes, and caching changes when interpreting a trend.
- Export only when needed, restrict the file, and delete temporary copies after the task.

## Change or disable Stats

Record the decision and expected effect before changing tracking, consent, or exclusion behavior. After disabling, inspect a signed-out public page to confirm the collection asset is no longer present where it should not be. Disabling collection does not automatically define the retention or deletion behavior of previously collected service data; use current Jetpack support for account-specific requests.

If reports remain empty or differ unexpectedly, follow [Stats troubleshooting](/docs/products/stats/troubleshoot-and-support/) and isolate page output, browser request, exclusion, service processing, dashboard permission, and metric definition separately.
