---
title: Use and configure Jetpack
description: Install and connect the main Jetpack plugin, enable a focused feature set, and verify each outcome safely.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: jetpack
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm the platform","content":"\u003cp\u003eCheck the current WordPress, PHP, extension, backup, and administrator requirements before activation.\u003c/p\u003e"},{"title":"Register the site and authorize a user","content":"\u003cp\u003eDistinguish the site connection from the current user connection and record who owns the connection.\u003c/p\u003e"},{"title":"Enable and verify one module","content":"\u003cp\u003eCheck its site and user connection requirements, exercise one observable outcome, and record versions.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eConnection and data behavior is feature-specific. Review the selected module before enabling it; site registration does not automatically authorize every user or data flow.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Before you install

1. Write down the outcome you need, such as traffic statistics, brute-force protection, image delivery, sharing, or a contact form.
2. Confirm the current WordPress and PHP requirements on the [plugin listing](https://wordpress.org/plugins/jetpack/).
3. Take a recoverable backup and identify how to disable a plugin without wp-admin if this is a production site.
4. Review the feature's data and account requirements. A feature that processes visitor data or calls a hosted service may need consent, policy, or access review.

## Install and connect

1. In **Plugins > Add New**, search for **Jetpack**, confirm the publisher and plugin slug, then install and activate it.
2. Follow the site-registration flow. Registration creates the site relationship and blog token; it is separate from authorizing a WordPress user.
3. Authorize the WordPress.com account that should own the connection. The first authorized user becomes the connection owner. A site can be registered without every local user being connected, and some features require the current user connection as well as the site connection.
4. Inspect the selected module's active state, plan class, `requires_connection`, `requires_user_connection`, and auto-activation behavior. Enable only a required module and test its observable result before changing another.

If policy prevents a live service connection, use the development guidance for an offline test environment. Offline mode is a developer aid, not proof that service-backed features work.

## Configure around outcomes

- For content creation, add only the blocks or editor tools the authoring team will use.
- For growth, configure the relevant Stats, Social, subscriptions, or sharing surface and verify the correct users can access it.
- For performance, record a baseline before changing CDN or optimization behavior, then compare the same URL and device profile.
- For security, confirm backups and recovery access before enabling controls that could affect login or request handling.

Use the [product catalog](/docs/products/) to move to the dedicated product guide. The dedicated page records product-specific data boundaries and checks that this umbrella guide cannot safely generalize.

## Verify the setup

Use a private or staging page when possible:

1. Run the current connection health checks and distinguish site token, overall connection, connection owner, current user, outbound HTTP and HTTPS, identity mismatch, token health, remote reachability, port, and XML parser results.
2. Exercise one observable outcome: submit a form, view a test page, publish a controlled post, or run the feature's own status check.
3. Test as both an administrator and the least-privileged role expected to use the feature.
4. Check the public page in a signed-out browser session and on a narrow viewport if the feature changes front-end output.
5. Record the WordPress, PHP, Jetpack, theme, and relevant standalone-plugin versions with the result.

Offline mode is a development state, not a connection repair. It can make local features available while service-backed features remain unavailable, so accidental offline mode should be checked explicitly when the site otherwise appears connected.

## Change or remove a feature

Disable the specific feature first and retest. Deactivating Jetpack can also remove service-backed or block behavior from the site, so inspect affected pages and workflows before doing it in production. Disconnect only when you intend to remove the site's service relationship; a connection reset is not a routine cache-clearing step.

For step-by-step current UI guidance, use [Jetpack support](https://jetpack.com/support/). If the behavior differs from this page, the current product documentation and installed version take precedence.
