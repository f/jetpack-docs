---
title: "Develop and test Akismet integrations"
description: "Work in Akismet's external repository or test a consumer against its published service contract."
audience: "contributor"
document_type: "how-to"
sidebar_position: 4
sidebar_collapsed: false
product: "akismet"
last_reviewed: "2026-08-05"
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"https://plugins.svn.wordpress.org/akismet/","tree":"WordPress.org SVN @ tag 5.7, r3514187\n  class.akismet.php\n  abilities/\nYour integration\n  adapter/\n  tests/","caption":"Akismet Anti-spam source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Akismet Anti-spam project checks","shell":"bash","prompt":"$","command":"svn export -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/ akismet-5.7\nsvn info -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

**Akismet is not developed in the Jetpack monorepo.** This review used tag 5.7 at SVN revision 3514187. The canonical public pages do not publish a stable contributor build-and-test command contract, so this guide does not invent one. Use the released source for inspection and ask through [Akismet support](https://akismet.com/support/) for the current contribution route before proposing a plugin change. Do not run `jp build`, add Jetpack changelog files, or claim a Jetpack package owns Akismet code.

To reproduce the source snapshot without taking mutable trunk as evidence:

```bash
svn export -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/ akismet-5.7
svn info -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/
```

## Test an API consumer

Put Akismet behind a small interface in your application. Unit tests should use an HTTP mock and cover:

- A verified and rejected API key.
- Documented spam and ham responses.
- A documented discard-related response header without automatically enabling discard policy.
- Authentication, rate, malformed-response, timeout, DNS, and TLS failures.
- Submission to `submit-spam` and `submit-ham` after moderator action.
- Redaction of keys and personal fields in logs and exception messages.

Integration tests should use the official test conventions from [Akismet's developer documentation](https://akismet.com/developers/) and a dedicated non-production key when required. Do not send fabricated real-person identities, customer submissions, or production comments during automated tests.

## Test a WordPress form integration

Create a disposable WordPress site with Akismet and the consuming plugin. Verify an ordinary submission, the documented spam test, moderation recovery, and service outage behavior. Repeat behind the same trusted proxy pattern used in production so `user_ip` is derived correctly. Confirm that a visitor cannot inject arbitrary Akismet metadata or use the integration endpoint as an unauthenticated relay.

For changes to the Akismet plugin itself, use the contribution route identified by [Akismet's current documentation](https://akismet.com/developers/), not the Jetpack repository. For a security issue, follow [Automattic's security reporting process](https://automattic.com/security/) rather than opening a public issue with exploit details.
