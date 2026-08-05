---
title: Extend blocks and editor features
description: Extend Jetpack editor experiences through WordPress block contracts and registered extension points.
audience: developer
document_type: how-to
sidebar_position: 40
sidebar_collapsed: true
---

Jetpack block projects use WordPress block registration plus Jetpack's shared Blocks package. Build integrations on WordPress block APIs and product-documented extension points, not on generated JavaScript bundles or private component state.

## Choose a stable surface

- Use `register_block_type()` and `block.json` for a new block.
- Use block variations or documented JavaScript filters for a controlled variation of an existing block.
- Use `render_block` only when a server-side transformation cannot be expressed by the block's own render callback; scope by block name and preserve valid markup.
- Use a Jetpack package only when its README describes the consumed API.

Saved block markup is content, so changing attributes or serialization requires a migration or deprecated block version. Test both the editor and front end, including invalid-content recovery, keyboard navigation, narrow viewports, and RTL layouts.

The `jetpack_register_gutenberg_extensions` action exists inside the Jetpack plugin, but its callback guidance references Jetpack implementation classes. Treat it as a contribution surface unless a product guide explicitly supports third-party use. For external integrations, WordPress block registration is the safer contract.

See [Blocks and editor interfaces](../reference/blocks-and-editor-interfaces.md) and the [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/).
