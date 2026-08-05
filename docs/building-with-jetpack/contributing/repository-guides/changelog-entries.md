---
title: "Writing a good changelog entry: complete source guide"
description: "Preserve the rationale, commands, and examples for Jetpack project changelog entries."
audience: contributor
document_type: how-to
sidebar_position: 90
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/writing-a-good-changelog-entry.md"
source_blob: 85b5d7b8209910ccaa6cbcdc8a64a94b931ef047
source_sha256: 6e798ee4fba92efa534cada05e30e984262bdb0a7f08d83cc6a44f68084ea156
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/writing-a-good-changelog-entry.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

Part of our standard [Pull Request process](/docs/building-with-jetpack/contributing/repository-guides/monorepo/#jetpack-changelogger) includes submitting a changelog entry for your changes, which this document provides guidance on.

## How do I create a changelog entry?

**[Follow the instructions here to use the changelogger tool to create a new entry.](/docs/building-with-jetpack/contributing/repository-guides/monorepo/#using-the-jetpack-changelogger)**

## Do I even need to write a changelog entry?

Yes, almost every change to a project should have a changelog entry.

For the Jetpack plugin, our changelog is intended primarily for end users and third-party developers who use our public APIs and packages. As of 9.7, we've added an "Other changes" section for non-user-facing changes.

Other projects in the Jetpack monorepo also benefit from managing an accurate changelog.

If you've done something really trivial, you would still include a change file with a ["Comment" header](/docs/building-with-jetpack/contributing/repository-guides/monorepo/#using-the-jetpack-changelogger) which would be omitted from the generated changelog, but still serve as documentation to other developers.

If you're ever unsure, feel free to ask for help.

## What should I write?

### In the Jetpack plugin

The actual changelog text typically begins with a relevant component name, feature, tool, or other topic, followed by a colon, such as "Payments Block:" or "Sync:".

The rest of the changelog entry is a sentence fragment (beginning with a bare infinitive verb) describing what the PR does. Remember that this is aimed at end users, so be wary of jargon and details of the code. If it helps, think about filling in the blank "This PR will ______".

Some good examples:

* Contact Form Block: display fallback link when the block is rendered in non-WordPress contexts, such as subscription emails.
* Edit Post API: restore post comments when untrashing a post, such as via the mobile apps.
* Instagram Embeds: add support for embed parameters supported by Instagram.
* Payments Block: move unreadable notice to the sidebar.
* Search: improve URL formatting for the expanded search layout.
* Sitemaps: ensure that the Home URL is slashed on subdirectory websites.
* WhatsApp Button: fix Guyana country code metadata.
* General: ensure Jetpack's full compatibility with the upcoming WordPress 5.6 release.
* General: update Jetpack's minimum required WordPress version to 5.5, in anticipation of the upcoming WordPress 5.6 release.

You can find more examples by looking at [prior Jetpack releases](https://github.com/Automattic/jetpack-production/releases).

### In other projects

Other projects are generally single components, and so usually do not need a component name prefix. For example, everything in packages/sync would probably be "Sync:". But feel free to use one if it does make sense.
<!-- jetpack-docs:preserved-source:end -->
