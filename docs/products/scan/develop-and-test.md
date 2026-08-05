---
title: "Develop and test Jetpack Scan"
description: "Build the Scan package and verify its native administrator UI, REST permissions, and threat workflows."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "scan"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Scan's native WordPress administrator experience is owned by `projects/packages/scan`. It provides the page shell, initial state, connected-service REST bridges, query layer, routing, threat lists, and fix or ignore flows. Test consuming Jetpack or Protect surfaces when a shared contract changes.

## Build and test

```bash
jp install packages/scan
jp build packages/scan
jp test php packages/scan
jp test js packages/scan
jp phan packages/scan
pnpm --dir projects/packages/scan run typecheck
```

Use `jp watch packages/scan` for the UI. The package includes a mock mode for local development; use it only on a disposable environment and never enable development shortcuts on a public site.

## Cover every security state

PHP tests should verify REST capabilities, nonce handling, argument validation, error normalization, connection gates, and the initial state. JavaScript tests should cover loading, empty, active-threat, history, ignored, fixable, unfixable, fixing, fixed, and service-error views.

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

Review the pinned [Scan package source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/scan). For repository setup, see [Building with Jetpack](/docs/building-with-jetpack/).
