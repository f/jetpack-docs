---
title: "Extend Jetpack Scan: supported boundaries"
description: "Keep third-party integrations outside Scan's private administrator routes and connected-service credentials."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "scan"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Scan extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Native Scan package","type":"object","required":false,"defaultValue":"","description":"Contribute wp-admin state and privileged bridges in projects/packages/scan.","values":"","deprecated":false},{"name":"@automattic/jetpack-scan","type":"object","required":false,"defaultValue":"","description":"Reuse documented types, utilities, and threat components in authorized Jetpack interfaces.","values":"","deprecated":false},{"name":"No public control-route contract","type":"object","required":false,"defaultValue":"","description":"No public Scan ability or remote control API exists at this revision.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack Scan does not expose a documented public PHP-hook, WordPress Ability, or remote REST API for third-party scan control at the reviewed revision. The `automattic/jetpack-scan-page` package registers authenticated `jetpack/v4/site/scan/*` WordPress routes that bridge its native administrator UI to the connected service. These routes support product screens for status, history, findings, fixes, and ignore decisions; they are privileged UI plumbing, not a compatibility contract for external clients.

The package fires a source-defined `jetpack_scan_page_initialized` lifecycle action only when the gated native page initializes. The reviewed public product documentation does not establish it as a stable third-party extension point. Do not build critical monitoring around it or interpret it as evidence that a remote scan completed successfully. The `jetpack_disable_scan` source filter likewise lacks the versioned stability contract required for this curated hook catalog.

Immutable contributor sources: [class-jetpack-scan.php](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/scan/src/class-jetpack-scan.php) and [class-rest-controller.php](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/scan/src/class-rest-controller.php).

## Do not expose control routes

Never create a front-end proxy that starts scans, returns threat details, ignores findings, or applies fixes. Never forward Jetpack connection tokens or WordPress nonces to an external scanner. A threat fix can modify site files and requires a deliberate, current administrator decision.

## Build a separate security integration

If an operations platform needs security findings, use a scanner or vulnerability-data provider with a documented API and its own least-privileged credentials. Keep its records separate from Scan's UI cache, protect file paths and site identifiers, and require confirmation for destructive remediation.

Within WordPress, your plugin may detect whether the Scan package is active through ordinary plugin/package behavior, but it must work when Scan is absent or disconnected. Link administrators to the supported Scan dashboard rather than embedding private responses. Use [REST API boundaries](/docs/reference/rest-api/), [Hook usage and stability](/docs/reference/hooks/), and [Privacy and data boundaries](/docs/reference/privacy-and-data-boundaries/) as shared policy.

## JavaScript package

`@automattic/jetpack-scan` exports Scan types, constants, utilities, and the `ThreatFixerButton`, `ThreatModal`, `ThreatSeverityBadge`, and `ThreatsDataViews` components. It is a source-controlled UI package, not permission to retrieve private threat data. A consuming Jetpack interface must supply authorized, validated data and preserve confirmation and capability boundaries around remediation. Review the pinned [package metadata](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/scan/package.json#L1-L27) and [component exports](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/scan/src/components/index.js#L1-L4).

When contributing to the package itself, the internal routes are valid implementation surfaces and must retain their capability, nonce, validation, and service-error protections. That is repository development, not third-party API use.
