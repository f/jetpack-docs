#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '..' );
const catalog = JSON.parse( await fs.readFile( path.join( repositoryRoot, 'docs/products/catalog.json' ), 'utf8' ) );

const profiles = {
	jetpack: {
		steps: [
			[ 'Confirm the platform', 'Check the current WordPress, PHP, extension, backup, and administrator requirements before activation.' ],
			[ 'Register the site and authorize a user', 'Distinguish the site connection from the current user connection and record who owns the connection.' ],
			[ 'Enable and verify one module', 'Check its site and user connection requirements, exercise one observable outcome, and record versions.' ],
		],
		privacy: 'Connection and data behavior is feature-specific. Review the selected module before enabling it; site registration does not automatically authorize every user or data flow.',
		surfaces: [ [ 'WordPress hooks', 'Use curated public actions and filters with exact timing and return contracts.' ], [ 'Abilities API', 'Use Jetpack module and connection abilities when the installed version exposes them.' ], [ 'Blocks and packages', 'Prefer registered block contracts and the public entry point of the owning package.' ] ],
		tree: 'projects/plugins/jetpack/\n  modules/\n  extensions/\n  _inc/\n  src/\nprojects/packages/',
		command: 'jp install plugins/jetpack\njp build plugins/jetpack --deps\njp test js plugins/jetpack\njp test typecheck plugins/jetpack\njp phan plugins/jetpack',
		setupQuestion: 'Does Jetpack report a healthy site connection, owner, and current-user state for this feature?',
		setupOutcome: 'Run the current connection health checks and inspect accidental offline mode before resetting or reconnecting anything.',
		verification: 'The selected module works for the intended role, the site and user connection states are understood, and no unrelated module changed.',
	},
	forms: {
		steps: [
			[ 'Choose the form model', 'Select a form variation and decide whether it should be local to a post or a synced reusable form.' ],
			[ 'Choose response destinations', 'Configure local storage, notifications, and only the integrations or webhooks the site is authorized to use.' ],
			[ 'Submit from Form Preview', 'Use a synthetic test response, confirm its Test status, permissions, and every configured destination.' ],
		],
		privacy: 'Responses can include submitted fields plus request metadata such as IP address, browser, country, and source. Apply least privilege, retention rules, and the documented IP-forgetting filter where required.',
		surfaces: [ [ 'Forms hooks', 'Use the documented post-insert, redirect, and IP-forgetting contracts.' ], [ 'WordPress Abilities', 'Use the eight Forms abilities for validated form and response operations when available.' ], [ 'Blocks and integrations', 'Use synced-form entities, registered block attributes, and product-owned integrations rather than private tables.' ] ],
		tree: 'projects/packages/forms/\n  src/abilities/\n  src/blocks/\n  src/contact-form/\n  src/dashboard/\n  src/routes/\n  tests/',
		command: 'jp install packages/forms\njp build packages/forms --deps\njp test php packages/forms\njp test js packages/forms\njp test typecheck packages/forms\njp phan packages/forms',
		setupQuestion: 'Can the editor load the form or synced-form reference and is at least one response destination enabled?',
		setupOutcome: 'Check the form reference, edit_pages access, collection settings, and administrator authority for outbound destinations.',
		verification: 'A Form Preview submission is labeled as a test and reaches each authorized destination exactly once.',
	},
	ai: {
		steps: [
			[ 'Confirm availability', 'Check host policy, site and current-user connections, site-wide settings, writing-assistant settings, and entitlement.' ],
			[ 'Generate with bounded context', 'Choose an explicit tool or prompt and assume the title, preceding content, or working post may be included in the request.' ],
			[ 'Review, accept, and inspect', 'Verify claims and rights, accept only wanted content, then inspect ordinary blocks, saved attributes, and revisions.' ],
		],
		privacy: 'Prompts, generation history, title, preceding content, and whole-post context may be transmitted or stored in block attributes, revisions, and debug logs. Never use secrets or unapproved private content.',
		surfaces: [ [ 'JavaScript hooks', 'Use jetpack_ai_assistant_generation_complete and jetpack.ai.imageGenerationHandler with their exact signatures.' ], [ 'AI Client', 'Use the public package only in a supported host that provides Jetpack authentication state.' ], [ 'Settings and gates', 'Treat jetpack_ai_enabled as an availability veto, not a general integration API.' ] ],
		tree: 'projects/plugins/jetpack/\n  extensions/blocks/ai-assistant/\n  extensions/plugins/ai-assistant-plugin/\n  _inc/lib/class-jetpack-ai-settings.php\nprojects/js-packages/ai-client/\nprojects/packages/my-jetpack/',
		command: 'jp build js-packages/ai-client --deps\njp test js js-packages/ai-client\njp test typecheck js-packages/ai-client\njp build plugins/jetpack --deps\njp test typecheck plugins/jetpack\njp docker phpunit jetpack -- --filter=AI_Assistant',
		setupQuestion: 'Do host policy, site connection, current-user connection, AI settings, and entitlement all permit the requested AI surface?',
		setupOutcome: 'Resolve the first failed availability gate; do not treat quota, moderation, authentication, and network failures as the same problem.',
		verification: 'A synthetic prompt completes or stops cleanly, no duplicate request runs while streaming, and accepted content becomes reviewable ordinary blocks.',
	},
	crm: {
		steps: [
			[ 'Define access and retention', 'Map CRM roles, record ownership, export access, deletion authority, and retention before importing any data.' ],
			[ 'Configure the owning product', 'Install Jetpack CRM from its canonical distribution and enable only required extensions and integrations.' ],
			[ 'Verify with synthetic records', 'Create, update, search, export, and delete non-production contacts while checking the least-privileged intended role.' ],
		],
		privacy: 'CRM records can be highly sensitive. Never use a production export for development, and do not grant administrator access merely to bypass a capability problem.',
		surfaces: [ [ 'CRM API', 'Follow the pinned external CRM API documentation for authentication, permissions, pagination, and errors.' ], [ 'CRM hooks', 'Use only current hooks documented and owned by the CRM project.' ], [ 'Jetpack Forms integration', 'Use the CRM-owned extension and Forms integration instead of writing directly to CRM tables.' ] ],
		tree: 'Automattic/jetpack-crm @ 8dbe017c\n  Makefile\n  admin/contact/\n  admin/company/\n  includes/\n  extensions/\nAutomattic/jetpack\n  projects/packages/forms/',
		command: 'make help\nmake install\nmake up\nmake test\nmake test-acceptance\nmake lint\nmake lint-staged\nmake lint-css\nmake build\nmake wp\nmake logs',
		setupQuestion: 'Can the intended CRM role create and read a synthetic record without elevated access?',
		setupOutcome: 'Check CRM capabilities, ownership, extension activation, and schema state in the external CRM project.',
		verification: 'Synthetic records follow the intended permissions and retention path, and a Forms integration creates one expected CRM record.',
	},
	social: {
		steps: [
			[ 'Prepare the account relationship', 'Confirm the Jetpack site connection, destination account, authorized WordPress user, and connection-sharing policy.' ],
			[ 'Configure publication', 'Select supported destinations, decide who may publish, and set per-post message and media behavior.' ],
			[ 'Publish one controlled post', 'Compare WordPress publication, Jetpack Social status, and destination result before retrying or automating.' ],
		],
		privacy: 'Destination credentials and connections belong to specific users or shared policies. Do not expose tokens, assume a personal connection is shared, or retry an ambiguous publish result blindly.',
		surfaces: [ [ 'Publication filters', 'Use documented filters for sharing decisions, messages, and capability behavior.' ], [ 'Publicize package', 'Make shared changes in projects/packages/publicize rather than a removed modules/publicize path.' ], [ 'Editor data', 'Use registered editor and REST contracts without copying private destination endpoints.' ] ],
		tree: 'projects/plugins/social/\nprojects/packages/publicize/\nprojects/js-packages/\n  social-previews/\n  social-logos/',
		command: 'jp build plugins/social --deps\njp test php plugins/social\njp phan plugins/social\njp test php packages/publicize\njp test js packages/publicize\njp test typecheck packages/publicize',
		setupQuestion: 'Is the correct destination connected to the publishing user or intentionally shared with the required role?',
		setupOutcome: 'Check site connection, destination authorization, sharing policy, publish capability, and whether the post type is supported.',
		verification: 'One controlled post reaches each selected destination once with the intended text, canonical URL, and media.',
	},
	stats: {
		steps: [
			[ 'Choose a collection policy', 'Define consent, excluded roles or visitors, retention expectations, and who may view reports.' ],
			[ 'Enable the correct Stats surface', 'Confirm the package or main-plugin integration loads without duplicating another analytics snippet.' ],
			[ 'Verify collection and reporting', 'Use a controlled signed-out visit, inspect consent and blockers, then allow for documented processing time.' ],
		],
		privacy: 'Metrics and custom dimensions must not carry personal or unapproved data. Compare analytics tools only after aligning consent, exclusions, timezone, bots, and metric definitions.',
		surfaces: [ [ 'Tracking filters', 'Use documented filters for privacy, exclusions, and non-personal custom dimensions.' ], [ 'WordPress Abilities', 'Use the seven feature-gated Stats abilities with view_stats or manage_options as required.' ], [ 'Reports and packages', 'Use documented WPCOM_Stats reports and package entry points while preserving caching and capability checks.' ] ],
		tree: 'projects/packages/\n  stats/\n  stats-admin/\nprojects/plugins/jetpack/modules/stats.php',
		command: 'jp test php packages/stats\njp phan packages/stats\njp test php packages/stats-admin\njp phan packages/stats-admin\njp build plugins/jetpack --deps',
		setupQuestion: 'Does a controlled eligible visit emit the Stats request under the expected consent and exclusion state?',
		setupOutcome: 'Check module activation, site connection, rendered asset, consent, exclusions, blockers, and cache variants.',
		verification: 'An eligible controlled visit is collected while excluded or non-consenting visits remain excluded according to policy.',
	},
	boost: {
		steps: [
			[ 'Record a baseline', 'Capture representative URLs, device profiles, visual output, and interaction behavior before optimization.' ],
			[ 'Enable one module', 'Turn on one Boost optimization at a time and wait for its documented generation or analysis step.' ],
			[ 'Compare the same paths', 'Retest cached and uncached output, key interactions, images, layout, and the same performance profile.' ],
		],
		privacy: 'Performance changes can alter page markup, script timing, caching, and external delivery. Keep a rollback path and never exclude a handle before identifying its registered owner.',
		surfaces: [ [ 'Cache and optimization hooks', 'Use curated Cache API actions and filters plus render-blocking and Critical CSS contracts.' ], [ 'WordPress Abilities', 'Use the four manage_options-gated Boost abilities when the installed version exposes them.' ], [ 'Boost packages', 'Make shared changes in boost-core, boost-speed-score, or boost-score-api at the owning layer.' ] ],
		tree: 'projects/plugins/boost/\nprojects/packages/\n  boost-core/\n  boost-speed-score/\nprojects/js-packages/boost-score-api/',
		command: 'jp install plugins/boost\njp build plugins/boost --deps\njp test php plugins/boost\njp test js plugins/boost\njp phan plugins/boost\njp test js js-packages/boost-score-api\njp test typecheck js-packages/boost-score-api',
		setupQuestion: 'Does the symptom disappear when only the relevant Boost module is disabled on staging?',
		setupOutcome: 'Check generation status, cache layers, registered handles, and module prerequisites before regenerating or excluding assets.',
		verification: 'The optimized page preserves layout and interaction behavior while the same measurement profile shows the intended improvement.',
	},
	search: {
		steps: [
			[ 'Confirm indexing scope', 'Connect the site, identify searchable post types and visibility rules, and wait for a controlled item to index.' ],
			[ 'Choose the search experience', 'Configure Instant Search, blocks, filters, sorting, and display without bypassing content permissions.' ],
			[ 'Test a query set', 'Use representative exact, broad, filtered, empty, private, and newly published cases.' ],
		],
		privacy: 'Search must never expose private, draft, restricted, or deleted content through results, facets, snippets, or cached indexes. Treat exposure as a security issue.',
		surfaces: [ [ 'Query filters', 'Use the curated should-handle-query and Elasticsearch query-argument contracts.' ], [ 'Search package', 'Reuse projects/packages/search through documented public entry points.' ], [ 'Blocks and Instant Search', 'Extend registered interfaces without depending on compiled bundles or private service requests.' ] ],
		tree: 'projects/plugins/search/\nprojects/plugins/jetpack/modules/search.php\nprojects/packages/\n  search/\n  sync/src/modules/class-search.php',
		command: 'jp install plugins/search\njp build plugins/search --deps\njp test php plugins/search\njp test php packages/search\njp test js packages/search\njp phan plugins/search\njp phan packages/search',
		setupQuestion: 'Is the missing item public, eligible for indexing, and present in ordinary WordPress search?',
		setupOutcome: 'Check visibility, post type, indexing status, Sync health, and the difference between native and Instant Search.',
		verification: 'Representative queries return relevant eligible content and never reveal restricted items or fields.',
	},
	videopress: {
		steps: [
			[ 'Confirm connection and media policy', 'Check upload authorization, file requirements, captions, poster ownership, and visitor privacy expectations.' ],
			[ 'Upload and place the video', 'Use the VideoPress workflow and registered block rather than embedding an undocumented service URL.' ],
			[ 'Verify playback variants', 'Test signed-in and signed-out playback, a narrow viewport, captions, poster, chapters, and restricted content.' ],
		],
		privacy: 'Video upload and playback use hosted processing and delivery. Do not upload confidential media as a test, and confirm the intended public or restricted audience before publishing.',
		surfaces: [ [ 'Video details filter', 'Use the curated videopress_get_video_details filter and preserve the required return shape.' ], [ 'VideoPress package', 'Reuse the package through its documented entry point.' ], [ 'Block contract', 'Use the registered block name and attributes; do not manipulate internal player bundles.' ] ],
		tree: 'projects/plugins/videopress/\nprojects/plugins/jetpack/modules/videopress/\nprojects/packages/videopress/',
		command: 'jp install plugins/videopress\njp build packages/videopress --deps\njp docker link-plugin videopress\njp test php packages/videopress\njp test js packages/videopress\njp test typecheck packages/videopress\njp phan packages/videopress',
		setupQuestion: 'Does the upload complete and does the same video play in a signed-out browser without console or network errors?',
		setupOutcome: 'Check connection, authorization, file constraints, processing state, public reachability, and player assets separately.',
		verification: 'The intended audience can play the video with correct poster, captions, chapters, and responsive layout.',
	},
	akismet: {
		steps: [
			[ 'Authorize the service', 'Install Akismet from its canonical distribution, enter an authorized key, and verify it without exposing the value.' ],
			[ 'Protect each input surface', 'Confirm every comment or form integration sends the documented fields and cannot be abused as an open relay.' ],
			[ 'Test classification and recovery', 'Use official synthetic test conventions, then verify spam, ham, moderation, and service-failure paths.' ],
		],
		privacy: 'Akismet evaluates submitted content and request metadata. Minimize fields, document the disclosure, protect keys, and never put real visitor submissions into development fixtures.',
		surfaces: [ [ 'Akismet HTTP API', 'Use only documented verify-key, comment-check, submit-spam, and submit-ham methods.' ], [ 'WordPress hook and Abilities', 'Use akismet_request_args and the two permission-gated abilities with explicit MCP opt-in.' ], [ 'External ownership', 'Route Akismet plugin changes to its pinned public SVN source and support process, not the Jetpack monorepo.' ] ],
		tree: 'WordPress.org SVN @ tag 5.7, r3514187\n  class.akismet.php\n  abilities/\nYour integration\n  adapter/\n  tests/',
		command: 'svn export -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/ akismet-5.7\nsvn info -r 3514187 https://plugins.svn.wordpress.org/akismet/tags/5.7/',
		setupQuestion: 'Is the key accepted and does the failing input surface actually invoke its Akismet integration?',
		setupOutcome: 'Check key status, outbound HTTPS, documented fields, trusted proxy handling, and the consuming plugin integration.',
		verification: 'Official synthetic spam and ham cases classify as expected without exposing the key or real visitor data.',
	},
	backup: {
		steps: [
			[ 'Confirm a recoverable backup', 'Check the latest completed activity, included data, credentials, free space, and an independent access path.' ],
			[ 'Choose the restore scope', 'Select the correct point and decide whether files, database tables, or both need restoration.' ],
			[ 'Restore and verify', 'Protect new writes, run the supported restore, then test content, users, media, plugins, and critical transactions.' ],
		],
		privacy: 'Backups can contain the entire site, including credentials and customer data. Restrict downloads, logs, helper scripts, and restore access; delete temporary copies securely.',
		surfaces: [ [ 'WordPress Abilities', 'Use four manage_options-gated read/request operations; request-backup is a confirmed non-idempotent mutation.' ], [ 'Initialization action', 'Use the curated jetpack_backup_initialized action only after its owning package is ready.' ], [ 'Operational boundary', 'No restore or download ability exists; do not call private restore or storage endpoints.' ] ],
		tree: 'projects/plugins/backup/\nprojects/packages/\n  backup/\n  backup-helper-script-manager/',
		command: 'jp install plugins/backup\njp build plugins/backup --deps\njp test php packages/backup\njp test js packages/backup\njp test php plugins/backup\njp test php packages/backup-helper-script-manager\npnpm --dir projects/packages/backup run typecheck\njp phan packages/backup\njp phan plugins/backup',
		setupQuestion: 'Is there a recent completed backup and an independent way to regain access if restore fails?',
		setupOutcome: 'Check plugin connection, activity state, storage or download errors, credentials, disk space, and support status before retrying.',
		verification: 'The selected restore scope completes and the same critical content, login, media, and transaction checks pass afterward.',
	},
	protect: {
		steps: [
			[ 'Establish the baseline', 'Update the site, confirm backups, record versions, and review who may view or change security findings.' ],
			[ 'Triage one finding', 'Verify the component and version, read the remediation, and test the proposed update or mitigation on staging.' ],
			[ 'Remediate and rescan', 'Apply the smallest supported change, check site behavior, and confirm the finding status updates.' ],
		],
		privacy: 'Security findings and diagnostic data can expose vulnerable versions or site details. Share the minimum evidence through the official support or security channel.',
		surfaces: [ [ 'Protect packages', 'Use protect-models and protect-status for their documented data contracts.' ], [ 'Account Protection policy', 'Narrow protected-user decisions without disabling protection broadly.' ], [ 'Recovery email policy', 'Suppress recovery mail only when an equivalent secure recovery path exists.' ] ],
		tree: 'projects/plugins/protect/\nprojects/packages/\n  account-protection/\n  protect-models/\n  protect-status/\n  waf/\nprojects/js-packages/scan/',
		command: 'jp install plugins/protect\njp build plugins/protect --deps\njp test php plugins/protect\njp test php packages/protect-models\njp test php packages/protect-status\njp test php packages/account-protection\njp test php packages/waf\njp test js js-packages/scan\npnpm --dir projects/js-packages/scan run typecheck\njp phan plugins/protect',
		setupQuestion: 'Is the finding tied to the installed component and version, and can the proposed remediation be tested on staging?',
		setupOutcome: 'Refresh product status, verify scanner connectivity and versions, then separate stale, disputed, and actionable findings.',
		verification: 'The finding is resolved or explicitly accepted with evidence, and security, login, editor, and public-site smoke tests still pass.',
	},
	scan: {
		steps: [
			[ 'Confirm Scan status', 'Verify connection, last successful scan, backups, site access, and authority before taking remediation action.' ],
			[ 'Assess one threat', 'Inspect the affected path, signature, modification evidence, and whether the component can be replaced safely.' ],
			[ 'Remediate and rescan', 'Use the supported fix or a controlled clean replacement, rotate affected credentials, and confirm the threat stays clear.' ],
		],
		privacy: 'Threat evidence may contain file paths, vulnerable code, credentials, or personal data. Keep raw samples private and use the security reporting route for vulnerabilities.',
		surfaces: [ [ 'Native Scan package', 'Contribute wp-admin state and privileged bridges in projects/packages/scan.' ], [ '@automattic/jetpack-scan', 'Reuse documented types, utilities, and threat components in authorized Jetpack interfaces.' ], [ 'No public control-route contract', 'No public Scan ability or remote control API exists at this revision.' ] ],
		tree: 'projects/packages/scan/\nprojects/js-packages/scan/\nprojects/plugins/jetpack/modules/scan/',
		command: 'jp test js js-packages/scan\npnpm --dir projects/js-packages/scan run typecheck\njp build plugins/jetpack --deps\njp docker phpunit jetpack',
		setupQuestion: 'Is Scan current and connected, and do you have a recent backup plus independent administrative access?',
		setupOutcome: 'Restore scanner status first; preserve the threat evidence and avoid repeated fixes while state is stale.',
		verification: 'A rescan remains clear and file integrity, login, editor, public pages, scheduled tasks, and credential rotation are verified.',
	},
};

