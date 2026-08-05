---
title: Building with Jetpack
description: Choose a supported Jetpack extension surface, build an integration, and verify it against public contracts.
audience: developer
document_type: overview
sidebar_position: 40
sidebar_collapsed: false
---

Jetpack is a family of WordPress plugins plus reusable PHP and JavaScript packages. Start with the narrowest public interface that solves the problem; depending on the product, that may be a WordPress hook, a block extension, a REST route, or a published package.

<!-- wp:docspress/audience-paths {"eyebrow":"Choose a build path","title":"What are you changing?","description":"Use a focused integration guide for code outside Jetpack, or the repository guides for changes that belong upstream.","paths":[{"title":"Build beside Jetpack","description":"Create a removable companion plugin against a documented hook, block, package, or API.","url":"/docs/building-with-jetpack/choose-an-extension-point/","cta":"Choose an interface","icon":"plug","accent":"blue","newTab":false},{"title":"Contribute to Jetpack","description":"Prepare the monorepo, find the owning project, test the change, and open a focused pull request.","url":"/docs/building-with-jetpack/contributing/","cta":"Start contributing","icon":"contribute","accent":"green","newTab":false},{"title":"Read complete source guides","description":"Use the reorganized, hash-tracked documentation preserved from Automattic/jetpack/docs.","url":"/docs/building-with-jetpack/contributing/repository-guides/","cta":"Browse source guides","icon":"repository","accent":"gold","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

## Follow the integration path

1. [Choose an extension point](choose-an-extension-point.md) and confirm that it belongs to the product you plan to extend.
2. [Build a first integration](build-a-first-integration.md) in a separate plugin so it can be activated, tested, and removed independently.
3. Use the relevant guide for [hooks](hooks-and-filters.md), [blocks](blocks-and-editor-features.md), [REST APIs](rest-apis.md), [connection](connection-and-authentication.md), [Sync](sync-and-data-flow.md), or [packages](reuse-jetpack-packages.md).
4. [Test the integration](test-an-integration.md) with the product active and inactive, then review its [security, privacy, performance, and compatibility](security-privacy-performance-compatibility.md).

If your change belongs in Jetpack itself, use the [contributor quick start](contributing/index.md). Its [complete source guides](contributing/repository-guides/index.md) preserve every document from the pinned monorepo docs tree while the shorter task pages keep current commands and decisions easy to find. Product-specific entry points live in the [product catalog](../products/index.md), while exact contracts live in [Reference](../reference/index.md).

## Supported does not mean permanent

Public interfaces can still evolve. Declare the WordPress and Jetpack versions you test, preserve the incoming values of filters you do not own, and disable only the dependent feature when its required Jetpack component is unavailable so the rest of the site keeps operating. Fail closed for authentication, authorization, and other security decisions. Do not call an internal class merely because it is accessible in PHP.
