---
title: "jetpack.ai.imageGenerationHandler"
description: Filters the callable used to open an AI-powered image-generation flow in the editor.
audience: developer
document_type: reference
sidebar_position: 45
sidebar_collapsed: true
product: ai
hook_name: jetpack.ai.imageGenerationHandler
hook_type: filter
since: "15.6.0 release provenance"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin/components/ai-assistant-plugin-sidebar/index.tsx#L97-L128
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack.ai.imageGenerationHandler callback parameters","description":"The filter contract verified at the pinned source revision.","fields":[{"name":"handler","type":"Function|null","required":true,"defaultValue":"","description":"handler returned by earlier callbacks, initially null.","values":"","deprecated":false},{"name":"options.entryPoint","type":"string","required":true,"defaultValue":"","description":"UI location such as featured-image.","values":"","deprecated":false},{"name":"options.onImageSelect","type":"Function","required":true,"defaultValue":"","description":"callback accepting the selected image { id, url, mime? }.","values":"","deprecated":false},{"name":"options.extra.placement","type":"string","required":true,"defaultValue":"","description":"placement identifier.","values":"","deprecated":false},{"name":"options.extra.disabled","type":"boolean","required":true,"defaultValue":"","description":"whether the entry point must remain disabled.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"js","filename":"jetpack.ai.imageGenerationHandler.js","code":"import { addFilter } from '@wordpress/hooks';\n\naddFilter(\n\t'jetpack.ai.imageGenerationHandler',\n\t'acme/use-media-library',\n\t( handler, options ) =\u003e {\n\t\tif ( options.extra.disabled ) {\n\t\t\treturn handler;\n\t\t}\n\n\t\treturn () =\u003e {\n\t\t\tconst frame = window.wp.media( { title: 'Choose an image', multiple: false } );\n\t\t\tframe.on( 'select', () =\u003e {\n\t\t\t\tconst image = frame.state().get( 'selection' ).first().toJSON();\n\t\t\t\toptions.onImageSelect( { id: image.id, url: image.url, mime: image.mime } );\n\t\t\t} );\n\t\t\tframe.open();\n\t\t};\n\t}\n);","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external filter callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack.ai.imageGenerationHandler contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack.ai.imageGenerationHandler","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 15.6.0 release provenance · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

AI Assistant applies this WordPress JavaScript filter while choosing the handler for an image-generation entry point. An external plugin can return a callable that opens its own flow. Returning `null` leaves the built-in behavior available. The source DocBlock explicitly addresses external plugins.

## Callback signature

```ts
function ( handler: Function | null, options: ImageGenerationOptions ): Function | null
```

## Parameters

- `handler` (`Function|null`) — handler returned by earlier callbacks, initially `null`.
- `options.entryPoint` (`string`) — UI location such as `featured-image`.
- `options.onImageSelect` (`Function`) — callback accepting the selected image `{ id, url, mime? }`.
- `options.extra.placement` (`string`) — placement identifier.
- `options.extra.disabled` (`boolean`) — whether the entry point must remain disabled.

## Return behavior

Return a callable to replace the image-generation flow, or preserve the incoming handler or `null`. Honor `options.extra.disabled`. The runtime rejects non-function values by falling back to `null`.

## Since, deprecation, and replacement

The source DocBlock has no `@since` tag. Jetpack 15.6 release notes provide provenance for the extensibility change. The filter is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack AI Assistant. Project: `projects/plugins/jetpack`. Owner: AI Assistant plugin sidebar image entry points.

## Example

This external editor plugin replaces the entry point with the WordPress media picker. Enqueue it with `wp_enqueue_media()` and `@wordpress/hooks` available:

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'jetpack.ai.imageGenerationHandler',
	'acme/use-media-library',
	( handler, options ) => {
		if ( options.extra.disabled ) {
			return handler;
		}

		return () => {
			const frame = window.wp.media( { title: 'Choose an image', multiple: false } );
			frame.on( 'select', () => {
				const image = frame.state().get( 'selection' ).first().toJSON();
				options.onImageSelect( { id: image.id, url: image.url, mime: image.mime } );
			} );
			frame.open();
		};
	}
);
```

## Compatibility and failure cautions

This hook chooses a UI handler; it does not grant media permissions, product access, or AI entitlement. Do not override a disabled state, swallow an earlier supported handler without intent, or pass untrusted URLs as selected attachments. Keep the callback compatible with new `options` fields and verify the selected attachment still exists and is authorized.

## Verification

Load the companion script in the editor. Confirm an enabled AI image entry point opens the media picker, selecting an authorized image invokes the normal selection path, and a disabled entry point stays disabled. Remove the script and confirm the built-in path returns.

## Source

[View the filter contract, external-plugin example, and runtime function check at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin/components/ai-assistant-plugin-sidebar/index.tsx#L97-L128) [View the 15.6 release provenance.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/CHANGELOG.md#L491-L494)
