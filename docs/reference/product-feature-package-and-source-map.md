---
title: Product, feature, package, and source map
description: Locate the public product guide and primary source ownership for each Jetpack product family.
audience: developer
document_type: reference
sidebar_position: 10
sidebar_collapsed: true
---

The product name shown to users does not always map one-to-one to an installable plugin. Use [the product catalog](../products/index.md) for selection, then inspect the listed source roots before changing code.

| Product guide | Primary public source ownership at the pinned revision |
| --- | --- |
| [Jetpack](../products/jetpack/index.md) | `projects/plugins/jetpack` plus shared packages |
| [Jetpack Forms](../products/forms/index.md) | `projects/packages/forms` and Jetpack block integration |
| [Jetpack AI Assistant](../products/ai/index.md) | Jetpack `extensions/blocks/ai-assistant` plus AI-related packages |
| [Jetpack CRM](../products/crm/index.md) | External CRM repository; the product guide identifies its canonical source |
| [Jetpack Social](../products/social/index.md) | `projects/plugins/social` and `projects/packages/publicize` |
| [Jetpack Stats](../products/stats/index.md) | `projects/packages/stats`, `stats-admin`, and Jetpack's Stats integration |
| [Jetpack Boost](../products/boost/index.md) | `projects/plugins/boost`, `projects/packages/boost-core`, and `boost-speed-score` |
| [Jetpack Search](../products/search/index.md) | `projects/plugins/search` and `projects/packages/search` |
| [Jetpack VideoPress](../products/videopress/index.md) | `projects/plugins/videopress` and `projects/packages/videopress` |
| [Akismet Anti-spam](../products/akismet/index.md) | External Akismet repository plus integration points in Forms |
| [VaultPress Backup](../products/backup/index.md) | `projects/plugins/backup` and `projects/packages/backup` |
| [Jetpack Protect](../products/protect/index.md) | `projects/plugins/protect`, `protect-models`, and `protect-status` |
| [Jetpack Scan](../products/scan/index.md) | `projects/packages/scan` and the product integration that consumes it |

Common cross-product foundations include `connection`, `sync`, `status`, `blocks`, `config`, `constants`, `licensing`, and `my-jetpack`. Their presence does not make their entire namespace public; start at [Package APIs](package-apis.md).
