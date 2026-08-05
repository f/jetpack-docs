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

## Explore the saved-content boundary

Choose a rendering model in this self-contained lab. It does not contact a site; it turns the contract above into a review checklist you can copy into an integration plan.

<!-- wp:docspress/code-playground {"title":"Static or dynamic block?","html":"\u003cfieldset\u003e\u003clegend\u003eHow should the front end be produced?\u003c/legend\u003e\u003clabel\u003e\u003cinput type=\u0022radio\u0022 name=\u0022model\u0022 value=\u0022static\u0022 checked\u003e Saved markup\u003c/label\u003e\u003clabel\u003e\u003cinput type=\u0022radio\u0022 name=\u0022model\u0022 value=\u0022dynamic\u0022\u003e PHP render callback\u003c/label\u003e\u003c/fieldset\u003e\n\u003csection class=\u0022result\u0022 aria-live=\u0022polite\u0022\u003e\u003c/section\u003e","css":"body { font: 16px/1.5 system-ui; padding: 1rem; }\nfieldset { display: grid; gap: .6rem; border: 1px solid #8c8f94; border-radius: .5rem; }\n.result { margin-top: 1rem; padding: 1rem; background: #f6f7f7; border-inline-start: 4px solid #3858e9; }\n.result h2 { margin-top: 0; font-size: 1.1rem; }","javascript":"const result = document.querySelector( '.result' );\nconst copy = {\n  static: [ 'Saved markup contract', 'Define attributes in block.json; keep save output valid; add a deprecated version or migration when serialization changes.' ],\n  dynamic: [ 'Server render contract', 'Define attributes in block.json; validate and escape in the render callback; test cache, permission, and missing-plugin behavior.' ]\n};\nfunction render() {\n  const model = document.querySelector( '[name=\u0022model\u0022]:checked' ).value;\n  const [ title, text ] = copy[ model ];\n  result.innerHTML = `\u003ch2\u003e${ title }\u003c/h2\u003e\u003cp\u003e${ text }\u003c/p\u003e`;\n}\ndocument.querySelectorAll( '[name=\u0022model\u0022]' ).forEach( input =\u003e input.addEventListener( 'change', render ) );\nrender();","height":300,"autoRun":true,"showConsole":false,"allowNetwork":false} /-->

The `jetpack_register_gutenberg_extensions` action exists inside the Jetpack plugin, but its callback guidance references Jetpack implementation classes. Treat it as a contribution surface unless a product guide explicitly supports third-party use. For external integrations, WordPress block registration is the safer contract.

See [Blocks and editor interfaces](../reference/blocks-and-editor-interfaces.md) and the [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/).
