---
title: "Develop and test Jetpack VideoPress"
description: "Build the standalone VideoPress plugin and its shared package, then verify upload, block, and playback flows."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "videopress"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack","tree":"projects/plugins/videopress/\nprojects/plugins/jetpack/modules/videopress/\nprojects/packages/videopress/","caption":"Jetpack VideoPress source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack VideoPress project checks","shell":"bash","prompt":"$","command":"jp install plugins/videopress\njp build packages/videopress \u002d\u002ddeps\njp docker link-plugin videopress\njp test php packages/videopress\njp test js packages/videopress\njp test typecheck packages/videopress\njp phan packages/videopress","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

The standalone entry point lives in `projects/plugins/videopress`; most PHP, editor, uploader, dashboard, and REST behavior lives in `projects/packages/videopress`. The plugin's watch command delegates to the package for this reason.

## Build

```bash
jp install plugins/videopress
jp build packages/videopress
jp docker link-plugin videopress
```

For local iteration, link the standalone plugin to the disposable Jetpack Docker site and use `jp watch packages/videopress`. Confirm the package build completes before diagnosing a missing block or dashboard asset.

## Test

```bash
jp test php packages/videopress
jp test js packages/videopress
jp test typecheck packages/videopress
jp phan packages/videopress
jp phan plugins/videopress
```

Add tests at the owning layer. PHP coverage should include permissions, attachment metadata, REST validation, privacy decisions, captions, and error handling. Jest should cover block and dashboard state. Required new end-to-end coverage should verify direct resumable upload, promotion of an existing Media Library attachment, processing state, ownership restrictions, all three privacy modes, automatic-subtitle settings, and the local-draft/remote-track split. The pinned E2E suite currently smoke-tests dashboard access; do not claim it already covers that matrix.

Never commit customer, production, confidential, or unlicensed media, account tokens, service responses containing site data, or production GUIDs. Small licensed or synthetic media fixtures are appropriate when a byte-level upload path requires them.

## Compatibility checklist

- Exercise both the standalone plugin and a main-Jetpack consumer of the VideoPress package when shared code changes.
- Verify old VideoPress blocks and supported legacy embeds still render.
- Test email or feed fallback markup when changing block rendering.
- Check resumable upload interruption and retry rather than only the happy path.
- Preserve the minimum PHP and WordPress versions declared by the affected project.
- Add changelog entries for each changed project under `projects`.
- Deactivation of the standalone plugin removes its connection registration and can disconnect the site when it is the final connection consumer; include that case in rollback testing.

Use the pinned [plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/videopress) and [package source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress) when reviewing behavior. For repository setup and contribution rules, see [Building with Jetpack](/docs/building-with-jetpack/).
