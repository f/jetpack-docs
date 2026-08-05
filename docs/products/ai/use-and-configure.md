---
title: Use and configure Jetpack AI Assistant
description: Enable AI Assistant, write a bounded prompt, review the draft, and verify the final WordPress content before publication.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: ai
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Confirm availability","content":"\u003cp\u003eCheck host policy, site and current-user connections, site-wide settings, writing-assistant settings, and entitlement.\u003c/p\u003e"},{"title":"Generate with bounded context","content":"\u003cp\u003eChoose an explicit tool or prompt and assume the title, preceding content, or working post may be included in the request.\u003c/p\u003e"},{"title":"Review, accept, and inspect","content":"\u003cp\u003eVerify claims and rights, accept only wanted content, then inspect ordinary blocks, saved attributes, and revisions.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003ePrompts, generation history, title, preceding content, and whole-post context may be transmitted or stored in block attributes, revisions, and debug logs. Never use secrets or unapproved private content.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

## Prepare the task

Start with source material you are allowed to use and a clear definition of done. A useful prompt identifies the audience, format, facts that must be preserved, constraints, and the review required. It should not contain credentials or unnecessary personal information.

Before generating, decide which statements need an authoritative citation and which parts require a subject-matter expert. AI Assistant cannot turn an unverified premise into a verified fact.

## Generate in the editor

1. Confirm the host permits AI, Jetpack is not offline, the site has a connected owner, the current editor user is connected, and the site-wide and writing-assistant settings are enabled. Site settings require `manage_options`; authoring still requires permission to edit this post.
2. Open the block editor and insert the AI Assistant block, including through `/AI` where supported. The product can expose prompt templates and controls for continuing, simplifying, summarizing, generating a title, changing tone, translating, improving, accepting, and retrying text.
3. Give it one bounded task. Include the desired structure and constraints, but omit private or irrelevant data.
4. Review the response before accepting it. Reject a draft that invents facts, sources, product behavior, or quotations.
5. Revise in small steps. Ask for a specific change such as shortening a section or changing reading level rather than repeatedly regenerating the entire document.

Request context is broader than the text typed into the prompt. Depending on the action, AI Assistant can include the post title, content above the target block, or the whole working post. Its serialized attributes can retain prompts, original messages, chat history, generated content, and request state in the post and revisions. Treat the entire working draft as potentially processed and retained, and inspect or redact debug logs because the AI Client can log the question and request options.

A safe starting prompt is:

> Draft a concise explanation for WordPress site administrators. Use only the source notes below, mark any unsupported claim as needing verification, do not invent links or quotations, and finish with a checklist a human can test.

Add the authorized source notes after that instruction; do not paste secrets or private customer content.

## Review before publishing

- Compare factual claims, names, dates, commands, and links against authoritative sources.
- Check that examples are safe for the WordPress and Jetpack versions they claim to support.
- Remove fabricated citations and verify every quotation at its source.
- Check copyright, attribution, privacy, and organizational policy.
- Read the result for clarity, bias, and unintended promises.
- Verify headings, links, images, alt text, keyboard behavior, and narrow-screen layout in the published preview.
- Keep a human approval step for legal, medical, financial, security, account, and production-changing instructions.

When you accept generated Markdown, AI Assistant parses it into ordinary WordPress blocks and replaces the AI block. Inspect the resulting block types and content before saving; acceptance does not establish that the output is correct or safe.

## Confirm the feature works

Use a harmless test prompt on a draft page. A successful request should produce a response without exposing an authentication or request error, and accepted content should become ordinary editable blocks. Save, reload, inspect revisions, and preview the page to verify both retained AI attributes and the final front-end output.

If the request fails, preserve the time, site and plugin versions, browser error code, and feature state, but do not copy the prompt body, tokens, cookies, or authorization headers into a public log. Follow [AI Assistant troubleshooting](/docs/products/ai/troubleshoot-and-support/) before reconnecting the site or changing product access.
