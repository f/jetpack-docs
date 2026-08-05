---
title: Coding guidelines
description: Apply Jetpack's PHP, JavaScript, TypeScript, CSS, documentation, and accessibility conventions.
audience: contributor
document_type: how-to
sidebar_position: 50
sidebar_collapsed: true
---

Follow the conventions of the project you are editing, then the repository-wide standards. Do not reformat unrelated code.

## PHP

Use WordPress PHP Coding Standards, prefix global functions and hooks, verify nonces, check capabilities, sanitize input, escape output, and prepare database statements. New syntax must be compatible with the project's declared PHP minimum. In version annotations, write `@since $$next-version$$`; release automation supplies the number.

## JavaScript and TypeScript

Use the existing project build and imports. Direct React imports and `@wordpress/element` are both valid; match the surrounding package. Use `@wordpress/i18n` for user-visible strings with the project's text domain. When TypeScript is compiled by Webpack, follow the repository's Babel TypeScript convention.

## Styles and interfaces

Use the project's BEM-like naming, logical CSS properties for RTL, existing design tokens, semantic HTML, visible focus, keyboard operation, and appropriate announcements for dynamic changes. Verify editor and front-end behavior at narrow and wide widths.

Run the project's linters and read the [pinned coding guidelines](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/docs/coding-guidelines.md) before requesting review.
