---
title: "Code reviews: complete source guide"
description: "Preserve Jetpack review culture, independent approval, reviewer discovery, and participation guidance."
audience: contributor
document_type: how-to
sidebar_position: 80
sidebar_collapsed: true
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
source_path: "docs/code-reviews.md"
source_blob: e8f3afa92e35a22a332bb7d84b697d7e959929c4
source_sha256: 96a1730883b2cb6b764a798f8523d44899b1f575e97bf3c13adff35f98720b5c
preservation_status: preserved-normalized
last_reviewed: 2026-08-05
---
<!-- wp:docspress/callout {"tone":"note","title":"Preserved from the Jetpack monorepo","content":"\u003cp\u003eThis complete source guide was reorganized from \u003ccode\u003edocs/code-reviews.md\u003c/code\u003e at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.\u003c/p\u003e","collapsible":false,"open":true} /-->

<!-- jetpack-docs:preserved-source:start -->

Code reviews are an important part of the Jetpack workflow. They help to keep code quality consistent, and they help every person working on Jetpack learn and improve over time. We want to make you the best Jetpack contributor you can be.

Every PR should be reviewed and approved by someone other than the author, even if the author has write access. Fresh eyes can find problems that can hide in the open if you’ve been working on the code for a while.

The recommended way of finding an appropriate person to review your code is by [blaming](https://help.github.com/articles/using-git-blame-to-trace-changes-in-a-file/) one of the files you are updating and looking at who was responsible for previous commits on that file.

Then, you may ask that person to review your code by mentioning their GitHub username on the PR comments like this:

```
 cc @username
```

*Everyone* is encouraged to review PRs and add feedback and ask questions, even people who are new to Jetpack. Also, don’t just review PRs about what you’re working on. Reading other people’s code is a great way to learn new techniques, and seeing code outside of your own feature helps you to see patterns across the project. It’s also helpful to see the feedback other contributors are getting on their PRs.

Whether somebody is reviewing your code or you are reviewing somebody else’s code, [a positive mindset towards code reviews](https://medium.com/medium-eng/the-code-review-mindset-3280a4af0a89) helps a ton. We’re building something together that is greater than the sum of its parts.
<!-- jetpack-docs:preserved-source:end -->
