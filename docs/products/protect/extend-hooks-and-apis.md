---
title: "Extend Jetpack Protect: supported boundaries"
description: "Understand why Protect's authenticated dashboard routes are not a public security-automation API."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "protect"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

The Protect plugin at the reviewed revision does not expose a documented public PHP-hook contract for third-party security automation. Its dashboard registers authenticated WordPress REST routes for product operations such as status, scan history, threat decisions, fixes, scanning, and firewall state. Those routes are implementation details of the Protect UI, not a remote API.

Do not:

- Replay dashboard requests from another service.
- Persist or forward WordPress nonces or Jetpack connection tokens.
- Call threat-fix or ignore routes without the product's confirmation workflow.
- Treat a locally cached threat count as complete security telemetry.
- Depend on route names or response fields as a compatibility promise.

The immutable controller source is [`projects/plugins/protect/src/class-rest-controller.php`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/protect/src/class-rest-controller.php). It is useful for contributing to Protect, not as public client documentation.

## Safe integration choices

For site-management automation, use documented WordPress APIs to inventory installed versions and the public vulnerability-data contract of the service you have chosen. Keep that system separate from Protect's private connected-service credentials. Send findings to an administrator for confirmation before updates, deletes, or remediation.

For a WordPress compatibility plugin, detect Protect with ordinary plugin APIs and fail open when it is absent. Prefer configuration through the Protect dashboard. If source-defined hooks are added later, use only those explicitly documented in [the hooks reference](/docs/reference/hooks/) and pin the product version you tested.

## Firewall and remediation boundary

A security integration must not weaken authorization to improve compatibility. Never disable a firewall globally from a front-end request, create a public “run scan” endpoint, or expose threat details to users without the required capability. If a legitimate webhook or REST client is blocked, narrow the rule at the supported layer and verify both the integration and the original protection still work.

See [REST API boundaries](/docs/reference/rest-api/) and [Privacy and data boundaries](/docs/reference/privacy-and-data-boundaries/) for shared guidance. Product behavior belongs in [Use and configure](/docs/products/protect/use-and-configure/).
