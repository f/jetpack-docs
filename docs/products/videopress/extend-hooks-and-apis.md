---
title: "Extend Jetpack VideoPress: hooks and APIs"
description: "Initialize the reusable VideoPress package and use its selected PHP filters without copying private routes."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "videopress"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

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

Include `automattic/jetpack-autoloader`, `automattic/jetpack-config`, and `automattic/jetpack-videopress` in the consuming plugin's Composer dependencies. If the product owns the full VideoPress dashboard experience, the package accepts an `admin_ui` initialization option; do not enable it merely to fetch video metadata.

The complete package setup is documented in the [pinned package README](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/packages/videopress/README.md).

## Modify fetched details carefully

[`videopress_get_video_details`](/docs/reference/hooks/filters/videopress-get-video-details/) receives the service response object and GUID. A filter must return the object or error value expected by its caller.

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

Access-control filters such as `videopress_is_current_user_authed_for_video` affect protected playback. A mistake can disclose or deny video. Use them only with server-side authorization, test all user states, and default to the package decision. See [the hooks policy](/docs/reference/hooks/).

## API boundary

VideoPress registers WordPress REST routes for its editor, dashboard, uploader, captions, settings, and stats. These authenticated routes support the product UI and are not a general remote API contract. Do not replay them outside WordPress or expose their nonces and tokens. Use the package, published hooks, and the VideoPress block; see [REST API boundaries](/docs/reference/rest-api/).
