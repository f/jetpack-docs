---
title: "jetpack_ai_assistant_generation_complete"
description: Runs in the editor after AI generation completes for an extended block.
audience: developer
document_type: reference
sidebar_position: 40
sidebar_collapsed: true
product: ai
hook_name: jetpack_ai_assistant_generation_complete
hook_type: action
since: "15.6.0"
deprecated: false
source_url: https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant/extensions/text-blocks/with-ai-text-extension.tsx#L278-L288
last_reviewed: "2026-08-05"
---
<!-- jetpack-docs:hook-blocks:start -->

<!-- wp:docspress/fields {"title":"jetpack_ai_assistant_generation_complete callback parameters","description":"The action contract verified at the pinned source revision.","fields":[{"name":"clientId","type":"string","required":true,"defaultValue":"","description":"block editor client ID that received generated content. It is scoped to the editor session and is not a persistent content identifier.","values":"","deprecated":false},{"name":"blockName","type":"string","required":true,"defaultValue":"","description":"registered block name, such as jetpack/contact-form.","values":"","deprecated":false}],"searchable":true,"compact":false} /-->

<!-- wp:docspress/colorful-code {"language":"js","filename":"jetpack_ai_assistant_generation_complete.js","code":"import { addAction } from '@wordpress/hooks';\nimport { dispatch } from '@wordpress/data';\nimport { store as noticesStore } from '@wordpress/notices';\n\naddAction(\n\t'jetpack_ai_assistant_generation_complete',\n\t'acme/generation-notice',\n\t( clientId, blockName ) =\u003e {\n\t\tif ( blockName !== 'jetpack/contact-form' ) {\n\t\t\treturn;\n\t\t}\n\t\tdispatch( noticesStore ).createInfoNotice(\n\t\t\t`Review the generated form before publishing. Editor block: ${ clientId }`,\n\t\t\t{ type: 'snackbar' }\n\t\t);\n\t}\n);","highlightedLines":"","showLineNumbers":true,"caption":"Minimal external action callback","diffMode":"none","copyMode":"all","annotations":[]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Preserve the jetpack_ai_assistant_generation_complete contract","content":"\u003cp\u003eRegister this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- wp:docspress/result {"status":"success","title":"Source contract pinned for jetpack_ai_assistant_generation_complete","content":"\u003cp\u003eThe classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.\u003c/p\u003e","meta":"Since: 15.6.0 · Deprecated: no"} /-->
<!-- jetpack-docs:hook-blocks:end -->

## Behavior

AI Assistant calls this WordPress JavaScript action when generation finishes for a block extended by its text-generation interface. It exists for cross-package coordination; Jetpack Forms uses it to create a synced form after AI-generated form fields complete.

## Callback signature

```ts
function ( clientId: string, blockName: string ): void
```

Register through `@wordpress/hooks`:

```js
addAction( 'jetpack_ai_assistant_generation_complete', 'acme/generation-notice', callback );
```

## Parameters

- `clientId` (`string`) — block editor client ID that received generated content. It is scoped to the editor session and is not a persistent content identifier.
- `blockName` (`string`) — registered block name, such as `jetpack/contact-form`.

## Return behavior

This is an action. No callback return value is consumed.

## Since, deprecation, and replacement

Introduced in Jetpack 15.6.0. It is not deprecated at the pinned revision and has no replacement.

## Ownership

Product: Jetpack AI Assistant. Project: `projects/plugins/jetpack`. Owner: the AI text extension for editor blocks, with a documented Forms consumer.

## Example

```js
import { addAction } from '@wordpress/hooks';
import { dispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

addAction(
	'jetpack_ai_assistant_generation_complete',
	'acme/generation-notice',
	( clientId, blockName ) => {
		if ( blockName !== 'jetpack/contact-form' ) {
			return;
		}
		dispatch( noticesStore ).createInfoNotice(
			`Review the generated form before publishing. Editor block: ${ clientId }`,
			{ type: 'snackbar' }
		);
	}
);
```

## Compatibility and failure cautions

The action signals generation completion, not correctness, successful publication, or durable storage. Never persist `clientId`, send it to an external service as a content ID, or start an unbounded second generation. Keep the callback fast and tolerate blocks or editor stores that are no longer present. The callback can observe generated content only through normal editor APIs and permissions.

## Verification

Load the companion editor script with Jetpack AI Assistant, generate a synthetic Contact Form, and confirm one snackbar appears after completion. Repeat for another block and confirm no notice appears. Reload the editor and verify the integration does not depend on the previous `clientId`.

## Source

[View the documented JavaScript action and its Forms use case at the pinned revision.](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant/extensions/text-blocks/with-ai-text-extension.tsx#L278-L288)
