---
title: "jetpack_backup_initialized"
description: Runs after the VaultPress Backup package registers its immediate hooks and schedules its remaining setup.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: true
product: backup
hook_name: jetpack_backup_initialized
hook_type: action
since: "1.3.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/src/class-jetpack-backup.php#L161-L166
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_backup_initialized callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"parameters","type":"none","required":false,"defaultValue":"","description":"This hook passes no callback parameters.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"php","filename":"jetpack_backup_initialized.php","code":"\u003c?php\n/**\n * Plugin Name: My Backup readiness check\n */\n\nfunction myjp_mark_backup_package_ready() {\n\t$GLOBALS['myjp_backup_package_ready'] = true;\n}\n\nif ( did_action( 'jetpack_backup_initialized' ) ) {\n\tmyjp_mark_backup_package_ready();\n} else {\n\tadd_action( 'jetpack_backup_initialized', 'myjp_mark_backup_package_ready', 10, 0 );\n}","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_backup_initialized contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_backup_initialized","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 1.3.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

The Backup package fires this action synchronously at the end of `Jetpack_Backup::initialize()`. Before it fires, the package initializes connection REST authentication, registers its REST and admin-menu callbacks, schedules connection, Sync, and identity-crisis setup for `plugins_loaded`, and registers its license filter. The action therefore means that the package's immediate registration is complete; it does not mean that a site is connected, that the scheduled `plugins_loaded` work has run, or that a backup exists.

The standalone VaultPress Backup plugin calls the initializer from its root plugin file while WordPress is loading regular plugins. The package guards the initializer with `did_action( 'jetpack_backup_initialized' )`, so its own initializer fires the action at most once in a request. A regular plugin loaded after VaultPress Backup can miss it.

## Callback signature

```php
function (): void
```

Register with zero accepted arguments:

```php
add_action( 'jetpack_backup_initialized', 'my_callback', 10, 0 );
```

## Parameters

This action passes no parameters.

## Return behavior

This is an action. WordPress ignores callback return values.

## Since, deprecation, and replacement

Introduced in version 1.3.0 of `automattic/jetpack-backup`. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: VaultPress Backup. Package: `automattic/jetpack-backup`. Source project: `projects/packages/backup`. Emitter: `Automattic\Jetpack\Backup\V0005\Jetpack_Backup::initialize()`; the versioned namespace is an implementation detail, not an extension contract.

## Example

Place this complete example directly in `wp-content/mu-plugins/myjp-backup-ready.php`. Loading it as a must-use plugin makes registration deterministic, while the `did_action()` branch also handles a package initialized earlier by another must-use plugin.

```php
<?php
/**
 * Plugin Name: My Backup readiness check
 */

function myjp_mark_backup_package_ready() {
	$GLOBALS['myjp_backup_package_ready'] = true;
}

if ( did_action( 'jetpack_backup_initialized' ) ) {
	myjp_mark_backup_package_ready();
} else {
	add_action( 'jetpack_backup_initialized', 'myjp_mark_backup_package_ready', 10, 0 );
}
```

Replace the request-scoped marker with the supported registrations your companion plugin needs after Backup is initialized.

## Compatibility and failure cautions

Do not rely on a normal plugin's load order to observe this action. Keep the `did_action()` fallback even in a must-use plugin because another must-use component can initialize the package first. The action can be absent when VaultPress Backup is inactive, its requirements check fails, or its generated dependencies are incomplete. Treat it only as a package-registration signal: it does not prove a valid license, connection, completed backup, or working remote service. Do not instantiate the versioned `V0005` class or call the action yourself.

## Verification

With VaultPress Backup active and the example installed as a must-use plugin, run:

```sh
wp eval 'var_export( did_action( "jetpack_backup_initialized" ) > 0 && ! empty( $GLOBALS["myjp_backup_package_ready"] ) );'
```

Expect `true`. Deactivate VaultPress Backup and repeat; expect `false` without a warning or fatal error. If another component provides the Backup package, verify its documented initialization path before interpreting the result.

## Source

[View the action documentation and call at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/src/class-jetpack-backup.php#L161-L166) The [standalone plugin calls the initializer during plugin-file loading](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/backup/jetpack-backup.php#L181-L184), and the [initializer's guard and registrations show the precise timing](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/backup/src/class-jetpack-backup.php#L116-L166).
