---
title: "Jetpack global regression checklist"
description: "Preserve every environment, connection, Sync, product, service, and block item in the source regression checklist."
audience: contributor
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/testing/regression-checklist/regression-checklist.md"
source_blob: f1daf606aee41bdc6af8007c3fefbce1378f35c0
source_sha256: 847dfd627f88fb9f9c93c17c0aabfe18c92f0e11a25fcff280aba870251abcfe
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/testing/regression-checklist/regression-checklist.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

This is the "global" checklist, that might be used for beta testing.
NOTE: it might become outdated, so it could be a good idea to generate this file via test-suites files.

## Global

### Environments

- Multisite
- Subdirectory
- Single site
- Subdirectory
- Subdomain

### WP versions

- Current version
- Current -1
- With Gutenberg plugin
- Classic editor (? I don’t think we still support this actually)

### PHP versions(Low)

- 7.2 - current

### Hosting providers(High)

- Bluehost
- Atomic/Pressable
- VIP

### Protocols (Low)

- http
- https

## Connection

- ☐ In-place connection with free plan
- ☐ In-place connection with paid plan
- ☐ In-place connection with product purchase
- ☐ Classic connection. Use Safari, or set a constant JETPACK_SHOULD_NOT_USE_CONNECTION_IFRAME to true
- ☐ Disconnect/reconnect connection
- ☐ Secondary user connection
- ☐ Connection on multisite

## Sync

- ☐ Site changes registered in Calypso’s Activity Log

## Features

- ☐ Jetpack Social: Connect and share a post
- ☐ SSO login
- ☐ Stats registers views
- ☐ Stats registers views in AMP views
- ☐ Lazy loading
- ☐ Site accelerator (make sure that images and core files are served from WPCOM)
- ☐ Infinite scroll

## Products

- ☐ Backups and Restores
- ☐ Security scan
- ☐ Search

## Other services/plugins relying on Jetpack

- ☐ Woo onboarding
- ☐ Woo analytics

## Blocks

Test using Core’s block editor and latest Gutenberg plugin.

- ☐ Tiled Gallery
- ☐ Business Hours
- ☐ Calendly
- ☐ Form
- ☐ Contact Info
- ☐ Eventbrite
- ☐ Google calendar
- ☐ Mailchimp
- ☐ Map
- ☐ OpenTable
- ☐ Pinterest
- ☐ Podcast player
- ☐ Star rating
- ☐ Recurring Payments
- ☐ Repeat Visitor
- ☐ Simple Payments
- ☐ Slideshow
<!-- jetpack-docs:preserved-source:end -->
