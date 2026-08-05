---
title: "Extend Jetpack Protect: hooks and supported boundaries"
description: "Use Protect's documented hooks and packages without weakening authentication or treating dashboard routes as a public API."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "protect"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack Protect extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Protect packages","type":"object","required":false,"defaultValue":"","description":"Use protect-models and protect-status for their documented data contracts.","values":"","deprecated":false},{"name":"Account Protection policy","type":"object","required":false,"defaultValue":"","description":"Narrow protected-user decisions without disabling protection broadly.","values":"","deprecated":false},{"name":"Recovery email policy","type":"object","required":false,"defaultValue":"","description":"Suppress recovery mail only when an equivalent secure recovery path exists.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Protect exposes a small set of PHP policy hooks owned by its shared Account Protection and WAF packages. Two curated filters are appropriate for integrations that preserve the default security decision:

- [jetpack_account_protection_user_requires_protection](/docs/reference/hooks/filters/jetpack-account-protection-user-requires-protection/) narrows whether a specific user needs Account Protection.
- [jetpack_protect_can_send_recovery_emails](/docs/reference/hooks/filters/jetpack-protect-can-send-recovery-emails/) controls whether the blocked-login recovery screen may send mail.

These are security controls, not convenience toggles. Never return a blanket value for every user or request, never log authentication codes or email payloads, and always provide an equivalent recovery path when suppressing mail. Other raw hooks such as `jpp_allow_login` can bypass login protection and are intentionally not presented as routine extension points here.

The plugin dashboard also registers authenticated WordPress REST routes for status, scan history, threat decisions, fixes, scanning, and firewall state. Those routes are implementation details of the Protect UI, not a remote API.

Do not:

- Replay dashboard requests from another service.
- Persist or forward WordPress nonces or Jetpack connection tokens.
- Call threat-fix or ignore routes without the product's confirmation workflow.
- Treat a locally cached threat count as complete security telemetry.
- Depend on route names or response fields as a compatibility promise.

The immutable controller source is [projects/plugins/protect/src/class-rest-controller.php](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/protect/src/class-rest-controller.php). It is useful for contributing to Protect, not as public client documentation.

## Safe integration choices

For site-management automation, use documented WordPress APIs to inventory installed versions and the public vulnerability-data contract of the service you have chosen. Keep that system separate from Protect's private connected-service credentials. Send findings to an administrator for confirmation before updates, deletes, or remediation.

For a WordPress compatibility plugin, detect Protect with ordinary plugin APIs and remain functional when it is absent. Prefer configuration through the Protect dashboard. Use only hooks explicitly documented in [the hooks reference](/docs/reference/hooks/) and pin the product version you tested.

## Public package contracts

`automattic/jetpack-protect-models` defines typed vulnerability and threat models shared by Jetpack products. `automattic/jetpack-protect-status` provides status access, including [Status::get_status()](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/protect-status/src/class-status.php#L53-L74). Consume these through the Jetpack Autoloader, feature-detect the classes and methods you use, and treat a cached or unavailable status as unknown rather than safe.

## Firewall and remediation boundary

A security integration must not weaken authorization to improve compatibility. Never disable a firewall globally from a front-end request, create a public “run scan” endpoint, or expose threat details to users without the required capability. If a legitimate webhook or REST client is blocked, narrow the rule at the supported layer and verify both the integration and the original protection still work.

See [REST API boundaries](/docs/reference/rest-api/) and [Privacy and data boundaries](/docs/reference/privacy-and-data-boundaries/) for shared guidance. Product behavior belongs in [Use and configure](/docs/products/protect/use-and-configure/).
