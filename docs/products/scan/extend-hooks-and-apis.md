---
title: "Extend Jetpack Scan: supported boundaries"
description: "Keep third-party integrations outside Scan's private administrator routes and connected-service credentials."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "scan"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack Scan does not expose a documented public PHP-hook or remote REST API for third-party scan control. The `automattic/jetpack-scan-page` package registers authenticated WordPress routes that bridge its native administrator UI to the connected service. These routes support product screens for status, history, findings, fixes, and ignore decisions; they are not a compatibility contract for external clients.

The package fires a source-defined `jetpack_scan_page_initialized` lifecycle action, but the reviewed public product documentation does not establish it as a stable third-party extension point. Do not build critical monitoring around it or interpret it as evidence that a scan completed successfully.

Immutable contributor sources: [`class-jetpack-scan.php`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/scan/src/class-jetpack-scan.php) and [`class-rest-controller.php`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/scan/src/class-rest-controller.php).

## Do not expose control routes

Never create a front-end proxy that starts scans, returns threat details, ignores findings, or applies fixes. Never forward Jetpack connection tokens or WordPress nonces to an external scanner. A threat fix can modify site files and requires a deliberate, current administrator decision.

## Build a separate security integration

If an operations platform needs security findings, use a scanner or vulnerability-data provider with a documented API and its own least-privileged credentials. Keep its records separate from Scan's UI cache, protect file paths and site identifiers, and require confirmation for destructive remediation.

Within WordPress, your plugin may detect whether the Scan package is active through ordinary plugin/package behavior, but it must work when Scan is absent or disconnected. Link administrators to the supported Scan dashboard rather than embedding private responses. Use [REST API boundaries](/docs/reference/rest-api/), [Hook usage and stability](/docs/reference/hooks/), and [Privacy and data boundaries](/docs/reference/privacy-and-data-boundaries/) as shared policy.

When contributing to the package itself, the internal routes are valid implementation surfaces and must retain their capability, nonce, validation, and service-error protections. That is repository development, not third-party API use.
