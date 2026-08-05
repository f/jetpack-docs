---
title: Install, activate, and connect Jetpack
description: Install a Jetpack product safely and verify its local and connected state.
audience: site-user
document_type: how-to
sidebar_position: 20
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

## Before you install

Confirm that you have an administrator account, a current backup, and a maintenance window appropriate to the product. Download public releases from the WordPress plugin directory or the product's canonical installation route; do not install an archive received through an unverified message.

## Install and activate

1. In **Plugins → Add New**, locate the exact Jetpack product and confirm its publisher.
2. Install and activate it.
3. Address any incomplete-install notice before configuration. Development checkouts often require a production build; they are not substitutes for release packages.
4. Open the product dashboard and complete only the permissions needed for the selected outcome.

## Connect when required

Some Jetpack capabilities use WordPress.com services. Follow the product's connection screen, verify the site being authorized, and use the account intended to manage that site. A plugin being active does not prove that its site or user connection is healthy.

## Verify

- Refresh the plugin screen and confirm the expected plugin remains active.
- Confirm the product dashboard reports a healthy state.
- Exercise the single test defined in [Get started](get-started.md).
- Check Site Health and PHP logs for new errors.
- Sign out and confirm that visitor-facing behavior works without administrator state.

If connection or authorization fails, use [Troubleshoot Jetpack](troubleshoot.md) before repeatedly reconnecting.
