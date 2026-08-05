---
title: Test an integration
description: Verify a Jetpack integration across lifecycle states, supported versions, and user-visible behavior.
audience: developer
document_type: how-to
sidebar_position: 90
sidebar_collapsed: true
---

Test the public contract and the user outcome. A callback being invoked is not enough if the resulting page, API response, or background job is wrong.

## Minimum matrix

- Owning Jetpack product active and configured.
- Product installed but its feature disabled.
- Product deactivated or unavailable.
- Connected and disconnected states where the feature uses services.
- Lowest and highest WordPress, PHP, and Jetpack versions claimed by the integration.
- Single site and multisite if network activation is supported.
- Administrator and least-privileged intended user.

For hooks, assert the accepted arguments and returned type. For REST routes, cover success, missing authentication, insufficient capability, invalid parameters, and service failure. For blocks, cover insertion, save/reload, front-end rendering, migrations, keyboard use, mobile width, and RTL.

Use disposable accounts and synthetic content. Do not point an automated suite at a production site. Remove filters in test teardown, reset global state, and avoid assertions that depend on remote timing.

If contributing inside the monorepo, use the project commands in [Automated testing](contributing/automated-testing.md). External integrations should additionally run the WordPress plugin checks appropriate to their own repository.
