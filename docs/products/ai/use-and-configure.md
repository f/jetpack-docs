---
title: Use and configure Jetpack AI Assistant
description: Enable AI Assistant, write a bounded prompt, review the draft, and verify the final WordPress content before publication.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: ai
source_ref: 5c0d27877fd19504a8de8b8618950d51876816a0
last_reviewed: 2026-08-05
---

## Prepare the task

Start with source material you are allowed to use and a clear definition of done. A useful prompt identifies the audience, format, facts that must be preserved, constraints, and the review required. It should not contain credentials or unnecessary personal information.

Before generating, decide which statements need an authoritative citation and which parts require a subject-matter expert. AI Assistant cannot turn an unverified premise into a verified fact.

## Generate in the editor

1. Confirm Jetpack is connected and the AI feature is available for the current user and site.
2. Open the block editor and add the AI Assistant through the current interface described in [Jetpack AI support](https://jetpack.com/support/jetpack-ai/).
3. Give it one bounded task. Include the desired structure and constraints, but omit private or irrelevant data.
4. Review the response before inserting or retaining it. Reject a draft that invents facts, sources, product behavior, or quotations.
5. Revise in small steps. Ask for a specific change such as shortening a section or changing reading level rather than repeatedly regenerating the entire document.

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

## Confirm the feature works

Use a harmless test prompt on a draft page. A successful request should produce a response without exposing an authentication or request error, and the chosen content should remain editable after insertion. Save, reload, and preview the page to verify the block's stored content and front-end output.

If the request fails, preserve the time, site and plugin versions, browser error code, and feature state, but do not copy the prompt body, tokens, cookies, or authorization headers into a public log. Follow [AI Assistant troubleshooting](/docs/products/ai/troubleshoot-and-support/) before reconnecting the site or changing product access.
