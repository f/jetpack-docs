---
title: "Develop and test Jetpack Protect"
description: "Build the Protect plugin and verify vulnerability, threat, firewall, and permission behavior."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "protect"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/protect/\nprojects/packages/\n  account-protection/\n  protect-models/\n  protect-status/\n  waf/\nprojects/js-packages/scan/","caption":"Jetpack Protect source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack Protect project checks","shell":"bash","prompt":"$","command":"jp install plugins/protect\njp build plugins/protect \u002d\u002ddeps\njp test php plugins/protect\njp test php packages/protect-models\njp test php packages/protect-status\njp test php packages/account-protection\njp test php packages/waf\njp test js js-packages/scan\npnpm \u002d\u002ddir projects/js-packages/scan run typecheck\njp phan plugins/protect","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

Protect is owned in `projects/plugins/protect`. It consumes shared Jetpack connection, My Jetpack, status, WAF, and related packages, so build dependencies when a shared contract changes.

## Build and static checks

```bash
jp install plugins/protect
jp build plugins/protect --deps
jp test php plugins/protect
jp test php packages/protect-models
jp test php packages/protect-status
jp test php packages/account-protection
jp test php packages/waf
jp test js js-packages/scan
pnpm --dir projects/js-packages/scan run typecheck
jp phan plugins/protect
pnpm --dir projects/plugins/protect run typecheck
```

Use `jp watch plugins/protect` for dashboard assets. The project does not define a standalone Jest command in its plugin package metadata at the research pin; do not claim a skipped `jp test js` run provides UI coverage. Use the Protect end-to-end project and the relevant shared-package tests for browser and component behavior.

## Exercise security states

Use a disposable WordPress site and the repository's Debug Helper or mock facilities to render clean, vulnerable, disconnected, loading, service-error, malware, fixable, unfixable, ignored, and firewall states. Never introduce real vulnerable software or malware on a shared or internet-accessible environment.

Permission tests must cover unauthenticated, subscriber, editor, and authorized administrator requests. Every mutating REST callback needs the appropriate capability, nonce, input validation, and failure response. Verify that threat counts and admin-bar notices are not shown to users who cannot open the Protect screen. Add explicit tests for Account Protection user selection, authentication-email delivery and redaction, blocked-login recovery, WAF decisions, and the documented `protect-status` model contract.

## Regression checklist

- Confirm a vulnerability identifies the correct component and version.
- Verify ignore and unignore are reversible and keep an audit-friendly state.
- Treat a fix request as asynchronous when the service reports progress; prevent duplicate clicks.
- Test firewall enable/disable failure and recovery without locking out the test administrator.
- Verify disconnected and expired-authorization flows do not expose cached private details.
- Check accessibility of status, threat tables, confirmations, progress, and errors.
- Add a changelog entry under `projects/plugins/protect/changelog/`.

Review the pinned [Protect project](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/protect). For repository rules, see [Building with Jetpack](/docs/building-with-jetpack/); for malware-product UI work, also inspect [Develop and test Jetpack Scan](/docs/products/scan/develop-and-test/).
