---
title: "Extend VaultPress Backup: hooks and APIs"
description: "Observe Backup initialization without treating private restore routes as an automation API."
audience: "developer"
document_type: "reference"
sidebar_position: 3
sidebar_collapsed: false
product: "backup"
source_ref: "a6e65435e2531e430c75024f1183612f31263d1f"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"VaultPress Backup extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"WordPress Abilities","type":"object","required":false,"defaultValue":"","description":"Use four manage_options-gated read/request operations; request-backup is a confirmed non-idempotent mutation.","values":"","deprecated":false},{"name":"Initialization action","type":"object","required":false,"defaultValue":"","description":"Use the curated jetpack_backup_initialized action only after its owning package is ready.","values":"","deprecated":false},{"name":"Operational boundary","type":"object","required":false,"defaultValue":"","description":"No restore or download ability exists; do not call private restore or storage endpoints.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

VaultPress Backup does not publish a general third-party API for starting downloads or restores. Its WordPress REST controllers proxy authorized dashboard operations through the site's Jetpack connection. Route names, nonces, response shapes, and remote service paths are product implementation details.

Do not automate a restore by replaying a browser request. A restore is destructive, needs current authorization and scope confirmation, and may overwrite data written after the selected point.

## WordPress Abilities

When the site-wide `jetpack_wp_abilities_enabled` feature gate is enabled and Backup is active, the package registers four deliberate [WordPress Abilities API](https://developer.wordpress.org/apis/abilities-api/) operations:

- `jetpack-backup/get-backup-overview`
- `jetpack-backup/list-backups`
- `jetpack-backup/list-restores`
- `jetpack-backup/request-backup`

Every operation requires `manage_options`. The first three read product state. `request-backup` starts work, is non-idempotent, and must require explicit human confirmation before an agent or automation invokes it. The surface has no restore or archive-download ability; do not synthesize one by replaying the product's private REST requests.

Code must feature-detect the ability and handle it being absent: the feature gate defaults to off, an inactive Backup product does not register the operations, and permission or connected-service failures remain possible. Review the pinned [ability registration and schemas](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/src/abilities/class-backup-abilities.php#L20-L124), [permission callbacks](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/src/abilities/class-backup-abilities.php#L395-L414), and [feature gate](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/actions.php#L34-L50).

## Initialization action

The shared package fires [jetpack_backup_initialized](/docs/reference/hooks/actions/jetpack-backup-initialized/) after its immediate WordPress registration is complete. Compatibility code can use this lifecycle action without invoking a backup or assuming service health. Because the standalone Backup plugin can initialize before an ordinary companion plugin loads, use a must-use plugin and retain a `did_action()` fallback:

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

`automattic/jetpack-backup` is a shared package consumed by Jetpack products. Its public README describes it as tools for backing up Jetpack sites but does not promise a standalone restore SDK. `backup-helper-script-manager` is internal restore/helper infrastructure, not a public restore SDK. If you consume a documented package surface in another plugin, use the Jetpack Autoloader, pin compatible versions, initialize only documented capabilities, and accept that connected-service operations still require the supported Jetpack flow. See [Package APIs](/docs/reference/package-apis/).

For an external recovery system, build against that system's documented API and coordinate through your own administrator workflow. Do not extract Jetpack connection credentials, expose backup archives through a custom endpoint, or log restore payloads.
