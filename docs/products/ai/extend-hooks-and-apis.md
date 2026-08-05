---
title: Extend Jetpack AI Assistant and APIs
description: Use the AI Assistant block and public JavaScript client while respecting authentication, data, and compatibility boundaries.
audience: developer
document_type: reference
sidebar_position: 20
sidebar_collapsed: false
product: ai
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

At the pinned revision, Jetpack AI Assistant does not document a product-specific PHP hook as a stable third-party integration contract. Do not build an integration around feature-flag filters or private service routes found in implementation code. Use WordPress block APIs and the public JavaScript package where its documented host and authentication assumptions fit your application.

## Block surface

The block name is `jetpack/ai-assistant`. Its [pinned `block.json`](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/plugins/jetpack/extensions/blocks/ai-assistant/block.json) is the source for stored attributes and supported block behavior at this revision.

When transforming or inspecting AI Assistant blocks:

- Use `@wordpress/blocks` APIs rather than parsing serialized block comments with regular expressions.
- Preserve unknown attributes so a newer Jetpack version can still read its data.
- Treat generated content as untrusted editor input and escape it according to the output context.
- Do not programmatically start remote generation during page render, autosave, or bulk migration.

## JavaScript client

`@automattic/jetpack-ai-client` is a public package. The [pinned entry point](https://github.com/Automattic/jetpack/blob/5c0d27877fd19504a8de8b8618950d51876816a0/projects/js-packages/ai-client/src/index.ts) exports request helpers, streaming support, React hooks, components, contexts, types, and constants. Install the published package rather than importing source files by path.

```jsx
import { useAiSuggestions } from '@automattic/jetpack-ai-client';

function DraftControl( { prompt } ) {
	const { request, suggestion, error, requestingState } = useAiSuggestions( {
		autoRequest: false,
	} );

	const createDraft = () => request( [ { role: 'user', content: prompt } ] );

	return (
		<div>
			<button disabled={ requestingState === 'requesting' } onClick={ createDraft }>
				Create draft
			</button>
			{ error && <p role="alert">{ error.message }</p> }
			{ suggestion && <p>{ suggestion }</p> }
		</div>
	);
}
```

This example demonstrates the documented hook shape; it is not a standalone authentication setup. The host must provide the WordPress data environment and supported Jetpack AI authentication expected by the package. Never mint, scrape, persist, or proxy Jetpack service tokens through an undocumented flow.

## Integration checklist

- Pin a compatible package version and test its documented exports during upgrades.
- Require an explicit user action before sending prompt content.
- Show requesting, cancellation, empty, and error states accessibly.
- Do not log prompts or generated content by default.
- Validate model output before using it as HTML, code, a URL, or a production action.
- Provide a non-AI path when access, connection, or the remote service is unavailable.

Use the [general hooks reference](/docs/reference/hooks/) only for documented cross-product hooks. The absence of an AI-specific hook contract is deliberate guidance to prefer the public block and package surfaces.
