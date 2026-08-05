---
title: Develop and test Jetpack CRM
description: Contribute CRM changes in the owning repository and test Jetpack integrations only in the Jetpack project that owns them.
audience: contributor
document_type: how-to
sidebar_position: 30
sidebar_collapsed: false
product: crm
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/file-tree {"root":"Automattic/jetpack-crm","tree":"Automattic/jetpack-crm @ 8dbe017c\n  Makefile\n  admin/contact/\n  admin/company/\n  includes/\n  extensions/\nAutomattic/jetpack\n  projects/packages/forms/","caption":"Jetpack CRM source ownership at the pinned review revision.","collapsible":true,"open":true} /-->

<!-- wp:docspress/terminal-session {"title":"Jetpack CRM project checks","shell":"bash","prompt":"$","command":"make help\nmake install\nmake up\nmake test\nmake test-acceptance\nmake lint\nmake lint-staged\nmake lint-css\nmake build\nmake wp\nmake logs","output":"Run only the checks defined by the owning project, then verify the changed behavior in WordPress."} /-->
<!-- jetpack-docs:product-blocks:end -->

Core CRM work belongs in [Automattic/jetpack-crm at the reviewed revision](https://github.com/Automattic/jetpack-crm/tree/8dbe017c517819a7f6c583dff6e4cb8819a7f72e), not `/projects/plugins` in the Jetpack monorepo. The CRM repository has its own dependencies, local WordPress environment, tests, lint rules, build, changelog, and release process. The reviewed minimums are WordPress 6.0 and PHP 7.4.

## Work in the CRM repository

The pinned [CRM development README](https://github.com/Automattic/jetpack-crm/blob/8dbe017c517819a7f6c583dff6e4cb8819a7f72e/README.md#L14-L54) exposes its common workflow through a Makefile:

```bash
make help
make install
make up
make test
make lint
make build
make test-acceptance
make lint-staged
make lint-css
make wp
make logs
```

Re-read `make help` and the README before running these commands because CRM evolves independently from the pinned Jetpack revision. Use synthetic contacts and transactions in the local environment. Never seed development with a production CRM export.

For a product change, test:

- Fresh installation and upgrade from a supported prior schema.
- Role and capability boundaries for viewing, editing, exporting, and deleting records.
- Validation, duplicate input, missing related records, and rollback behavior.
- Current supported WordPress and PHP versions.
- Extension enabled, disabled, unavailable, and partial-failure states.
- Import and export with synthetic records, including cleanup.

Submit core fixes and their tests to the CRM repository. Do not add a Jetpack monorepo changelog for a change that only exists in CRM.

## Work on a Jetpack integration

If the defect is in Jetpack Forms discovery or its integration UI, work in [projects/packages/forms](https://github.com/Automattic/jetpack/tree/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms) and use the Jetpack workflow:

```bash
jp build packages/forms --deps
jp test php packages/forms
jp test js packages/forms
jp phan packages/forms
```

Add the required Forms changelog entry and verify the integration with a locally installed CRM plugin. Test three independent outcomes: the Form response is stored, the CRM extension receives it, and the intended CRM record is created once.

When a coordinated change spans both repositories, keep separate pull requests, tests, and release notes. Document compatibility order and ensure either old side fails safely while releases roll out. Report customer-data exposure or authorization flaws through the owning project's security process, not a public issue.
