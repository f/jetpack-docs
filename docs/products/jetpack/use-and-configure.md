---
title: Use and configure Jetpack
description: Install and connect the main Jetpack plugin, enable a focused feature set, and verify each outcome safely.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: jetpack
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Before you install

1. Write down the outcome you need, such as traffic statistics, brute-force protection, image delivery, sharing, or a contact form.
2. Confirm the current WordPress and PHP requirements on the [plugin listing](https://wordpress.org/plugins/jetpack/).
3. Take a recoverable backup and identify how to disable a plugin without wp-admin if this is a production site.
4. Review the feature's data and account requirements. A feature that processes visitor data or calls a hosted service may need consent, policy, or access review.

## Install and connect

1. In **Plugins > Add New**, search for **Jetpack**, confirm the publisher and plugin slug, then install and activate it.
2. Follow the Jetpack connection flow from wp-admin. Use the WordPress.com account that should own or administer the connection; do not use a disposable personal account for an organizational site.
3. Return to wp-admin and confirm that Jetpack reports the site as connected.
4. Enable one required feature at a time. Test it before adding another so a failure has a narrow cause.

If policy prevents a live service connection, use the development guidance for an offline test environment. Offline mode is a developer aid, not proof that service-backed features work.

## Configure around outcomes

- For content creation, add only the blocks or editor tools the authoring team will use.
- For growth, configure the relevant Stats, Social, subscriptions, or sharing surface and verify the correct users can access it.
- For performance, record a baseline before changing CDN or optimization behavior, then compare the same URL and device profile.
- For security, confirm backups and recovery access before enabling controls that could affect login or request handling.

Use the [product catalog](/docs/products/) to move to the dedicated product guide. The dedicated page records product-specific data boundaries and checks that this umbrella guide cannot safely generalize.

## Verify the setup

Use a private or staging page when possible:

1. Confirm wp-admin has no Jetpack connection or authentication warning.
2. Exercise one observable outcome: submit a form, view a test page, publish a controlled post, or run the feature's own status check.
3. Test as both an administrator and the least-privileged role expected to use the feature.
4. Check the public page in a signed-out browser session and on a narrow viewport if the feature changes front-end output.
5. Record the WordPress, PHP, Jetpack, theme, and relevant standalone-plugin versions with the result.

## Change or remove a feature

Disable the specific feature first and retest. Deactivating Jetpack can also remove service-backed or block behavior from the site, so inspect affected pages and workflows before doing it in production. Disconnect only when you intend to remove the site's service relationship; a connection reset is not a routine cache-clearing step.

For step-by-step current UI guidance, use [Jetpack support](https://jetpack.com/support/). If the behavior differs from this page, the current product documentation and installed version take precedence.
