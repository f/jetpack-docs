---
title: "Use and configure Jetpack VideoPress"
description: "Upload and publish VideoPress videos with intentional playback, privacy, and accessibility settings."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "videopress"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

## Connect and upload

Install the plugin from the WordPress plugin directory and complete its setup. Upload through the VideoPress dashboard, Media Library, or VideoPress block provided by the active product experience. Keep the browser tab open until the upload completes, then wait for processing before treating the video as publishable.

For a large source file, prefer a stable wired or trusted network and keep a local master copy. The hosted copy is a publishing derivative, not your only archive.

## Add the video to content

In the block editor, add a **VideoPress** block and choose an uploaded video. Configure only behaviors that serve the page:

- Choose a poster image that communicates the subject without relying on tiny text.
- Avoid autoplay with sound. Consider the cost of autoplay for data-limited visitors.
- Add captions or subtitles, select the correct language, and review timing and names.
- Add chapters to long instructional material.
- Verify the block's width and alignment do not cause horizontal scrolling.
- Set the video's privacy or access setting before sharing the page.

Previewing as an administrator is insufficient. Open the published page in a private window to confirm an ordinary visitor can see exactly what you intended.

## Replace or revise a video

Before replacing media, locate every page that embeds its VideoPress GUID or attachment. Preserve captions, poster, privacy, and analytics expectations. After a change, purge page caches and verify an existing embed as well as a newly inserted block.

When changing privacy, retest direct player URLs and all authorized and unauthorized user states. Subscriber-only behavior depends on the surrounding site's authentication and embedding context; do not improvise authorization through CSS or client-side JavaScript.

## Data and permissions

Video files, metadata, and playback requests are handled by connected VideoPress services. Update the site's privacy information to describe the actual use. Give upload and media-management capabilities only to trusted roles, and remove private details from titles, filenames, captions, and poster images.

See [the VideoPress block guide](https://jetpack.com/support/jetpack-videopress/add-video-block-editor/) for the current editor surface. For failed uploads or playback, follow [Troubleshoot and support](/docs/products/videopress/troubleshoot-and-support/).
