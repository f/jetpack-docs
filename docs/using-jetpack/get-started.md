---
title: Get started with Jetpack
description: Define the site outcome, check the environment, and prepare a reversible first change.
audience: site-user
document_type: tutorial
sidebar_position: 10
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

## Define one outcome

Write down what should be different when you finish: for example, restore a deleted post, reduce page-loading work, show better search results, or publish a post to a social network. This makes product selection and verification concrete.

## Check the environment

Before installing anything, record:

- The site URL and whether it is production, staging, or local.
- WordPress and PHP versions.
- Active theme and any caching, security, or performance plugins.
- Whether the site can make outbound HTTPS requests.
- Who can authorize a WordPress.com connection and product purchase, if required.

Use a backup or staging site for changes that affect stored data, caching, indexing, or visitor-facing output.

## Choose the smallest useful product set

Open [Choose Jetpack products](choose-products.md). Enable only what supports the stated outcome. Features with overlapping responsibilities—such as caching, security scanning, search, or social publishing—should not be activated in multiple plugins without understanding their interaction.

## Define verification before setup

Choose an observable check: a completed backup, a known search query, a test form submission, an expected social post, or a measured page before and after optimization. Keep the test content synthetic.

Continue with [Install, activate, and connect](install-activate-connect.md).
