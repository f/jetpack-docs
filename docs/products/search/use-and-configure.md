---
title: "Use and configure Jetpack Search"
description: "Connect Search, verify indexing, design useful filters, and test the visitor experience."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "search"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm indexing scope","content":"\u003cp\u003eConnect the site, identify searchable post types and visibility rules, and wait for a controlled item to index.\u003c/p\u003e"},{"title":"Choose the search experience","content":"\u003cp\u003eConfigure Instant Search, blocks, filters, sorting, and display without bypassing content permissions.\u003c/p\u003e"},{"title":"Test a query set","content":"\u003cp\u003eUse representative exact, broad, filtered, empty, private, and newly published cases.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eSearch must never expose private, draft, restricted, or deleted content through results, facets, snippets, or cached indexes. Treat exposure as a security issue.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Search has two related concerns: the remote index must contain the right eligible documents, and the selected front-end experience must turn a visitor's query into a useful result set without widening visibility.

## Connect and index

Install the plugin from the WordPress plugin directory, activate it, and follow its connection flow. Use an administrator account that is authorized to connect the site. Confirm the site's public URL is stable and scheduled tasks and outbound HTTPS requests work.

Publish a uniquely named test post, wait for indexing, and search for its exact title. Then update the title and verify the change reaches Search. Delete the test content and confirm it eventually leaves the results. This create-update-delete check gives better evidence than searching only long-established posts.

Do not expose private, draft, membership-only, or personally identifying content merely to make it searchable. Review the visibility and registration settings of every indexed post type.

## Choose the experience

Choose explicitly among Embedded, Overlay, Blocks Overlay (beta), Inline/theme, and Off. The Search dashboard also controls result format, sorting, trigger behavior, excluded post types, highlights, infinite scroll, post date, product price, Powered by attribution, AI Answers, and suggestions. Keep the initial configuration small:

1. Select only content types visitors understand.
2. Add a category, product, or other taxonomy filter when it materially narrows results.
3. Give filters plain-language labels.
4. Check long values, empty result sets, keyboard operation, and the close/back behavior of an overlay.
5. Test the theme's search form, header search, Search blocks, and direct `?s=` URLs.

For WooCommerce, test products that are in stock, out of stock, hidden from the catalog, variable, and assigned to multiple categories. Search visibility should agree with the store's catalog rules.

Search Suggestions, the Site Chat preview, AI Answers/personality, and agent access have separate preview, eligibility, and experience gates. Do not promise them on every site. At the pinned revision, private sites are not eligible for agent access. Recheck the installed dashboard and cited source before documenting a beta surface as generally available.

## Permissions and data flow

Dashboard and administrative REST operations require `manage_options`; Customizer integration requires `edit_theme_options`. Instant Search requests can send the query, filters, requested result fields, highlighted content or comments, images, and WooCommerce fields. Public and private sites use different request paths, and browser-side caching can temporarily mask service changes.

Sync maintains the remote index from an explicit allowlist of post metadata, taxonomies, and settings. Review that allowlist before adding a custom field and never send a private field merely to make filtering convenient. Pinned evidence: [Instant Search request construction](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search/src/instant-search/lib/api.js#L250-L381) and [Search Sync module](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/sync/src/modules/class-search.php#L1-L89).

## Measure quality

Build a repeatable query set with expected high-ranking results: exact titles, product identifiers, synonyms, common misspellings, and a no-results query. Rerun it after taxonomy, template, or relevance changes. Search quality is not established by response speed alone.

If your site records search interactions, disclose that collection and apply the site's consent policy. Never include secrets or private customer data in a search query used for testing.

For controlled query changes, read [Extend, hooks, and APIs](/docs/products/search/extend-hooks-and-apis/). If content is missing or the overlay conflicts with the theme, follow [Troubleshoot and support](/docs/products/search/troubleshoot-and-support/).
