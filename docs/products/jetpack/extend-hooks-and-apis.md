---
title: Extend Jetpack, hooks, and APIs
description: Choose a documented Jetpack extension surface and avoid coupling an integration to private plugin or service internals.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: jetpack
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"WordPress hooks","type":"object","required":false,"defaultValue":"","description":"Use curated public actions and filters with exact timing and return contracts.","values":"","deprecated":false},{"name":"Abilities API","type":"object","required":false,"defaultValue":"","description":"Use Jetpack module and connection abilities when the installed version exposes them.","values":"","deprecated":false},{"name":"Blocks and packages","type":"object","required":false,"defaultValue":"","description":"Prefer registered block contracts and the public entry point of the owning package.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Jetpack exposes several extension layers. Prefer the narrowest documented layer that owns the behavior: a WordPress hook for local PHP behavior, block APIs for editor behavior, a reusable Jetpack package for shared implementation, or a documented REST interface for a supported remote workflow.

## Wait until Jetpack is ready

The `jetpack_loaded` action fires after Jetpack has loaded the namespaces managed by the Jetpack Autoloader. Use it when your integration needs Jetpack-owned classes at runtime.

```php
/**
 * Register an integration after Jetpack packages are available.
 *
 * @param Jetpack $jetpack Main Jetpack plugin object.
 */
function acme_register_jetpack_integration( $jetpack ) {
	if ( ! $jetpack ) {
		return;
	}

	// Register only the local callbacks your plugin owns.
}
add_action( 'jetpack_loaded', 'acme_register_jetpack_integration' );
```

See the curated [jetpack_loaded hook contract](/docs/reference/hooks/actions/jetpack-loaded/) and its [immutable source definition](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/class.jetpack.php#L1161-L1169). Do not instantiate an internal Jetpack class before this point merely because it happens to be available in one release.

## Choose an extension surface

| Need | Preferred surface | Contract check |
| --- | --- | --- |
| Change local plugin behavior | A documented action or filter | Confirm parameters, return type, timing, and deprecation state in the [hooks reference](/docs/reference/hooks/). |
| Extend the editor | WordPress block APIs and a documented Jetpack block interface | Confirm the block name and attributes in `block.json`; avoid reaching into compiled bundles. |
| Reuse connection, sync, stats, or another capability | The owning package under `projects/packages` | Read its public README and Composer metadata; initialize it through the package's documented entry point. |
| Work with a remote service | A documented REST or package API | Use documented authentication and permission checks; never copy an endpoint discovered only from a browser request. |

The [jetpack_offline_mode reference](/docs/reference/hooks/filters/jetpack-offline-mode/) explains the supported local override used by development environments. Do not enable offline mode on a live site to bypass a connection error: service-backed features will still lack the service relationship they require.

## Abilities for agents and automation

The pinned plugin initializes declared WordPress Abilities rather than requiring an agent to scrape wp-admin or invent REST calls. Core surfaces include `jetpack/get-modules`, `jetpack/set-module-status`, and `jetpack/get-connection-status`; installed modules can add Monitor, Related Posts, Shortlinks, Sitemaps, and Newsletter abilities. The [module ability source](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/src/abilities/class-modules-abilities.php#L76-L167) and [connection ability source](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/connection/src/abilities/class-connection-abilities.php#L62-L114) define the pinned schemas and permission callbacks.

For local REST work, document an exact registered route, method, permission callback, arguments, and response from the current registration source. The historical `docs/rest-api.md` inventory is preserved for migration context but contains removed and renamed routes; it is not a current API contract.

## Compatibility rules

- Prefix global functions, hooks, options, and handles owned by your plugin.
- Treat serialized block attributes, documented hook values, and public package APIs as data contracts; validate every value before use.
- Keep callbacks fast. A hook on page render, save, or REST request can affect every visitor or editor action.
- Feature-detect with `function_exists()`, `class_exists()`, `has_action()`, or package version APIs where appropriate; do not compare only the Jetpack plugin version when a standalone plugin can supply the package.
- Preserve WordPress capability, nonce, escaping, and sanitization requirements. Jetpack loading does not authorize the current request.
- Provide a no-Jetpack path so deactivation does not fatal the site.

The [pinned plugin source](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack) is evidence for this revision, not a blanket promise that every public PHP symbol is an extension API. If a surface is not documented, open a contribution discussion before shipping a dependency on it.
