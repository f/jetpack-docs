---
title: "Troubleshoot Jetpack VideoPress"
description: "Diagnose VideoPress connection, upload, processing, playback, caption, and privacy problems safely."
audience: "site-user"
document_type: "troubleshooting"
sidebar_position: 5
sidebar_collapsed: false
product: "videopress"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Keep the original media file. Do not delete or repeatedly replace it while diagnosing an upload or processing failure.

## Upload does not finish

Confirm the connected site and product are active, then try a short known-good video. Check available disk space for temporary upload handling, PHP and web-server upload limits, outbound HTTPS, browser console errors, and security tools that may block resumable requests. Retry on a stable network without renaming the original into misleading file extensions.

If the upload finishes but processing remains pending, record the VideoPress GUID and approximate upload time. Avoid uploading many duplicates; support can investigate one clean reproduction more effectively.

## Player is blank or reports an error

Open the page in a private window and test the direct published page, not only the editor preview. Purge page/CDN caches, check content-security-policy and iframe rules, and look for blocked player or media requests. Temporarily test with a default theme on staging to isolate overlay or responsive CSS conflicts.

## Only some visitors can play the video

Review the video's privacy setting and the page's own visibility. Test logged-out, authorized, and unauthorized states. A cached authorized response must not be served to an unauthorized visitor. If custom code uses VideoPress authorization filters, disable it on staging and restore the package's default decision.

## Captions, poster, or chapters are wrong

Confirm the asset is attached to the intended VideoPress GUID and language. Republish the page, purge caches, and test keyboard caption controls. Do not assume auto-generated captions are accurate; correct names, technical terms, and timing manually.

## Collect a safe report

Include WordPress, PHP, VideoPress plugin, theme, browser, and relevant security/CDN versions; the stage where upload fails; a non-private GUID; a public example page when appropriate; and redacted console/network errors. Never share connection tokens, cookies, nonces, subscriber data, or a private video's source URL in a public ticket.

Use [VideoPress support](https://jetpack.com/support/jetpack-videopress/) for current product instructions and [Jetpack support](https://jetpack.com/contact-support/) for account or service investigation. After recovery, return to [Use and configure](/docs/products/videopress/use-and-configure/) and complete the logged-out playback check.
