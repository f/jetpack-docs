---
title: Compatibility and version policy
description: Interpret Jetpack project versions, supported runtimes, public contracts, and deprecations.
audience: developer
document_type: reference
sidebar_position: 90
sidebar_collapsed: true
---

Jetpack products and packages release independently. Compatibility must be evaluated for the exact plugin or package, not inferred from the monorepo commit alone.

At the pinned research revision, the repository matrix declares WordPress 6.9 as the minimum for the main plugin and CI coverage from PHP 7.2 through 8.5. Those values will change; consult `.github/versions.sh`, the plugin header, and the selected project's dependency metadata for the branch being shipped.

## Public-contract rules

- Treat documented hooks, REST schemas, block serialization, and package exports as versioned contracts.
- Feature-detect optional integrations and preserve behavior when the owning product is inactive.
- Do not use syntax newer than the project's PHP minimum.
- Use `$$next-version$$` for new source annotations inside the monorepo.
- Follow deprecation notices and migrate before removal; do not silence them globally.
- Test the lowest and highest versions claimed by your integration.

An immutable source link proves what one revision implements; it does not prove every installed version behaves identically. See the pinned [version matrix](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/.github/versions.sh) and [deprecated hooks](hooks/deprecated-hooks-and-replacements.md).
