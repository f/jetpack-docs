---
title: Use and configure Jetpack CRM
description: Install Jetpack CRM, define customer-data access, configure a minimal workflow, and verify it with synthetic records.
audience: site-user
document_type: how-to
sidebar_position: 10
sidebar_collapsed: false
product: crm
source_ref: a6e65435e2531e430c75024f1183612f31263d1f
last_reviewed: 2026-08-05
---

<!-- jetpack-docs:product-blocks:start -->

<!-- wp:docspress/flow {"start":1,"steps":[{"title":"Define access and retention","content":"\u003cp\u003eMap CRM roles, record ownership, export access, deletion authority, and retention before importing any data.\u003c/p\u003e"},{"title":"Configure the owning product","content":"\u003cp\u003eInstall Jetpack CRM from its canonical distribution and enable only required extensions and integrations.\u003c/p\u003e"},{"title":"Verify with synthetic records","content":"\u003cp\u003eCreate, update, search, export, and delete non-production contacts while checking the least-privileged intended role.\u003c/p\u003e"}]} /-->

<!-- wp:docspress/callout {"tone":"warning","title":"Permissions and data boundary","content":"\u003cp\u003eCRM records can be highly sensitive. Never use a production export for development, and do not grant administrator access merely to bypass a capability problem.\u003c/p\u003e","collapsible":false,"open":true} /-->
<!-- jetpack-docs:product-blocks:end -->

Use the [current Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) for the installed version's screens and feature instructions. This page supplies a safe sequence that remains useful as the UI changes.

## Plan access and retention

Before creating records, decide:

- Which roles can view, add, edit, export, and delete CRM data.
- Which fields are required for the actual customer workflow.
- How imports are reviewed, deduplicated, and reversed.
- How long contacts, notes, documents, and transaction records are retained.
- Which extensions or external systems receive the data.
- How a data-access or deletion request will be fulfilled.

Create a recoverable site and database backup before importing an existing customer list or enabling an extension that changes records.

## Install and configure

1. In **Plugins > Add New**, search for **Jetpack CRM** and confirm the plugin slug is `zero-bs-crm` on the [WordPress.org listing](https://wordpress.org/plugins/zero-bs-crm/).
2. Install and activate it as an authorized administrator.
3. Complete the current setup flow using the [knowledge base](https://kb.jetpackcrm.com/) as the UI authority.
4. Configure organization details, currency and localization, record ownership, and user access before adding live data.
5. Decide whether B2B/company mode, the client portal, custom fields, CSV import, WooCommerce Sync, and mail delivery belong in the first workflow.
6. Enable only the modules or extensions required for that workflow. Record each external destination and credential owner.
7. Create a synthetic contact or company, issue a test quote or invoice, record its transaction, and verify what the same contact sees in the client portal.

## Verify permissions and data flow

Test with both an administrator and the least-privileged CRM user:

1. Confirm the authorized user can create and update the synthetic contact.
2. Confirm an unauthorized WordPress user cannot view, export, or modify CRM records.
3. Export only the synthetic record to an approved temporary location, verify the expected fields, then delete the export.
4. If an extension is enabled, confirm exactly which data it receives and how failures appear.
5. Delete or archive the synthetic data according to the intended retention workflow and confirm the result.

Test the actual built-in roles rather than inventing a generic “CRM user”: CRM Admin, Contact Manager, Quote Manager, Invoice Manager, Transaction Manager, Contact, and Mail Manager have different object capabilities. Keep a short access matrix for the enabled records and client-portal actions.

## Connect Jetpack Forms when needed

Jetpack Forms exposes Jetpack CRM as a supported integration and keeps it disabled by default in the pinned Jetpack source. Enable the CRM plugin's Jetpack Forms extension through the current CRM settings, then connect it in the form workflow. The [pinned Forms integration record](https://github.com/Automattic/jetpack/blob/a6e65435e2531e430c75024f1183612f31263d1f/projects/packages/forms/src/contact-form/class-contact-form-endpoint.php#L68-L78) verifies the cross-product relationship.

Submit a form with a synthetic address and confirm both the Forms response and intended CRM record. Do not assume that success on one side proves the other side succeeded, and do not enable capture for every form without a data purpose.
