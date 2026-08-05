---
title: "Advanced Unison configuration: complete source guide"
description: "Preserve the access-scoped advanced Unison workflow without presenting it as a requirement for public contributors."
audience: contributor
document_type: reference
sidebar_position: 120
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/unison-wordpress-com.md"
source_blob: e3678787544e7b226aea2c3527aec96697ba7f90
source_sha256: 69acf7a03b78a1f3070f7df2178a2168e5a9f83fbd54ead95a7050b45ba8d848
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/unison-wordpress-com.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

Jetpack currently uses a `sun`/`moon` strategy where the current production files are in one folder and the "staging/test" version are in the other folder.

  If you don't want to keep track of which folder is in use during development, you can update your Unison preference file to point to `wp-content/mu-plugins/jetpack-plugin/dev` on your sandbox. If this directory exists, it will be used instead of `sun` or `moon`.

  In the event that you want to sync changes to both `sun` and `moon`, you may want to create _two_ Unison preference files, one file which syncs to the `sun` location and one file which syncs to the `moon` location. Then you would run two separate instances of `unison watch` (as described above).

  For even more advanced usage, you can use the following command to launch tmux with each unison command running in a separate window.

  ```
  tmux new-session -d 'unison -ui text -repeat watch jetpack-plugin-moon' \; split-window -d 'unison -ui text -repeat watch jetpack-plugin-sun' \; attach
  ```

  Note: You will need to adjust the above command depending on the name(s) of your Unison configuration files.
<!-- jetpack-docs:preserved-source:end -->
