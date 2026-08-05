---
title: "Jetpack VideoPress"
description: "Upload, manage, and present hosted video through WordPress and the VideoPress player."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: false
product: "videopress"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

Jetpack VideoPress is video hosting built into WordPress. Authors can upload and manage videos from the dashboard or editor, embed them with the VideoPress block, and deliver them through the VideoPress player rather than serving the original file directly from the site's web server.

VideoPress is useful when a site needs an ad-free player, managed video delivery, poster images, captions or subtitles, and a workflow that stays close to the WordPress media experience. The standalone plugin consumes the shared `automattic/jetpack-videopress` package and a Jetpack connection.

## Plan the publishing workflow

Decide who may upload videos, who may edit captions and privacy, and who verifies the final page. A successful upload does not mean every rendition is ready immediately; leave time for remote processing before publishing a time-sensitive post.

Prepare an accessible package for each video:

- A descriptive title and useful surrounding text.
- An intentional poster image that works at the player sizes the theme uses.
- Accurate captions or subtitles, reviewed by a person.
- Chapters when they make a long video easier to navigate.
- A privacy choice that matches where the video may be embedded and viewed.

Never rely on an unlisted or hard-to-guess URL as the only access control for confidential material.

## Start here

1. Install and activate Jetpack VideoPress.
2. Complete the connection and product setup shown in the dashboard.
3. Upload a short test video and wait for processing.
4. Add it with the VideoPress block, configure poster, controls, captions, and privacy.
5. Test playback while logged out, on mobile, with keyboard controls, and on a constrained connection.

Continue with [Use and configure](/docs/products/videopress/use-and-configure/). Builders can use the shared package and selected hooks described in [Extend, hooks, and APIs](/docs/products/videopress/extend-hooks-and-apis/).

Source evidence: [VideoPress plugin](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/videopress), [VideoPress package](https://github.com/Automattic/jetpack/tree/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress), and [VideoPress support](https://jetpack.com/support/jetpack-videopress/).
