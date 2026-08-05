---
title: "Extend VaultPress Backup: hooks and APIs"
description: "Observe Backup initialization without treating private restore routes as an automation API."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "backup"
source_ref: "5c0d27877fd19504a8de8b8618950d51876816a0"
last_reviewed: "2026-08-05"
---

VaultPress Backup does not publish a general third-party API for starting downloads or restores. Its WordPress REST controllers proxy authorized dashboard operations through the site's Jetpack connection. Route names, nonces, response shapes, and remote service paths are product implementation details.

Do not automate a restore by replaying a browser request. A restore is destructive, needs current authorization and scope confirmation, and may overwrite data written after the selected point.

## Initialization action

The shared package fires [`jetpack_backup_initialized`](/docs/reference/hooks/actions/jetpack-backup-initialized/) after its immediate WordPress registration is complete. Compatibility code can use this lifecycle action without invoking a backup or assuming service health. Because the standalone Backup plugin can initialize before an ordinary companion plugin loads, use a must-use plugin and retain a `did_action()` fallback:

```php
function acme_backup_package_ready() {
	$GLOBALS['acme_backup_package_ready'] = true;
}

if ( did_action( 'jetpack_backup_initialized' ) ) {
	acme_backup_package_ready();
} else {
	add_action( 'jetpack_backup_initialized', 'acme_backup_package_ready', 10, 0 );
}
```

Replace the request-scoped marker with the registrations your integration needs. Your code must still load when Backup is absent and must not equate this action with “a current backup exists.”

The package also contains source-defined feature filters used by Jetpack products. Their presence does not make the dashboard's REST surface public. Review [Hook usage and stability](/docs/reference/hooks/) and test the exact package version before depending on one.

## Package boundary

`automattic/jetpack-backup` is a shared package consumed by Jetpack products. Its public README describes it as tools for backing up Jetpack sites but does not promise a standalone restore SDK. If you consume it in another plugin, use the Jetpack Autoloader, pin compatible versions, initialize only documented capabilities, and accept that connected-service operations still require the supported Jetpack flow. See [Package APIs](/docs/reference/package-apis/).

For an external recovery system, build against that system's documented API and coordinate through your own administrator workflow. Do not extract Jetpack connection credentials, expose backup archives through a custom endpoint, or log restore payloads.
