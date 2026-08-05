---
title: "Deprecating features: complete source guide"
description: "Preserve Jetpack code deprecation and administrator-notice guidance with its source examples."
audience: contributor
document_type: how-to
sidebar_position: 110
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/deprecating-features.md"
source_blob: a1cf741e4fc1b54d1b903b9b5a6c4014b40a863b
source_sha256: 452595d3cbc259e4dea776fec07dfd8be193f7c600a917ee29a993d0cc72bb05
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/deprecating-features.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

## Deprecating code

See the [coding-standards](/docs/building-with-jetpack/contributing/repository-guides/coding-guidelines/) document for more information about deprecating code.

## Adding deprecation notices in Jetpack

This refers to styled deprecation notices on specific admin pages, with custom calls to action, within the Jetpack plugin. These are meant for self-hosted and WoA sites, but not Simple sites (where notices won't show by default).

In the [Deprecate](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/src/class-deprecate.php) class within the Jetpack plugin, an array of notices exists within the constructor. By default this includes just one demo notice.

In order to show a deprecation notice on WP Admin (dashboard only), Jetpack Settings and Dashboard page, as well as My Jetpack, you'll need to add to the `$notices` array in the `Deprecate` class. A demonstrative example already exists in the array.

Here is an example:

```
$this->notices = array(
	'my-admin' => array(
		'title'       => __( "Retired feature: Jetpack's XYZ Feature", 'jetpack' ),
		'message'     => __( 'This feature is being retired and will be removed effective November, 2024. Please use the Classic Theme Helper plugin instead.', 'jetpack' ),
		'link'        => array(
			'label' => __( 'Learn more', 'jetpack' ),
			'url'   => 'jetpack-support-xyz',
		),
		'show'        => false,
		'hide_in_woa' => true,
	),
);
```
To explain in more detail what the properties are:
* The `title`, `message` and `url` properties are required.
* The support URL is generated using the `Redirect` class, or `getRedirectUrl` for Jetpack dashboard / settings notice URLs.
* The `label` property is not required, but the fallback label is 'Learn more'.
* The `show` property is optional, but setting it to `false` will ensure the notice will not display anywhere.
* The `hide_in_woa` property is also optional, and setting it to `true` will ensure the notice will not display on WoA sites.
* If you need to add custom conditions beyond whether a site is WoA, then it would be better to modify the `show_feature_notice` function within the `Deprecate` class, then add a check in `has_notices` so that the notice is not added to the `$notices` variable.

Notices show on the Jetpack Settings and Dashboard pages with the existing notice styling, as the notice array is passed to the Window object from the `Deprecate` class. If no notices are in that array, then none will show.

Jetpack Settings and Dashboard example:

<img width="1039" alt="Jetpack Settings and Dashboard notice" src="https://github.com/user-attachments/assets/a5012206-4384-4c12-b16b-956bc712642a">

My Jetpack example:

<img width="1085" alt="My Jetpack notice" src="https://github.com/user-attachments/assets/6ac1d94d-8900-410f-a909-7e9f7b36c581">


WP Admin example:

<img width="1221" alt="WP Admin notice" src="https://github.com/user-attachments/assets/eaeebdba-74a8-4b2b-941d-72568e7e7394">


The existing notice display logic is based on cookies. If a notice is dismissed, a cookie is added. If that cookie exists when checked for, then the relevant notice won't show.

Other relevant files with deprecation notice logic include the [JetpackNotices](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/client/components/jetpack-notices/index.jsx) class and the associated [DeprecationNotice](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/client/components/jetpack-notices/deprecation-notice.jsx) itself. It also includes a JavaScript file where notice styles are added and where the cookie is set when a notice is dismissed [here](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/_inc/deprecate.js).
<!-- jetpack-docs:preserved-source:end -->
