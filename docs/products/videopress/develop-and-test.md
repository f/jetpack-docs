---
title: "Develop and test Jetpack VideoPress"
description: "Build the standalone VideoPress plugin and its shared package, then verify upload, block, and playback flows."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "videopress"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

The standalone entry point lives in `projects/plugins/videopress`; most PHP, editor, uploader, dashboard, and REST behavior lives in `projects/packages/videopress`. The plugin's watch command delegates to the package for this reason.

## Build

```bash
jp install plugins/videopress
jp build plugins/videopress --deps
```

For local iteration, link the standalone plugin to the disposable Jetpack Docker site and use `jp watch packages/videopress`. Confirm the package build completes before diagnosing a missing block or dashboard asset.

## Test

```bash
jp test php packages/videopress
jp test js packages/videopress
jp phan packages/videopress
jp phan plugins/videopress
```

Add tests at the owning layer. PHP coverage should include permissions, attachment metadata, REST validation, privacy decisions, captions, and error handling. Jest should cover block and dashboard state. An end-to-end test should use non-sensitive media and verify upload completion, processing state, insertion, playback, captions, poster rendering, and an unauthorized privacy state.

Do not commit real video files, account tokens, service responses containing site data, or production GUIDs to fixtures. Use the project's mock facilities or a dedicated test account. Keep test media short and licensed for repository use.

## Compatibility checklist

- Exercise both the standalone plugin and a main-Jetpack consumer of the VideoPress package when shared code changes.
- Verify old VideoPress blocks and supported legacy embeds still render.
- Test email or feed fallback markup when changing block rendering.
- Check resumable upload interruption and retry rather than only the happy path.
- Preserve the minimum PHP and WordPress versions declared by the affected project.
- Add changelog entries for each changed project under `projects`.

Use the pinned [plugin source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/videopress) and [package source](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress) when reviewing behavior. For repository setup and contribution rules, see [Building with Jetpack](/docs/building-with-jetpack/).
