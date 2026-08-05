---
title: "Jetpack Search"
description: "Replace WordPress's local search with a connected, cloud-powered search experience and filters."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: true
product: "search"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack Search","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack Search setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack Search and verify its primary outcome.","url":"/docs/products/search/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/search/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/search/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/search/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eSearch must never expose private, draft, restricted, or deleted content through results, facets, snippets, or cached indexes. Treat exposure as a security issue.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Search provides a cloud-backed search index and WordPress search interfaces. The pinned source recognizes five experiences: **Embedded**, **Overlay**, **Blocks Overlay** (beta), **Inline/theme**, and **Off**. Classic or Inline search can replace the result query behind a theme template; Instant Search experiences can render remote fields directly with filters and facets. The separate Jetpack Search plugin uses shared Jetpack connection, Search, Sync, and Stats packages from the monorepo.

Search is a good fit for content-heavy sites and stores where visitors need relevance, fast results, spelling assistance, or filtering by fields such as content type, taxonomy, or date. It is not a substitute for deciding which content is public: only index content that the site is allowed to expose through search.

## What to decide first

- Which post types and taxonomies visitors should be able to discover.
- Whether the theme's search template or the Instant Search experience should be the primary interface.
- Which filters are useful on mobile as well as desktop.
- How search terms and interaction analytics fit the site's privacy disclosures and consent model.
- Which connected account is responsible for the site's Search service.

The service must receive content changes to maintain its index. A newly published or edited item may not appear immediately, so verification should distinguish an indexing delay from a display problem.

Activation requires a connected site, non-offline mode, and an eligible Search product. The standalone plugin keeps Stats available for Search interaction measurement. Dashboard operations require `manage_options`, while Customizer changes require `edit_theme_options`; public visitor queries are a separate surface, and private sites use authenticated Instant Search requests.

## Start here

1. Install and activate Jetpack Search.
2. Connect the site when prompted and confirm that the expected product is active.
3. Let initial indexing complete before judging coverage.
4. Configure the search experience and a small set of meaningful filters.
5. Test exact titles, uncommon terms, misspellings, products, and content that must remain excluded.

Use [Use and configure](/docs/products/search/use-and-configure/) for the full workflow. Developers can customize selected query behavior through documented PHP filters in [Extend, hooks, and APIs](/docs/products/search/extend-hooks-and-apis/).

Source evidence: [Search plugin](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/search), [Search package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/search), and [Jetpack Search support](https://jetpack.com/support/search/).
