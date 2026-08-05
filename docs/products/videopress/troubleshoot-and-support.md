---
title: "Troubleshoot Jetpack VideoPress"
description: "Diagnose VideoPress connection, upload, processing, playback, caption, and privacy problems safely."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "videopress"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/troubleshooter {"title":"Triage Jetpack VideoPress","intro":"Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.","startId":"setup","questions":[{"id":"setup","question":"Does the upload complete and does the same video play in a signed-out browser without console or network errors?","yesLabel":"Yes","yesNext":"reproduce","noLabel":"No or unknown","noNext":"setup-check"},{"id":"reproduce","question":"Can the same symptom be reproduced with a minimal synthetic case on staging?","yesLabel":"Yes","yesNext":"isolate","noLabel":"No","noNext":"collect"}],"outcomes":[{"id":"setup-check","status":"warning","title":"Restore the product prerequisite","content":"\u003cp\u003eCheck connection, authorization, file constraints, processing state, public reachability, and player assets separately.\u003c/p\u003e"},{"id":"isolate","status":"neutral","title":"Isolate the failing layer","content":"\u003cp\u003eChange one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.\u003c/p\u003e"},{"id":"collect","status":"neutral","title":"Collect safe evidence","content":"\u003cp\u003eRecord the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.\u003c/p\u003e"}],"showProgress":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Verification target","content":"\u003cp\u003eThe intended audience can play the video with correct poster, captions, chapters, and responsive layout.\u003c/p\u003e","meta":"Recheck after every change"} /-->
<!-- jetpack-docs:product-blocks:end -->

Keep the original media file. Do not delete or repeatedly replace it while diagnosing an upload or processing failure.

## Upload does not finish

Confirm the module or standalone plugin, entitlement, site connection, connected owner/current user, and `upload_files` capability. Then identify the upload path: a newly selected file uses browser-side resumable TUS upload directly to VideoPress, while an existing Media Library attachment uses a server-side local-file chunk path. PHP upload limits and local disk are relevant to the latter, not universal first checks.

Direct uploads retain resumable state and retry transient `408`, `429`, `500`, `502`, `503`, and `504` responses. Pause or resume the existing upload rather than creating duplicates. Check browser console/network errors and security tools that may block the resumable request.

If the upload finishes but processing remains pending, record the VideoPress GUID and approximate upload time. Editor preview polls every two seconds and stops after ten attempts; upload completion can therefore be real while the editor preview is still unavailable.

## Player is blank or reports an error

Open the page in a private window and test the direct published page, not only the editor preview. Purge only page, host, proxy, or browser caches you administer; there is no documented user-facing VideoPress CDN purge. Check content-security-policy and iframe rules and look for blocked player or media requests. Temporarily test with a default theme on staging to isolate overlay or responsive CSS conflicts.

## Only some visitors can play the video

Distinguish public, private, and site-default privacy. Confirm the embedding post really contains the matching GUID, then test logged-out, authorized, and unauthorized states. A cached authorized response must not be served to an unauthorized visitor. If custom code uses VideoPress authorization filters, disable it on staging and restore the package's default decision.

## Captions, poster, or chapters are wrong

Confirm the asset is attached to the intended VideoPress GUID and language. Distinguish an editable local caption draft from a published remote VTT and its `ready`, `serving`, `processing`, `syncing`, or `failed` state. A remote VTT can publish even if saving the local editable copy fails. Republish the page, purge caches you control, and test keyboard caption controls. Do not assume auto-generated captions are accurate.

For rollback, preserve the original local master and old GUID, revert the post block through revisions, and avoid casually deactivating the standalone plugin because it may remove the site's final connection consumer.

## Collect a safe report

Include WordPress, PHP, VideoPress plugin, theme, browser, and relevant security/CDN versions; the stage where upload fails; a non-private GUID; a public example page when appropriate; and redacted console/network errors. Never share connection tokens, cookies, nonces, subscriber data, or a private video's source URL in a public ticket.

Use [VideoPress support](https://jetpack.com/support/jetpack-videopress/) for current product instructions and [Jetpack support](https://jetpack.com/contact-support/) for account or service investigation. After recovery, return to [Use and configure](/docs/products/videopress/use-and-configure/) and complete the logged-out playback check.
