---
title: Prompt an agent to troubleshoot a Jetpack site
description: Turn sanitized symptoms into an evidence-preserving diagnostic sequence.
audience: agent-user
document_type: tutorial
sidebar_position: 20
sidebar_collapsed: false
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- wp:docspress/prompt {"prompt":"Diagnose this [Jetpack product] problem without changing production: [sanitized symptom]. Expected: [result]. Actual: [result]. Last known working time: [time and timezone]. Environment: WordPress [version], PHP [version], product [version], [local/staging/production], connection state [state]. Read the product's troubleshooting page and cited source. Separate environment, plugin, connection, cache/index, conflict, and service hypotheses. Rank the next checks by information gained and risk, state what evidence each check collects, and provide rollback. Do not request secrets or real customer content.","model":"Coding agent","mode":"ask","thinking":true,"context":"Safe diagnostic bundle and product troubleshooting page","caption":"Keep each diagnostic step reversible and evidence-preserving."} /-->

Use [safe diagnostics](/docs/using-jetpack/safe-diagnostics/) to prepare the input.
