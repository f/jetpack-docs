---
title: "Jetpack VideoPress"
description: "Upload, manage, and present hosted video through WordPress and the VideoPress player."
audience: "site-user"
document_type: "overview"
sidebar_position: 1
sidebar_collapsed: true
product: "videopress"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/audience-paths {"eyebrow":"Jetpack VideoPress","title":"Choose the next lifecycle step","description":"Move from a safe Jetpack VideoPress setup to supported extension, contribution, and diagnosis paths.","paths":[{"title":"Use and configure","description":"Set up Jetpack VideoPress and verify its primary outcome.","url":"/docs/products/videopress/use-and-configure/","cta":"Configure","icon":"settings","accent":"green","newTab":false},{"title":"Extend, hooks, and APIs","description":"Choose a documented surface and respect its ownership boundary.","url":"/docs/products/videopress/extend-hooks-and-apis/","cta":"Extend","icon":"plug","accent":"blue","newTab":false},{"title":"Develop and test","description":"Work in the owning source and run project-specific checks.","url":"/docs/products/videopress/develop-and-test/","cta":"Develop","icon":"testing","accent":"gold","newTab":false},{"title":"Troubleshoot and support","description":"Isolate the failing layer and collect safe evidence.","url":"/docs/products/videopress/troubleshoot-and-support/","cta":"Troubleshoot","icon":"troubleshoot","accent":"coral","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","compact":true,"showNumbers":false,"showIcons":true,"showLinks":true} /-->

<!-- wp:docspress/callout {"tone":"note","title":"Product boundary","content":"\u003cp\u003eVideo upload and playback use hosted processing and delivery. Do not upload confidential media as a test, and confirm the intended public or restricted audience before publishing.\u003c/p\u003e","collapsible":true,"open":false} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack VideoPress is video hosting built into WordPress. It can run through the main Jetpack plugin's `videopress` module or the standalone VideoPress plugin; both consume the shared VideoPress package. At the pinned source revision the standalone plugin requires WordPress 6.9 or newer and PHP 7.2 or newer, plus an active entitlement, a site connection, and the capability required for the intended upload or administration task.

VideoPress is useful when a site needs an ad-free player, adaptive streaming, CDN delivery, picture-in-picture, responsive mobile playback, high-resolution video, seekbar color controls, poster images, captions or subtitles, and a dashboard library with filtering. A completed upload and a processed, preview-ready video are separate states.

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

1. Choose the main Jetpack module or standalone VideoPress plugin and activate only the intended route.
2. Complete the connection and product setup shown in the dashboard.
3. Upload a short test video and wait for processing.
4. Add it with the VideoPress block, configure poster, controls, captions, and privacy.
5. Test playback while logged out, on mobile, with keyboard controls, and on a constrained connection.

Continue with [Use and configure](/docs/products/videopress/use-and-configure/). Builders can use the shared package and selected hooks described in [Extend, hooks, and APIs](/docs/products/videopress/extend-hooks-and-apis/).

Source evidence: [VideoPress plugin](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/videopress), [VideoPress package](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress), and [VideoPress support](https://jetpack.com/support/jetpack-videopress/).
