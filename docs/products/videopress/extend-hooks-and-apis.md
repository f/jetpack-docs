---
title: "Extend Jetpack VideoPress: hooks and APIs"
description: "Initialize the reusable VideoPress package and use its selected PHP filters without copying private routes."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "videopress"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack VideoPress extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"Video details filter","type":"object","required":false,"defaultValue":"","description":"Use the curated videopress_get_video_details filter and preserve the required return shape.","values":"","deprecated":false},{"name":"VideoPress package","type":"object","required":false,"defaultValue":"","description":"Reuse the package through its documented entry point.","values":"","deprecated":false},{"name":"Block contract","type":"object","required":false,"defaultValue":"","description":"Use the registered block name and attributes; do not manipulate internal player bundles.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

The reusable VideoPress package is the supported starting point for another WordPress plugin that needs the Jetpack implementation. Use Jetpack Config and the Jetpack Autoloader so multiple plugins can safely consume compatible package versions.

```php
use Automattic\Jetpack\Config;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload_packages.php';

add_action(
	'plugins_loaded',
	function () {
		$config = new Config();
		$config->ensure( 'videopress' );
	},
	1
);
```

Include `automattic/jetpack-autoloader`, `automattic/jetpack-config`, and `automattic/jetpack-videopress` in the consuming plugin's Composer dependencies. The `admin_ui` option defaults off. Utilities and selected REST infrastructure initialize independently, while uploader, player, and administrator behavior remain active-product concerns; do not enable the full UI merely to fetch metadata.

The registered editor block is `videopress/video`; use its [immutable block schema](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/src/client/block-editor/blocks/video/block.json#L2-L126) rather than reading a compiled bundle.

The complete package setup is documented in the [pinned package README](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/videopress/README.md).

## Modify fetched details carefully

[videopress_get_video_details](/docs/reference/hooks/filters/videopress-get-video-details/) receives the decoded cached or remote value and GUID. An invalid GUID returns `WP_Error` before the filter runs. The documented incoming value is an object, although a malformed response can be `null`; preserve an object and return unexpected input unchanged.

```php
add_filter(
	'videopress_get_video_details',
	function ( $details, $guid ) {
		if ( is_object( $details ) ) {
			$details->acme_catalog_key = 'video-' . sanitize_key( $guid );
		}
		return $details;
	},
	10,
	2
);
```

Use this only for data your own integration consumes; do not overwrite service fields or assume every response is successful.

[videopress_init](/docs/reference/hooks/actions/videopress-init/) signals package initialization; callbacks must be idempotent. [videopress_is_current_user_authed_for_video](/docs/reference/hooks/filters/videopress-is-current-user-authed-for-video/) affects protected playback. A mistake can disclose or deny video, so preserve the package decision unless a server-side policy has stronger evidence and test every user state. See [the hooks policy](/docs/reference/hooks/).

## API boundary

VideoPress registers WordPress REST routes for its editor, dashboard, uploader, captions, settings, and stats. These authenticated routes support the product UI and are not a general remote API contract. Do not replay them outside WordPress or expose their nonces and tokens. Use the package, published hooks, and the VideoPress block; see [REST API boundaries](/docs/reference/rest-api/).