function safeBlock( name, attrs ) {
	const json = JSON.stringify( attrs )
		.replaceAll( '<', '\\u003c' )
		.replaceAll( '>', '\\u003e' )
		.replaceAll( '&', '\\u0026' )
		.replaceAll( '--', '\\u002d\\u002d' );
	return `<!-- wp:${ name } ${ json } /-->`;
}

function lifecyclePaths( product ) {
	const root = `/docs/products/${ product.id }`;
	return safeBlock( 'docspress/audience-paths', {
		eyebrow: product.label,
		title: 'Choose the next lifecycle step',
		description: `Move from a safe ${ product.label } setup to supported extension, contribution, and diagnosis paths.`,
		paths: [
			{ title: 'Use and configure', description: `Set up ${ product.label } and verify its primary outcome.`, url: `${ root }/use-and-configure/`, cta: 'Configure', icon: 'settings', accent: 'green', newTab: false },
			{ title: 'Extend, hooks, and APIs', description: 'Choose a documented surface and respect its ownership boundary.', url: `${ root }/extend-hooks-and-apis/`, cta: 'Extend', icon: 'plug', accent: 'blue', newTab: false },
			{ title: 'Develop and test', description: 'Work in the owning source and run project-specific checks.', url: `${ root }/develop-and-test/`, cta: 'Develop', icon: 'testing', accent: 'gold', newTab: false },
			{ title: 'Troubleshoot and support', description: 'Isolate the failing layer and collect safe evidence.', url: `${ root }/troubleshoot-and-support/`, cta: 'Troubleshoot', icon: 'troubleshoot', accent: 'coral', newTab: false },
		],
		columns: 2,
		tone: 'paper',
		textAlign: 'left',
		compact: true,
		showNumbers: false,
		showIcons: true,
		showLinks: true,
	} );
}

