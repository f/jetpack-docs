---
title: "Use and configure Jetpack VideoPress"
description: "Upload and publish VideoPress videos with intentional playback, privacy, and accessibility settings."
audience: "site-user"
document_type: "how-to"
sidebar_position: 2
sidebar_collapsed: false
product: "videopress"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm connection and media policy","content":"\u003cp\u003eCheck upload authorization, file requirements, captions, poster ownership, and visitor privacy expectations.\u003c/p\u003e"},{"title":"Upload and place the video","content":"\u003cp\u003eUse the VideoPress workflow and registered block rather than embedding an undocumented service URL.\u003c/p\u003e"},{"title":"Verify playback variants","content":"\u003cp\u003eTest signed-in and signed-out playback, a narrow viewport, captions, poster, chapters, and restricted content.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eVideo upload and playback use hosted processing and delivery. Do not upload confidential media as a test, and confirm the intended public or restricted audience before publishing.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Connect and upload

Install the plugin from the WordPress plugin directory and complete its setup. Upload through the VideoPress dashboard, Media Library, or VideoPress block provided by the active product experience. Keep the browser tab open until the upload completes, then wait for processing before treating the video as publishable.

For a large source file, prefer a stable wired or trusted network and keep a local master copy. The hosted copy is a publishing derivative, not your only archive.

## Add the video to content

In the block editor, add a **VideoPress** block and choose an uploaded video. Configure only behaviors that serve the page:

- Choose a poster image that communicates the subject without relying on tiny text.
- Avoid autoplay with sound. Consider the cost of autoplay for data-limited visitors.
- Configure loop, mute, player controls, plays-inline, and metadata preload deliberately; autoplay may require mute in modern browsers.
- Add captions or subtitles, select the correct language, and review timing and names.
- Add chapters to long instructional material.
- Verify the block's width and alignment do not cause horizontal scrolling.
- Set the video's privacy or access setting before sharing the page.
- Choose **site default**, **public**, or **private** privacy; also review rating (`G`, `PG-13`, or `R`), download permission, and the player's sharing/embed menu.

Previewing as an administrator is insufficient. Open the published page in a private window to confirm an ordinary visitor can see exactly what you intended.

## Replace or revise a video

Before replacing media, locate every page that embeds its VideoPress GUID or attachment. Preserve captions, poster, and privacy intentionally, but do not imply that a replacement GUID inherits plays or statistics. After a change, purge page caches you administer and verify an existing embed as well as a newly inserted block.

When changing privacy, retest direct player URLs and all authorized and unauthorized user states. Private authorization verifies that the claimed post actually embeds the matching GUID; site-default privacy can resolve to public or private. Do not improvise authorization through CSS or client-side JavaScript.

A video owned by another site can be embedded and its local player presentation adjusted, but its title, description, and source metadata cannot be edited here. For chapters, an uploaded chapter VTT takes precedence over chapter syntax in the description. Site-level settings also control whether new videos default to private and whether automatic subtitle generation is opted out; automatic subtitles still require human review.

## Data and permissions

Video delivery and processing use connected VideoPress services, while WordPress retains attachment posts and metadata, block attributes, editable caption drafts, GUID and cached embed data, poster data, privacy/player settings, and track URLs, languages, and labels. Update the site's privacy information to describe both sides.

Dashboard, settings, and stats access require `manage_options`; upload requires `upload_files`; metadata updates require `edit_posts` plus connection checks; caption operations use ownership-specific `edit_post` and can fall back to `edit_others_posts`. Controls that change source metadata are disabled for a video the site does not own.

See [the VideoPress block guide](https://jetpack.com/support/jetpack-videopress/add-video-block-editor/) for the current editor surface. For failed uploads or playback, follow [Troubleshoot and support](/docs/products/videopress/troubleshoot-and-support/).
