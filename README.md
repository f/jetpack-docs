# Jetpack Docs

Source-controlled documentation for using Jetpack, working with Jetpack through an AI agent, and building integrations or contributions.

[![Open Jetpack Docs in WordPress Playground](https://img.shields.io/badge/WordPress%20Playground-Open-3858E9?logo=wordpress&logoColor=white)](https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Ff%2Fjetpack-docs%2Fmain%2Fplayground%2Fblueprint.json&page-title=Jetpack%20Docs)

The browser Playground installs the upstream DocsPress theme and blocks plugin, imports this repository's `docs/` directory, applies its five contextual sidebars, activates DocsPress's native Jetpack Global Style and a Jetpack documentation header, signs you in, and opens `/docs/`. The design is the default in every fresh Playground, preserves DocsPress's light and dark modes, and remains editable with ordinary WordPress controls in **Appearance → Editor**. The site is temporary: reload the link to start from a clean installation.

## Documentation paths

- [Using Jetpack](docs/using-jetpack/index.md) — install, configure, operate, and troubleshoot Jetpack products.
- [Using an agent](docs/using-an-agent/index.md) — give an AI agent reliable context and verify its work.
- [Building with Jetpack](docs/building-with-jetpack/index.md) — extend Jetpack and contribute to the monorepo.
- [Products](docs/products/index.md) — lifecycle documentation for the 13 supported product families.
- [Reference](docs/reference/index.md) — hooks, APIs, packages, compatibility, and source maps.

These are independent navigation contexts inspired by the task-oriented organization used in WooCommerce developer documentation. Search remains site-wide; sidebar and adjacent-page navigation stay focused on the reader's current context.

The current `Automattic/jetpack/docs` tree is preserved and reorganized under the relevant task and reference routes. [`docs/source-preservation.json`](docs/source-preservation.json) records every one of its 28 Markdown documents and three supporting artifacts at the pinned source revision, including original blobs, hashes, byte counts, destinations, and the normalized body hashes used here. [`docs/products/source-audit.json`](docs/products/source-audit.json) separately pins the source object reviewed for every product-owned path. Focused guides may clarify or supersede volatile instructions, but the complete source material remains reachable.

## Preview local changes

From this repository root, run:

```bash
npx @wp-playground/cli@3.1.46 start \
  --blueprint=playground/local-blueprint.json \
  --mount="$PWD/docs:/wordpress/docspress-source-docs" \
  --mount="$PWD/playground:/wordpress/jetpack-docs-playground" \
  --no-auto-mount \
  --reset \
  --login
```

This is the upstream DocsPress mounted-directory workflow with its theme, blocks, and importer pinned to commit `517050b6aceb09cacd7dc66c0df2023718e57bd9`. The repository-local blueprint keeps unpushed documentation and Playground configuration authoritative, adds the source metadata needed for DocsPress's `.md` pages and `llms.txt`, and saves the upstream Jetpack style plus Jetpack header as native WordPress editor state. It does not copy or replace the upstream importer, theme, or blocks. `--login` keeps the local browser session editable. Directory landing pages must be named `index.md`; do not add a `README.md` inside `docs/`.

## Validate changes

```bash
npm ci
npm test
```

Validation checks front matter, routes, local links and anchors, all five sidebar assignments, product lifecycle coverage, hook contracts, serialized Gutenberg blocks, source preservation, source revisions, and both Playground blueprints. It also runs DocsPress's pinned Markdown collector over the complete tree.

## Contribute

1. Fork `f/jetpack-docs`, create a focused branch, and edit the authoritative files under `docs/`.
2. Add or update public source links for every version-sensitive claim. When moving preserved Jetpack source documentation, update the import map and preservation registry rather than deleting its material.
3. Run `npm ci` and `npm test`.
4. Run the mounted Playground command above and verify the changed page, navigation, search, `.md` output, and a narrow viewport when presentation is affected.
5. Commit only the documentation and supporting validation changes for the task, push the branch, and open a pull request explaining the outcome and verification.

Do not add generated WordPress content, credentials, a theme, a site plugin, or production synchronization settings to a contribution. Playground visual defaults belong in the one-time configurator and must remain native Global Styles or editable template parts.

## Authoring rules

- Write task-oriented Markdown with a clear outcome, verification, and next step.
- Use only core Gutenberg blocks and blocks supplied by upstream DocsPress.
- Keep Markdown link labels plain text; the pinned DocsPress converter does not round-trip inline-code spans inside a link label.
- Treat public source code and canonical product documentation as evidence; link volatile plan and availability details instead of copying them.
- Never include credentials, customer data, private WordPress.com URLs, or undocumented service endpoints.
- Keep compatibility claims tied to the revisions in [`docs/source-revisions.json`](docs/source-revisions.json).
- Keep the physical Markdown tree authoritative and update [`docs/sidebars.json`](docs/sidebars.json) only when a whole reader context changes.

To reproduce the upstream preservation layer from a checkout at the pinned Jetpack revision, run:

```bash
node scripts/import-jetpack-docs.mjs /path/to/pinned/jetpack
node scripts/enrich-product-pages.mjs
node scripts/enrich-hook-pages.mjs
npm test
```

## Scope

This repository contains documentation and its Playground/validation settings only. Its one-time configurator saves native WordPress editor state; it is not a theme or site plugin and does not run after setup. The repository contains no product code, production publishing workflow, or WordPress credentials.

## License

Jetpack Docs is licensed under the GNU General Public License v2 or later. See [LICENSE.txt](LICENSE.txt).
