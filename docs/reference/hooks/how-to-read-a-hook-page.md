---
title: How to read a hook page
description: Interpret each field in a curated Jetpack action or filter contract.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
---

Each hook page separates facts verified in source from integration advice.

- **Behavior** states when the hook fires or what value it controls.
- **Callback signature** shows the arguments a consumer accepts; it is not a function to call directly.
- **Parameters** records order, type, ownership, and meaning.
- **Return behavior** says whether WordPress consumes the callback result. Actions ignore it; filters require a compatible value.
- **Since, deprecation, and replacement** uses the owning plugin or package's version annotation.
- **Ownership** names the product, project, class/module, and source path.
- **Example** is a minimal external plugin integration, not copied Jetpack code.
- **Compatibility and failure cautions** covers load order, caching, security, and unavailable states.
- **Verification** proves the integration without a production site.
- **Source** links to an immutable GitHub blob and exact lines.

`since` can refer to a package version rather than the main Jetpack plugin version. Always read the accompanying ownership section before turning it into a dependency constraint.
