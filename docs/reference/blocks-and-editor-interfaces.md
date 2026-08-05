---
title: Blocks and editor interfaces
description: Reference the supported WordPress and Jetpack boundaries for block registration, content, and editor UI.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
---

Jetpack blocks are WordPress blocks. Their stable boundary begins with registered block metadata and saved content, while editor components and build output may remain implementation details.

## Contract layers

| Layer | Contract to inspect |
| --- | --- |
| Registration | Block name, `block.json`, attributes, supports, style/script handles, and render callback |
| Editor | Documented WordPress filters, variations, transforms, keyboard behavior, and permissions |
| Saved content | Serialized attributes, inner blocks, markup migrations, and deprecated versions |
| Front end | Dynamic render output, assets, cache variation, escaping, and theme compatibility |
| Shared Jetpack package | `automattic/jetpack-blocks` Composer metadata and its published README/API |

Do not import files from another project's generated `build` or `dist` directory. Do not change saved attributes without a migration path. A block that works in the editor is incomplete until its published content renders after reload, with Jetpack inactive where graceful fallback is expected.

Primary sources: [Jetpack Blocks package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/blocks), [Jetpack block extensions](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/blocks), and the [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/).