function blocksFor( product, lifecycle ) {
	const profile = profiles[ product.id ];
	if ( ! profile ) {
		throw new Error( `Missing DocsPress profile for ${ product.id }.` );
	}
	if ( lifecycle === 'index.md' ) {
		return [ lifecyclePaths( product ), safeBlock( 'docspress/callout', {
			tone: 'note',
			title: 'Product boundary',
			content: `<p>${ profile.privacy }</p>`,
			collapsible: true,
			open: false,
		} ) ];
	}
	if ( lifecycle === 'use-and-configure.md' ) {
		return [
			safeBlock( 'docspress/flow', { start: 1, steps: profile.steps.map( ( [ title, content ] ) => ( { title, content: `<p>${ content }</p>` } ) ) } ),
			safeBlock( 'docspress/callout', { tone: 'warning', title: 'Permissions and data boundary', content: `<p>${ profile.privacy }</p>`, collapsible: false, open: true } ),
		];
	}
	if ( lifecycle === 'extend-hooks-and-apis.md' ) {
		return [
			safeBlock( 'docspress/fields', {
				title: `${ product.label } extension surfaces`,
				description: 'Start with a documented surface and verify its exact source contract before shipping.',
				fields: profile.surfaces.map( ( [ name, description ] ) => ( { name, type: 'object', required: false, defaultValue: '', description, values: '', deprecated: false } ) ),
				searchable: false,
				compact: true,
			} ),
			safeBlock( 'docspress/callout', { tone: 'warning', title: 'Unsupported boundary', content: '<p>A public class, REST request, or raw hook occurrence is not automatically a compatibility contract. Use only documented surfaces and keep a safe no-product fallback.</p>', collapsible: false, open: true } ),
		];
	}
	if ( lifecycle === 'develop-and-test.md' ) {
		return [
			safeBlock( 'docspress/file-tree', { root: product.ownership.repository, tree: profile.tree, caption: `${ product.label } source ownership at the pinned review revision.`, collapsible: true, open: true } ),
			safeBlock( 'docspress/terminal-session', { title: `${ product.label } project checks`, shell: 'bash', prompt: '$', command: profile.command, output: 'Run only the checks defined by the owning project, then verify the changed behavior in WordPress.' } ),
		];
	}
	if ( lifecycle === 'troubleshoot-and-support.md' ) {
		return [
			safeBlock( 'docspress/troubleshooter', {
				title: `Triage ${ product.label }`,
				intro: 'Use synthetic data on staging when possible. Record the first failed boundary before changing configuration.',
				startId: 'setup',
				questions: [
					{ id: 'setup', question: profile.setupQuestion, yesLabel: 'Yes', yesNext: 'reproduce', noLabel: 'No or unknown', noNext: 'setup-check' },
					{ id: 'reproduce', question: 'Can the same symptom be reproduced with a minimal synthetic case on staging?', yesLabel: 'Yes', yesNext: 'isolate', noLabel: 'No', noNext: 'collect' },
				],
				outcomes: [
					{ id: 'setup-check', status: 'warning', title: 'Restore the product prerequisite', content: `<p>${ profile.setupOutcome }</p>` },
					{ id: 'isolate', status: 'neutral', title: 'Isolate the failing layer', content: '<p>Change one variable at a time, preserve logs and versions, and compare product, WordPress, browser, theme, plugin, cache, and service boundaries.</p>' },
					{ id: 'collect', status: 'neutral', title: 'Collect safe evidence', content: '<p>Record the exact action, role, time, versions, and sanitized error. Do not include tokens, private URLs, customer content, or raw production data.</p>' },
				],
				showProgress: true,
			} ),
			safeBlock( 'docspress/result', { status: 'success', title: 'Verification target', content: `<p>${ profile.verification }</p>`, meta: 'Recheck after every change' } ),
		];
	}
	throw new Error( `Unknown lifecycle ${ lifecycle }.` );
}

