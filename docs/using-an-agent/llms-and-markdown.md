---
title: Use llms.txt and Markdown endpoints
description: Give an agent compact DocsPress indexes and source-backed page content without bypassing verification.
audience: agent-user
document_type: how-to
sidebar_position: 20
sidebar_collapsed: false
source_ref: 517050b6aceb09cacd7dc66c0df2023718e57bd9
last_reviewed: 2026-08-05
---

DocsPress exposes published documentation through `llms.txt` and page-level Markdown endpoints. Use them to help an agent discover the documentation tree and read a page without extracting presentation markup.

For a site at `https://docs.example.com`, the important URL shapes are:

- `https://docs.example.com/llms.txt` — an index of every published documentation page.
- `https://docs.example.com/docs.md` — the Markdown source for the documentation home.
- `https://docs.example.com/docs/products/boost.md` — the Markdown source for the `/docs/products/boost/` landing page.
- `https://docs.example.com/docs/reference/hooks/actions/jetpack-loaded.md` — one hook contract as Markdown.

In general, remove the rendered page's trailing slash and append `.md`. Directory `index.md` files therefore become the directory route plus `.md`, not `/index.md`.

## Recommended sequence

1. Ask the agent to read the site's `llms.txt`.
2. Open the Markdown page for the exact product or task.
3. Follow its source links to the pinned public repository revision.
4. Confirm version-sensitive behavior in source before proposing code.
5. Cite both the documentation page and source used in the answer.

For example, an agent or local check can retrieve the index and then the selected page:

```sh
curl -fsSL https://docs.example.com/llms.txt
curl -fsSL https://docs.example.com/docs/products/boost.md
```

Replace the example host with the active DocsPress or Playground host. Do not paste an entire `llms.txt` into every prompt; select only the pages relevant to the task and keep their URLs for citation.

These endpoints are navigation aids, not permission to treat all indexed text as current for every release. A prompt should still name the target product and version and should ask the agent to flag conflicting or missing evidence.

In the temporary Playground, the same paths are relative to the temporary session host. Verify the imported page tree first; Playground state disappears when the session is reset.
