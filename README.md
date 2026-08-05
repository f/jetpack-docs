# Jetpack Docs

Source-controlled documentation for using Jetpack, working with Jetpack through an AI agent, and building integrations or contributions.

[![Open Jetpack Docs in WordPress Playground](https://img.shields.io/badge/WordPress%20Playground-Open-3858E9?logo=wordpress&logoColor=white)](https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Ff%2Fjetpack-docs%2Fmain%2Fplayground%2Fblueprint.json&page-title=Jetpack%20Docs)

The browser Playground installs the upstream DocsPress theme and blocks plugin, imports this repository's `docs/` directory, signs you in, and opens `/docs/`. It is temporary: reload the link to start from a clean site.

## Documentation paths

- [Using Jetpack](docs/using-jetpack/index.md) — install, configure, operate, and troubleshoot Jetpack products.
- [Using an agent](docs/using-an-agent/index.md) — give an AI agent reliable context and verify its work.
- [Building with Jetpack](docs/building-with-jetpack/index.md) — extend Jetpack and contribute to the monorepo.
- [Products](docs/products/index.md) — lifecycle documentation for the 13 supported product families.
- [Reference](docs/reference/index.md) — hooks, APIs, packages, compatibility, and source maps.

## Preview local changes

From this repository root, run:

```bash
npx @wp-playground/cli@3.1.46 start \
  --blueprint=playground/local-blueprint.json \
  --mount="$PWD/docs:/wordpress/docspress-source-docs" \
  --no-auto-mount \
  --reset
```

This is the upstream DocsPress mounted-directory workflow with its theme, blocks, and importer pinned to commit `517050b6aceb09cacd7dc66c0df2023718e57bd9`. The repository-local blueprint keeps unpushed files authoritative and adds the source metadata needed for DocsPress's `.md` pages and `llms.txt`; it does not copy or replace the upstream importer. Directory landing pages must be named `index.md`; do not add a `README.md` inside `docs/`.

## Validate changes

```bash
npm ci
npm test
```

Validation checks front matter, routes, local links and anchors, product lifecycle coverage, hook contracts, Gutenberg block namespaces, source revisions, and the Playground blueprint. It also runs DocsPress's pinned Markdown collector over the complete tree.

## Contribute

1. Fork `f/jetpack-docs`, create a focused branch, and edit the authoritative files under `docs/`.
2. Add or update public source links for every version-sensitive claim. Do not copy prose from the former Jetpack monorepo documentation.
3. Run `npm ci` and `npm test`.
4. Run the mounted Playground command above and verify the changed page, navigation, search, `.md` output, and a narrow viewport when presentation is affected.
5. Commit only the documentation and supporting validation changes for the task, push the branch, and open a pull request explaining the outcome and verification.

Do not add generated WordPress content, credentials, a theme, a site plugin, or production synchronization settings to a contribution.

## Authoring rules

- Write task-oriented Markdown with a clear outcome, verification, and next step.
- Use only core Gutenberg blocks and blocks supplied by upstream DocsPress.
- Treat public source code and canonical product documentation as evidence; link volatile plan and availability details instead of copying them.
- Never include credentials, customer data, private WordPress.com URLs, or undocumented service endpoints.
- Keep compatibility claims tied to the revisions in [`docs/source-revisions.json`](docs/source-revisions.json).

## Scope

This repository contains documentation and its Playground/validation settings only. It does not contain a WordPress theme, site plugin, product code, production publishing workflow, or WordPress credentials.

## License

Jetpack Docs is licensed under the GNU General Public License v2 or later. See [LICENSE.txt](LICENSE.txt).