const markerPattern = /\n?<!-- jetpack-docs:product-blocks:start -->[\s\S]*?<!-- jetpack-docs:product-blocks:end -->\n?/;
const oldLifecycleBlockPattern = /\n<!-- wp:docspress\/audience-paths \{[^\n]*"eyebrow":"[^"]+"[^\n]*\} \/-->\n/;
const lifecycles = [ 'index.md', 'use-and-configure.md', 'extend-hooks-and-apis.md', 'develop-and-test.md', 'troubleshoot-and-support.md' ];

for ( const product of catalog.products ) {
	for ( const lifecycle of lifecycles ) {
		const filename = path.join( repositoryRoot, 'docs/products', product.id, lifecycle );
		let content = await fs.readFile( filename, 'utf8' );
		content = content.replace( markerPattern, '\n' );
		if ( lifecycle === 'index.md' ) {
			content = content.replace( oldLifecycleBlockPattern, '\n' );
		}
		const frontMatter = content.match( /^---\r?\n[\s\S]*?\r?\n---\r?\n/ );
		if ( ! frontMatter ) {
			throw new Error( `${ filename } has no front matter.` );
		}
		const blocks = blocksFor( product, lifecycle ).join( '\n\n' );
		const insertion = `\n<!-- jetpack-docs:product-blocks:start -->\n\n${ blocks }\n<!-- jetpack-docs:product-blocks:end -->\n\n`;
		content = `${ frontMatter[ 0 ] }${ insertion }${ content.slice( frontMatter[ 0 ].length ).replace( /^\n+/, '' ) }`;
		await fs.writeFile( filename, content );
	}
}

console.log( `Enriched ${ catalog.products.length * lifecycles.length } product lifecycle pages with product-specific DocsPress blocks.` );
