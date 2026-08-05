---
title: Manage settings, accounts, licenses, and connections
description: Keep Jetpack configuration, product entitlements, and ownership understandable as a site changes hands or environments.
audience: site-user
document_type: how-to
sidebar_position: 50
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Separate the layers

Track four states independently:

1. The WordPress plugin and its local options.
2. The site's Jetpack or WordPress.com connection.
3. Individual user authorization for features that act as a person.
4. Product licenses or entitlements assigned to the site through the owning account.

Changing an administrator, cloning a database, or moving domains may affect these layers differently.

## Maintain ownership

- Record which team owns product configuration and billing.
- Record the owning account, product, site assignment, and renewal or expiry state for each license without copying payment details into site notes.
- Ensure at least two authorized people know the support and recovery route.
- Remove access for people who no longer manage the site.
- Review connections after a domain change, migration, staging clone, or restore.
- Avoid testing social publishing, email, webhooks, or analytics with production destinations from a clone.

## Manage licenses and entitlements

A plugin being active does not prove that its connected service is licensed for this site. Before a migration, ownership transfer, staging clone, or domain change, record the current product status in the official account interface and identify who is authorized to reassign it.

- Do not assume a database copy transfers a license or service entitlement.
- Do not assign one production entitlement to a staging clone unless the product's current documentation explicitly supports that use.
- Reassign or transfer a license only through the documented product/account flow; never copy tokens or connection options between sites.
- Treat expiry, cancellation, or failed renewal as a change in available service behavior. Follow the product's current support page instead of relying on a cached pricing or renewal claim.
- After any assignment change, verify the exact site URL, connected account, enabled capability, and expected product status from both WordPress and the official account interface.

If the owning account is unavailable or the entitlement appears attached to the wrong site, stop changing local plugin data and use the [correct support channel](support.md) with a sanitized site URL and purchase reference.

## Change settings safely

Capture the original value, change one setting, clear only the caches relevant to it, and verify the user-visible result. If a setting affects data transfer or retention, review [Data, privacy, and consent](data-privacy-consent.md) before enabling it.
