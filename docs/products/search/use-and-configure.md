---
title: "Use and configure Jetpack Search"
description: "Connect Search, verify indexing, design useful filters, and test the visitor experience."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "search"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Search has two related concerns: the remote index must contain the right public documents, and the front-end interface must turn a visitor's query into a useful result set.

## Connect and index

Install the plugin from the WordPress plugin directory, activate it, and follow its connection flow. Use an administrator account that is authorized to connect the site. Confirm the site's public URL is stable and scheduled tasks and outbound HTTPS requests work.

Publish a uniquely named test post, wait for indexing, and search for its exact title. Then update the title and verify the change reaches Search. Delete the test content and confirm it eventually leaves the results. This create-update-delete check gives better evidence than searching only long-established posts.

Do not expose private, draft, membership-only, or personally identifying content merely to make it searchable. Review the visibility and registration settings of every indexed post type.

## Choose the experience

The Search dashboard can configure the available Search presentation, including instant results and supported filters. Keep the initial configuration small:

1. Select only content types visitors understand.
2. Add a category, product, or other taxonomy filter when it materially narrows results.
3. Give filters plain-language labels.
4. Check long values, empty result sets, keyboard operation, and the close/back behavior of an overlay.
5. Test the theme's search form, header search, Search blocks, and direct `?s=` URLs.

For WooCommerce, test products that are in stock, out of stock, hidden from the catalog, variable, and assigned to multiple categories. Search visibility should agree with the store's catalog rules.

## Measure quality

Build a repeatable query set with expected high-ranking results: exact titles, product identifiers, synonyms, common misspellings, and a no-results query. Rerun it after taxonomy, template, or relevance changes. Search quality is not established by response speed alone.

If your site records search interactions, disclose that collection and apply the site's consent policy. Never include secrets or private customer data in a search query used for testing.

For controlled query changes, read [Extend, hooks, and APIs](/docs/products/search/extend-hooks-and-apis/). If content is missing or the overlay conflicts with the theme, follow [Troubleshoot and support](/docs/products/search/troubleshoot-and-support/).
