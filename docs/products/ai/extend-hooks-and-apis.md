---
title: Extend Jetpack AI Assistant and APIs
description: Use the AI Assistant block and public JavaScript client while respecting authentication, data, and compatibility boundaries.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: ai
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/fields {"title":"Jetpack AI Assistant extension surfaces","description":"Start with a documented surface and verify its exact source contract before shipping.","fields":[{"name":"JavaScript hooks","type":"object","required":false,"defaultValue":"","description":"Use jetpack_ai_assistant_generation_complete and jetpack.ai.imageGenerationHandler with their exact signatures.","values":"","deprecated":false},{"name":"AI Client","type":"object","required":false,"defaultValue":"","description":"Use the public package only in a supported host that provides Jetpack authentication state.","values":"","deprecated":false},{"name":"Settings and gates","type":"object","required":false,"defaultValue":"","description":"Treat jetpack_ai_enabled as an availability veto, not a general integration API.","values":"","deprecated":false}],"searchable":false,"compact":true} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Unsupported boundary","content":"\u003cp\u003eA public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

At the pinned revision, AI Assistant provides two deliberately documented JavaScript hooks as well as its block and public JavaScript client. It does not provide a general-purpose PHP generation hook. The PHP `jetpack_ai_enabled` filter is an availability veto, not a generation integration surface: host and master gates are applied after it. Do not build around private service routes or experimental feature flags found in implementation code.

## Block surface

The block name is `jetpack/ai-assistant`. Its [pinned block.json](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/plugins/jetpack/extensions/blocks/ai-assistant/block.json) is the source for stored attributes and supported block behavior at this revision.

When transforming or inspecting AI Assistant blocks:

- Use `@wordpress/blocks` APIs rather than parsing serialized block comments with regular expressions.
- Preserve unknown attributes so a newer Jetpack version can still read its data.
- Treat generated content as untrusted editor input and escape it according to the output context.
- Do not programmatically start remote generation during page render, autosave, or bulk migration.

## JavaScript hooks

The [jetpack_ai_assistant_generation_complete action](/docs/reference/hooks/actions/jetpack-ai-assistant-generation-complete/) fires after AI generation completes for an extended editor block. Its callback receives the editor-session `clientId` and the generated block name. Forms uses it for cross-package coordination; do not persist `clientId` as a content identifier.

The [jetpack.ai.imageGenerationHandler filter](/docs/reference/hooks/filters/jetpack-ai-image-generation-handler/) lets an external plugin replace the built-in image-generation entry point. The callback receives the previous handler and an options object, and must return a callable or `null`. Preserve `entryPoint`, `onImageSelect`, placement, and disabled state rather than bypassing upgrade or availability gates.

The [jetpack_ai_enabled filter](/docs/reference/hooks/filters/jetpack-ai-enabled/) can turn availability off at a call site. Its default varies, and the host and master gates remain final, so returning `true` cannot reliably force AI on.

## JavaScript client

`@automattic/jetpack-ai-client` is a public package. The [pinned entry point](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/js-packages/ai-client/src/index.ts) exports request helpers, streaming support, React hooks, components, contexts, types, and constants. Install the published package rather than importing source files by path.

```jsx
import { useAiSuggestions } from '@automattic/jetpack-ai-client';

function DraftControl( { prompt } ) {
	const { request, stopSuggestion, suggestion, error, requestingState } = useAiSuggestions( {
		autoRequest: false,
	} );

	const createDraft = () => request( [ { role: 'user', content: prompt } ] );
	const isRunning = [ 'requesting', 'suggesting' ].includes( requestingState );

	return (
		<div>
			<button disabled={ isRunning } onClick={ createDraft }>
				Create draft
			</button>
			{ isRunning && <button onClick={ stopSuggestion }>Stop</button> }
			{ error && <p role="alert">{ error.message }</p> }
			{ suggestion && <p>{ suggestion }</p> }
		</div>
	);
}
```

This example demonstrates the documented hook shape inside a supported Jetpack and WordPress editor host; it is not a standalone authentication setup. Disabling during both `requesting` and `suggesting` prevents a duplicate request while a response streams. The host must provide the WordPress data environment and supported Jetpack AI authentication expected by the package. Never mint, scrape, persist, or proxy Jetpack service tokens through an undocumented flow.

## Integration checklist

- Pin a compatible package version and test its documented exports during upgrades.
- Avoid unsolicited requests on ordinary render. Any automatic continuation must originate from a clearly initiated user flow.
- Show requesting, cancellation, empty, and error states accessibly.
- Do not log prompts or generated content by default.
- Validate model output before using it as HTML, code, a URL, or a production action.
- Provide a non-AI path when access, connection, or the remote service is unavailable.

Use the [hooks reference](/docs/reference/hooks/) for the exact JavaScript action, JavaScript filter, and availability-filter contracts. Other AI feature flags and service requests remain implementation details unless their owner documents them as public surfaces.
