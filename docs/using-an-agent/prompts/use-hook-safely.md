---
title: Prompt an agent to use a Jetpack hook safely
description: Require an exact hook contract, external implementation, compatibility checks, and rollback.
audience: agent-user
document_type: tutorial
sidebar_position: 40
sidebar_collapsed: false
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

<!-- wp:docspress/prompt {"prompt":"Implement [desired behavior] with the documented Jetpack hook [hook name] for [product/version]. Read its hook detail page and immutable source link. Confirm action versus filter, firing context, callback signature, priority, accepted argument count, return contract, since/deprecated status, and supported versions. Put the customization in [project/plugin path], never Jetpack source. Include escaping, capability/nonce checks where relevant, removal/rollback, and focused tests. If the hook cannot guarantee the behavior, stop and recommend a supported alternative.","model":"Coding agent","mode":"code","thinking":true,"context":"Curated hook reference, target plugin, supported version range","caption":"An exact callback contract is required before implementation."} /-->

Check the result against [How to read a hook page](/docs/reference/hooks/how-to-read-a-hook-page/).
