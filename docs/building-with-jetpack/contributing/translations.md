---
title: Translations
description: Make Jetpack interface text discoverable, contextual, and safe for translators.
audience: contributor
document_type: how-to
sidebar_position: 110
sidebar_collapsed: true
---

Wrap user-visible PHP and JavaScript strings with the WordPress internationalization functions and the text domain used by the owning project. Keep markup outside the translated string when possible, and use placeholders for dynamic values.

```php
printf(
	esc_html__( 'Connected as %s.', 'jetpack' ),
	esc_html( $display_name )
);
```

Use numbered placeholders when translators may reorder values, and add a translator comment immediately before an ambiguous string or placeholder. Do not concatenate sentence fragments; languages do not share English word order or plural rules. Use `_n()` or the matching JavaScript function for counts.

Product names remain product names, while surrounding instructions should be translatable. Test long strings, RTL layout, date/number formatting, plural cases, and escaped output. Never use a translated value as a stable identifier, option name, route, CSS class, or capability.

Follow the owning project's extraction and build scripts and consult the pinned [translation guide](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/docs/translations.md).
