---
title: "Develop and test Jetpack Scan"
description: "Build the Scan package and verify its native administrator UI, REST permissions, and threat workflows."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "scan"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/packages/scan/\nprojects/js-packages/scan/\nprojects/plugins/jetpack/modules/scan/","caption":"Jetpack Scan source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Scan project checks","shell":"bash","prompt":"$","command":"jp test js js-packages/scan\npnpm \u002d\u002ddir projects/js-packages/scan run typecheck\njp build plugins/jetpack \u002d\u002ddeps\njp docker phpunit jetpack","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

Scan's native WordPress administrator experience is owned by `projects/packages/scan`. It provides the page shell, initial state, connected-service REST bridges, query layer, routing, threat lists, and fix or ignore flows. Shared threat types, utilities, and components are exported by `projects/js-packages/scan`; the main Jetpack plugin hosts the current product integration. Test consuming Jetpack or Protect surfaces when a shared contract changes.

## Build and test

```bash
jp test js js-packages/scan
pnpm --dir projects/js-packages/scan run typecheck
jp build plugins/jetpack --deps

# After seeding the full Docker WordPress test environment:
jp docker phpunit jetpack
```

The native page package includes a mock mode for local development; use it only on a disposable environment and never enable development shortcuts on a public site. Do not claim unsupported `packages/scan` JavaScript or typecheck commands as test coverage: the shared JavaScript checks belong to `js-packages/scan`, while main-plugin PHP coverage uses the Docker WordPress suite.

## Cover every security state

PHP tests should verify REST capabilities, nonce handling, argument validation, error normalization, connection gates, multisite exclusion, `manage_options`, connected-user requirements, rollout gating, and the initial state. JavaScript tests should cover loading, empty, active-threat, history, ignored, fixable, unfixable, fixing, fixed, and service-error views.

Use fixtures with invented paths and identifiers. Never copy a production threat response, token, malware sample, or customer site details into the repository. A real malware sample is unnecessary for UI and controller tests; mock the service boundary.

## End-to-end checklist

- An unauthorized role cannot load private threat data or invoke mutations.
- A disconnected or ineligible site receives a useful gate, not a broken dashboard.
- Fix and ignore confirmations identify the selected threat and remain keyboard accessible.
- Repeated clicks cannot enqueue duplicate destructive operations.
- Polling stops or backs off on terminal success and failure states.
- Browser navigation and direct routes preserve the expected selected view.
- Threat paths and service errors are escaped and not injected as markup.
- Shared changes are tested in the main Jetpack and Protect experiences that consume them.
- A changelog entry is added under `projects/packages/scan/changelog/`.

Review the pinned [Scan package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/scan). For repository setup, see [Building with Jetpack](/docs/building-with-jetpack/).
