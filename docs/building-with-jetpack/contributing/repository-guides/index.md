---
title: "Contributing to Jetpack: complete source guide"
description: "Preserve the Jetpack monorepo contribution entry point, including testing, bug reports, patches, translation, and licensing."
audience: contributor
document_type: overview
sidebar_position: 1
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/CONTRIBUTING.md"
source_blob: ed8ec86a7ede3ad0c33e4a1e359815fd42b42d75
source_sha256: 43caee4b0fce77effa5596df76706771dab03eb17a8382b8a76532cd5ad763f4
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/CONTRIBUTING.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/audience-paths {"eyebrow":"Choose a contribution path","title":"Start with the work you want to do","description":"The focused guides add current commands and verification around this preserved source document.","paths":[{"title":"Prepare the checkout","description":"Set up the monorepo and a local WordPress environment.","url":"/docs/building-with-jetpack/contributing/development-environment/","cta":"Set up development","icon":"environment","accent":"blue","newTab":false},{"title":"Test a change","description":"Choose the owning project and its PHP, JavaScript, type, and integration checks.","url":"/docs/building-with-jetpack/contributing/automated-testing/","cta":"Plan tests","icon":"testing","accent":"green","newTab":false},{"title":"Open a pull request","description":"Follow the repository workflow, changelog, and review contract.","url":"/docs/building-with-jetpack/contributing/pull-requests/","cta":"Prepare a PR","icon":"code","accent":"gold","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- jetpack-docs:preserved-source:start -->

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

Developers of all levels can help — whether you can barely recognize a filter (or don’t know what that means) or you’ve already authored your own plugins, there are ways for you to pitch in.

## Beta Testing

We're always interested in hearing your feedback about existing and upcoming Jetpack features. The easiest way to help test Jetpack is to [join our Beta group.](/docs/building-with-jetpack/contributing/repository-guides/testing/beta-testing/)

## Create Bug Reports

If you find a bug, please [file a GitHub issue](https://github.com/Automattic/jetpack/issues/). If you want to prefix the title with a “Question:”, “Bug:”, or the general area of the application, that would be helpful, but by no means mandatory. If you have write access, add the appropriate labels.

If you’re filing a bug, specific steps to reproduce are helpful. Please include the URL of the page that has the bug, along with what you expected to see and what happened instead. You can [check our recommendations to create great bug reports here](/docs/using-jetpack/report-a-bug/).

## Write and submit a patch

If you'd like to fix a bug or make an enhancement, you can submit a Pull Request. Before you get started, you'll want to **[set up your development environment.](/docs/building-with-jetpack/contributing/repository-guides/development-environment/)**

Once your development environment is ready, you can get started and [create your first Pull Request!](/docs/building-with-jetpack/contributing/repository-guides/pull-request/)

### Get started

If you'd like to contribute but don't know where to get started, you can take a look at existing issues:

- ["Good First Bug"](https://github.com/Automattic/jetpack/labels/%5BType%5D%20Good%20First%20Bug) issues are a good entry point to get familiar with Jetpack's code base.
- All issues labeled with [the "Good For Community" label](https://github.com/Automattic/jetpack/issues?q=is%3Aopen+sort%3Aupdated-desc+label%3A%22Good+For+Community%22) are fair game. That's a great way to contribute new features and fix small issues within Jetpack.

### We’re Here To Help

We encourage you to ask for help at any point. We want your first experience with Jetpack to be a good one, so don’t be shy. If you’re wondering why something is the way it is, or how a decision was made, you can create an issue and prefix it with “Question:”.

## Translate the plugin

If you speak a foreign language, you can help translate Jetpack into your own language. [here is how.](/docs/using-jetpack/help-translate/)

## License

Jetpack is licensed under [GNU General Public License v2 (or later)](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/LICENSE.txt).

All materials contributed should be compatible with the GPLv2. This means that if you own the material, you agree to license it under the GPLv2 license. If you are contributing code that is not your own, such as adding a component from another Open Source project, or adding an `npm` package, you need to make sure you follow these steps:

1. Check that the code has a license. If you can't find one, you can try to contact the original author and get permission to use, or ask them to release under a compatible Open Source license.
2. Check the license is compatible with [GPLv2](http://www.gnu.org/licenses/license-list.en.html#GPLCompatibleLicenses), note that the Apache 2.0 license is *not* compatible.
<!-- jetpack-docs:preserved-source:end -->
