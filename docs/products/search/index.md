---
title: "Jetpack Search"
description: "Replace WordPress's local search with a connected, cloud-powered search experience and filters."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "search"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Search provides a cloud-backed search index and a WordPress search interface. It can replace a theme's classic search result query and can provide an instant-search overlay with filters and facets. The separate Jetpack Search plugin uses shared Jetpack connection and Search packages from the monorepo.

Search is a good fit for content-heavy sites and stores where visitors need relevance, fast results, spelling assistance, or filtering by fields such as content type, taxonomy, or date. It is not a substitute for deciding which content is public: only index content that the site is allowed to expose through search.

## What to decide first

- Which post types and taxonomies visitors should be able to discover.
- Whether the theme's search template or the Instant Search experience should be the primary interface.
- Which filters are useful on mobile as well as desktop.
- How search terms and interaction analytics fit the site's privacy disclosures and consent model.
- Which connected account is responsible for the site's Search service.

The service must receive content changes to maintain its index. A newly published or edited item may not appear immediately, so verification should distinguish an indexing delay from a display problem.

## Start here

1. Install and activate Jetpack Search.
2. Connect the site when prompted and confirm that the expected product is active.
3. Let initial indexing complete before judging coverage.
4. Configure the search experience and a small set of meaningful filters.
5. Test exact titles, uncommon terms, misspellings, products, and content that must remain excluded.

Use [Use and configure](/docs/products/search/use-and-configure/) for the full workflow. Developers can customize selected query behavior through documented PHP filters in [Extend, hooks, and APIs](/docs/products/search/extend-hooks-and-apis/).

Source evidence: [Search plugin](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/search), [Search package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/search), and [Jetpack Search support](https://jetpack.com/support/search/).
