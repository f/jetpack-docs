#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname( fileURLToPath( import.meta.url ) );
const repositoryRoot = path.resolve( scriptDirectory, '..' );
const jetpackRef = 'a6e65435e2531e430c75024f1183612f31263d1f';
const jetpackDocsTree = '66564705886854cfbb3c089df4fe603e8075ec5a';
const reviewedAt = '2026-08-05';

const documents = [
	[ 'docs/CONTRIBUTING.md', 'docs/building-with-jetpack/contributing/repository-guides/index.md', 'Contributing to Jetpack: complete source guide', 'Preserve the Jetpack monorepo contribution entry point, including testing, bug reports, patches, translation, and licensing.', 'contributor', 'overview', 1 ],
	[ 'docs/quick-start.md', 'docs/building-with-jetpack/contributing/repository-guides/quick-start.md', 'Jetpack development quick start: complete source guide', 'Preserve the complete Jetpack quick-start workflow, including installation alternatives, Docker, cloud testing, and test commands.', 'contributor', 'tutorial', 10 ],
	[ 'docs/development-environment.md', 'docs/building-with-jetpack/contributing/repository-guides/development-environment.md', 'Development environment: complete source guide', 'Preserve the detailed Jetpack environment, build, test, lint, debug, and local WordPress guidance.', 'contributor', 'tutorial', 20 ],
	[ 'docs/monorepo.md', 'docs/building-with-jetpack/contributing/repository-guides/monorepo.md', 'Jetpack monorepo: complete source guide', 'Preserve the full Jetpack monorepo architecture, project metadata, tooling, test, publishing, and project-generation reference.', 'contributor', 'reference', 30 ],
	[ 'docs/coding-guidelines.md', 'docs/building-with-jetpack/contributing/repository-guides/coding-guidelines.md', 'Coding standards and guidelines: complete source guide', 'Preserve Jetpack engineering standards for PHP, JavaScript, packages, compatibility, deprecation, widgets, and translations.', 'contributor', 'reference', 40 ],
	[ 'docs/automated-testing.md', 'docs/building-with-jetpack/contributing/repository-guides/automated-testing.md', 'Automated testing: complete source guide', 'Preserve the Jetpack testing taxonomy and its PHPUnit, JavaScript, block, and end-to-end examples.', 'contributor', 'reference', 50 ],
	[ 'docs/git-workflow.md', 'docs/building-with-jetpack/contributing/repository-guides/git-workflow.md', 'Git workflow: complete source guide', 'Preserve the Jetpack Git collaboration, branch-update, external-contributor, conflict, lockfile, and version-fixup guidance.', 'contributor', 'how-to', 60 ],
	[ 'docs/pull-request.md', 'docs/building-with-jetpack/contributing/repository-guides/pull-request.md', 'Pull request lifecycle: complete source guide', 'Preserve the complete Jetpack pull request lifecycle and review-state guidance.', 'contributor', 'how-to', 70 ],
	[ 'docs/code-reviews.md', 'docs/building-with-jetpack/contributing/repository-guides/code-reviews.md', 'Code reviews: complete source guide', 'Preserve Jetpack review culture, independent approval, reviewer discovery, and participation guidance.', 'contributor', 'how-to', 80 ],
	[ 'docs/writing-a-good-changelog-entry.md', 'docs/building-with-jetpack/contributing/repository-guides/changelog-entries.md', 'Writing a good changelog entry: complete source guide', 'Preserve the rationale, commands, and examples for Jetpack project changelog entries.', 'contributor', 'how-to', 90 ],
	[ 'docs/release-management.md', 'docs/building-with-jetpack/contributing/repository-guides/release-management.md', 'Release management: complete source guide', 'Preserve Jetpack plugin milestone, label, primary-issue, and subissue planning guidance.', 'contributor', 'reference', 100 ],
	[ 'docs/deprecating-features.md', 'docs/building-with-jetpack/contributing/repository-guides/deprecating-features.md', 'Deprecating features: complete source guide', 'Preserve Jetpack code deprecation and administrator-notice guidance with its source examples.', 'contributor', 'how-to', 110 ],
	[ 'docs/unison-wordpress-com.md', 'docs/building-with-jetpack/contributing/repository-guides/advanced/unison-wordpress-com.md', 'Advanced Unison configuration: complete source guide', 'Preserve the access-scoped advanced Unison workflow without presenting it as a requirement for public contributors.', 'contributor', 'reference', 120 ],
	[ 'docs/testing/beta-testing.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/beta-testing.md', 'Jetpack beta testing: complete source guide', 'Preserve the full public Jetpack beta participation and issue-reporting workflow.', 'contributor', 'how-to', 10 ],
	[ 'docs/testing/testing-tips.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/testing-tips.md', 'Testing tips source pointer', 'Preserve the Jetpack source pointer to the Beta plugin testing tips.', 'contributor', 'reference', 20 ],
	[ 'docs/testing/regression-checklist/README.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/index.md', 'Regression checklist source overview', 'Preserve the source overview for Jetpack regression-checklist generation.', 'contributor', 'overview', 30 ],
	[ 'docs/testing/regression-checklist/regression-checklist.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/global.md', 'Jetpack global regression checklist', 'Preserve every environment, connection, Sync, product, service, and block item in the source regression checklist.', 'contributor', 'reference', 40 ],
	[ 'docs/testing/regression-checklist/test-suites/extensions/all.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/editor/index.md', 'Editor extensions regression suite', 'Preserve the source checklist for Jetpack editor blocks and extensions.', 'contributor', 'reference', 10 ],
	[ 'docs/testing/regression-checklist/test-suites/extensions/blocks/contact-form.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/editor/contact-form.md', 'Contact Form regression suite', 'Preserve the complete source regression checklist for Jetpack Forms.', 'contributor', 'reference', 20 ],
	[ 'docs/testing/regression-checklist/test-suites/extensions/blocks/memberships.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/editor/memberships.md', 'Memberships regression suite', 'Preserve the source Premium Content and post-visibility regression cases.', 'contributor', 'reference', 30 ],
	[ 'docs/testing/regression-checklist/test-suites/modules/publicize.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/social.md', 'Jetpack Social regression suite', 'Preserve the Publicize source checks while routing current ownership to Jetpack Social and the Publicize package.', 'contributor', 'reference', 50 ],
	[ 'docs/testing/regression-checklist/test-suites/modules/stats.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/stats.md', 'Jetpack Stats regression suite', 'Preserve the source AMP and non-AMP Stats regression checks.', 'contributor', 'reference', 60 ],
	[ 'docs/testing/regression-checklist/test-suites/packages/connection.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/connection.md', 'Connection regression suite', 'Preserve the source site, user, multisite, and consuming-plugin connection checks.', 'contributor', 'reference', 70 ],
	[ 'docs/testing/regression-checklist/test-suites/packages/sync.md', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/sync.md', 'Sync regression suite', 'Preserve the source Jetpack Sync and Activity Log check.', 'contributor', 'reference', 80 ],
	[ 'docs/guides/report-bugs.md', 'docs/using-jetpack/report-a-bug.md', 'Create a useful Jetpack bug report', 'Preserve and reorganize Jetpack source guidance for confirming, searching, reporting, and following up on a bug.', 'site-user', 'how-to', 90 ],
	[ 'docs/translations.md', 'docs/using-jetpack/help-translate.md', 'Help translate Jetpack', 'Preserve the public GlotPress workflow for suggesting and reviewing Jetpack translations.', 'site-user', 'how-to', 100 ],
	[ 'docs/partners/README.md', 'docs/reference/hosting-partners.md', 'Jetpack hosting partners', 'Preserve the Jetpack Hosting Partners pointer and route readers to its canonical public repository.', 'developer', 'reference', 95 ],
	[ 'docs/rest-api.md', 'docs/reference/rest-api/historical-jetpack-v4-inventory.md', 'Historical Jetpack v4 REST inventory', 'Preserve the former Jetpack v4 REST reference as historical source material, with credentials and personal-looking examples redacted.', 'developer', 'reference', 90, 'historical-sanitized' ],
].map( ( [ sourcePath, destination, title, description, audience, documentType, sidebarPosition, status = 'preserved-normalized' ] ) => ( {
	sourcePath,
	destination,
	title,
	description,
	audience,
	documentType,
	sidebarPosition,
	status,
} ) );

const assets = [
	[ 'docs/examples/bootstrap.php', 'docs/building-with-jetpack/contributing/repository-guides/examples/legacy-plugin-bootstrap.php', 'legacy-example' ],
	[ 'docs/examples/unison-sample.prf', 'docs/building-with-jetpack/contributing/repository-guides/advanced/examples/unison-sample.prf', 'preserved-byte-for-byte' ],
	[ 'docs/testing/regression-checklist/mapping.json', 'docs/building-with-jetpack/contributing/repository-guides/testing/regression/source-mapping.json', 'historical-source-snapshot' ],
].map( ( [ sourcePath, destination, status ] ) => ( { sourcePath, destination, status } ) );

const sourceToDestination = new Map( [ ...documents, ...assets ].map( entry => [ entry.sourcePath, entry.destination ] ) );

function sha256( value ) {
	return createHash( 'sha256' ).update( value ).digest( 'hex' );
}

function git( checkout, args ) {
	return execFileSync( 'git', [ '-C', checkout, ...args ], { encoding: 'utf8' } ).trim();
}

function yamlString( value ) {
	return JSON.stringify( value );
}

function routeForDestination( destination ) {
	const relative = destination.replace( /^docs\//, '' ).replace( /\.md$/i, '' );
	const route = relative.replace( /(^|\/)index$/i, '' ).replace( /\/$/, '' );
	return `/docs/${ route ? `${ route }/` : '' }`;
}

function normalizeFragment( fragment ) {
	if ( ! fragment ) {
		return '';
	}
	try {
		return decodeURIComponent( fragment ).trim().toLowerCase().replace( /\s+/g, '-' ).replace( /-+/g, '-' );
	} catch {
		return fragment.toLowerCase();
	}
}

function sourceTarget( sourcePath, rawTarget ) {
	const [ rawPath, rawFragment = '' ] = rawTarget.split( '#', 2 );
	const fragment = normalizeFragment( rawFragment );
	if ( ! rawPath ) {
		return { sourcePath, fragment, localFragment: true };
	}
	if ( rawPath.startsWith( '/docs/' ) ) {
		return { sourcePath: path.posix.normalize( rawPath.slice( 1 ) ), fragment };
	}
	if ( rawPath.startsWith( '/' ) ) {
		return { repositoryPath: path.posix.normalize( rawPath.slice( 1 ) ), fragment };
	}
	const normalized = path.posix.normalize( path.posix.join( path.posix.dirname( sourcePath ), rawPath ) );
	return normalized.startsWith( 'docs/' )
		? { sourcePath: normalized, fragment }
		: { repositoryPath: normalized.replace( /^\.\.\//, '' ), fragment };
}

function immutableRepositoryUrl( checkout, repositoryPath, fragment = '' ) {
	let type = 'blob';
	try {
		if ( git( checkout, [ 'cat-file', '-t', `${ jetpackRef }:${ repositoryPath }` ] ) === 'tree' ) {
			type = 'tree';
		}
	} catch {
		// Keep a stable blob URL for source paths that were already stale upstream.
	}
	return `https://github.com/Automattic/jetpack/${ type }/${ jetpackRef }/${ repositoryPath }${ fragment ? `#${ fragment }` : '' }`;
}

function rewriteLinks( body, sourcePath, destination, checkout ) {
	body = body.replace( /\(([^)]+)\)\[(https?:\/\/[^\]]+)\]/g, '[$1]($2)' );
	if ( sourcePath === 'docs/coding-guidelines.md' ) {
		body = body
			.replace( /\[WPDirectory\]\(https?:\/\/[^)]+\)/, '[GitHub code search](https://github.com/search?type=code)' )
			.replace( /\[this tutorial\]\(https?:\/\/[^)]+\)/, '[the WordPress PHPUnit handbook](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)' );
	}
	if ( sourcePath === 'docs/development-environment.md' ) {
		body = body.replace( /\[this tutorial\]\(https?:\/\/[^)]+\)/, '[the WordPress PHPUnit handbook](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)' );
	}
	if ( sourcePath === 'docs/automated-testing.md' ) {
		body = body.replace( /\[documentation\]\(https?:\/\/[^)]*phpunit[^)]*\)/, '[documentation](https://docs.phpunit.de/en/9.6/writing-tests-for-phpunit.html)' );
	}
	if ( sourcePath === 'docs/git-workflow.md' ) {
		body = body.replace( /\[Rebase\]\(https?:\/\/[^)]+\)/, '[Rebase](https://docs.github.com/en/get-started/using-git/about-git-rebase)' );
	}
	if ( sourcePath === 'docs/coding-guidelines.md' ) {
		body = body.replace( '[Quick Start][quick-start.md]', '[Quick Start](quick-start.md)' );
	}
	return body.replace( /(!?\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, ( full, opening, rawTarget, closing ) => {
		if (
			sourcePath === 'docs/coding-guidelines.md' &&
			rawTarget.endsWith( 'development-environment.md#use-php-codesniffer-and-eslint-to-make-sure-your-code-respects-coding-standards' )
		) {
			rawTarget = rawTarget.replace(
				'#use-php-codesniffer-and-eslint-to-make-sure-your-code-respects-coding-standards',
				'#coding-standards'
			);
		}
		if ( sourcePath === 'docs/guides/report-bugs.md' && rawTarget.endsWith( 'coding-guidelines.md#versions-supported' ) ) {
			return `${ opening }/docs/reference/compatibility-and-version-policy/${ closing }`;
		}
		if ( /^(?:https?:|mailto:|data:)/i.test( rawTarget ) ) {
			const pinned = rawTarget.replace(
				/^(https:\/\/github\.com\/Automattic\/jetpack\/(?:blob|tree)\/)trunk\//,
				`$1${ jetpackRef }/`
			);
			return `${ opening }${ pinned }${ closing }`;
		}
		const target = sourceTarget( sourcePath, rawTarget );
		if ( target.localFragment ) {
			return `${ opening }#${ target.fragment }${ closing }`;
		}
		if ( target.sourcePath && sourceToDestination.has( target.sourcePath ) ) {
			const mapped = sourceToDestination.get( target.sourcePath );
			if ( /\.md$/i.test( mapped ) ) {
				return `${ opening }${ routeForDestination( mapped ) }${ target.fragment ? `#${ target.fragment }` : '' }${ closing }`;
			}
			return `${ opening }${ immutableRepositoryUrl( checkout, target.sourcePath, target.fragment ) }${ closing }`;
		}
		const repositoryPath = target.repositoryPath || target.sourcePath;
		return `${ opening }${ immutableRepositoryUrl( checkout, repositoryPath, target.fragment ) }${ closing }`;
	} );
}

function normalizeDocsPressLinkLabels( body ) {
	const lines = body.split( '\n' );
	let inFence = false;
	return lines.map( line => {
		if ( /^\s*(```|~~~)/.test( line ) ) {
			inFence = ! inFence;
			return line;
		}
		if ( inFence ) {
			return line;
		}
		return line.replace( /\[([^\]\n]+)\]\(([^)\n]+)\)/g, ( full, label, target ) => {
			return label.includes( '`' ) ? `[${ label.replaceAll( '`', '' ) }](${ target })` : full;
		} );
	} ).join( '\n' );
}

function normalizeUnsupportedMarkdown( body, sourcePath ) {
	if ( sourcePath === 'docs/monorepo.md' ) {
		body = body.replace( /^\[\^1\]:\s*/m, '**Static-analysis evaluation note:** ' );
		body = body.replace( /\[\^1\]/g, ' (see the static-analysis evaluation note below)' );
	}
	let inFence = false;
	return body.split( '\n' ).map( line => {
		if ( /^\s*(```|~~~)/.test( line ) ) {
			inFence = ! inFence;
			return line;
		}
		return inFence ? line : line.replace( /^(\s*[-*+]\s+)\[ \]\s+/, '$1☐ ' );
	} ).join( '\n' );
}

function normalizeHeadings( source, fallbackTitle ) {
	const lines = source.replace( /\r\n/g, '\n' ).split( '\n' );
	let inFence = false;
	for ( let index = 0; index < lines.length; index++ ) {
		if ( /^\s*(```|~~~)/.test( lines[ index ] ) ) {
			inFence = ! inFence;
			continue;
		}
		if ( ! inFence ) {
			lines[ index ] = lines[ index ].replace( /^\s*[*+-]\s+(#{1,6})\s+(.+?)\s*$/, '$1 $2' );
		}
	}
	inFence = false;
	let firstTitle = '';
	let firstH1Index = -1;
	let h1Count = 0;
	for ( let index = 0; index < lines.length; index++ ) {
		const line = lines[ index ];
		if ( /^\s*(```|~~~)/.test( line ) ) {
			inFence = ! inFence;
			continue;
		}
		if ( inFence ) {
			continue;
		}
		const heading = line.match( /^\s*#\s+(.+?)\s*#*\s*$/ );
		if ( heading ) {
			h1Count++;
			if ( firstH1Index < 0 ) {
				firstH1Index = index;
				firstTitle = heading[ 1 ];
			}
		}
	}
	if ( firstH1Index >= 0 ) {
		lines.splice( firstH1Index, 1 );
	}
	if ( h1Count > 1 ) {
		inFence = false;
		for ( let index = 0; index < lines.length; index++ ) {
			if ( /^\s*(```|~~~)/.test( lines[ index ] ) ) {
				inFence = ! inFence;
				continue;
			}
			if ( ! inFence ) {
				lines[ index ] = lines[ index ].replace( /^\s*(#{1,5})(\s+)/, ( full, hashes, spacing ) => `${ hashes }#${ spacing }` );
			}
		}
	}
	return { title: firstTitle || fallbackTitle, body: lines.join( '\n' ).replace( /^\n+/, '' ) };
}

function safeBlock( name, attrs ) {
	const json = JSON.stringify( attrs )
		.replaceAll( '<', '\\u003c' )
		.replaceAll( '>', '\\u003e' )
		.replaceAll( '&', '\\u0026' )
		.replaceAll( '--', '\\u002d\\u002d' );
	return `<!-- wp:${ name } ${ json } /-->`;
}

function sourceCallout( entry ) {
	const historical = entry.status === 'historical-sanitized';
	return safeBlock( 'docspress/callout', {
		tone: historical ? 'warning' : 'note',
		title: historical ? 'Historical source, preserved safely' : 'Preserved from the Jetpack monorepo',
		content: historical
			? `<p>This page preserves the former <code>${ entry.sourcePath }</code> inventory for migration history. Sensitive-looking examples are redacted and route names are not a current compatibility contract. Use the active REST pages and verify every route at the pinned source revision.</p>`
			: `<p>This complete source guide was reorganized from <code>${ entry.sourcePath }</code> at the pinned Jetpack revision. Its original prose is retained with link and heading normalization; check current task guides and source before relying on volatile tools, versions, or service behavior.</p>`,
		collapsible: false,
		open: true,
	} );
}

function supplementalBlocks( entry ) {
	const blocks = [ sourceCallout( entry ) ];
	if ( entry.sourcePath === 'docs/CONTRIBUTING.md' ) {
		blocks.push( safeBlock( 'docspress/audience-paths', {
			eyebrow: 'Choose a contribution path',
			title: 'Start with the work you want to do',
			description: 'The focused guides add current commands and verification around this preserved source document.',
			paths: [
				{ title: 'Prepare the checkout', description: 'Set up the monorepo and a local WordPress environment.', url: '/docs/building-with-jetpack/contributing/development-environment/', cta: 'Set up development', icon: 'environment', accent: 'blue', newTab: false },
				{ title: 'Test a change', description: 'Choose the owning project and its PHP, JavaScript, type, and integration checks.', url: '/docs/building-with-jetpack/contributing/automated-testing/', cta: 'Plan tests', icon: 'testing', accent: 'green', newTab: false },
				{ title: 'Open a pull request', description: 'Follow the repository workflow, changelog, and review contract.', url: '/docs/building-with-jetpack/contributing/pull-requests/', cta: 'Prepare a PR', icon: 'code', accent: 'gold', newTab: false },
			],
			columns: 3,
			tone: 'paper',
			textAlign: 'left',
			compact: true,
			showNumbers: false,
			showIcons: true,
			showLinks: true,
		} ) );
	}
	if ( entry.sourcePath === 'docs/quick-start.md' ) {
		blocks.push( safeBlock( 'docspress/flow', {
			start: 1,
			steps: [
				{ title: 'Install', content: '<p>Clone Jetpack outside the WordPress plugins directory and install its supported toolchain.</p>' },
				{ title: 'Start WordPress', content: '<p>Use the repository Docker environment or another supported local WordPress setup.</p>' },
				{ title: 'Build and verify', content: '<p>Build the owning project, load it in WordPress, and run its relevant tests.</p>' },
			],
		} ) );
	}
	if ( entry.sourcePath === 'docs/development-environment.md' ) {
		blocks.push( safeBlock( 'docspress/terminal-session', {
			title: 'Project-scoped development loop',
			shell: 'bash',
			prompt: '$',
			command: 'jp build plugins/jetpack --deps\njp test js plugins/jetpack\njp phan plugins/jetpack',
			output: 'Run the owning project tests, then verify the built behavior in WordPress.',
		} ) );
	}
	if ( entry.sourcePath === 'docs/monorepo.md' ) {
		blocks.push( safeBlock( 'docspress/file-tree', {
			root: 'jetpack/',
			tree: 'projects/\n  plugins/\n  packages/\n  js-packages/\n  github-actions/\ntools/\ndocs/',
			caption: 'Top-level ownership boundaries in the Jetpack monorepo.',
			collapsible: true,
			open: true,
		} ) );
	}
	if ( entry.sourcePath === 'docs/rest-api.md' ) {
		blocks.push( safeBlock( 'docspress/api-request', {
			method: 'GET',
			endpoint: '/wp-json/jetpack/v4',
			headers: 'Accept: application/json\nX-WP-Nonce: <current-wp-rest-nonce>',
			requestBody: '',
			requestBodyFormat: 'json',
			responseStatus: '200 OK',
			responseBody: '{\n  "namespace": "jetpack/v4",\n  "routes": { "...": {} }\n}',
			responseBodyFormat: 'json',
			runnable: false,
			editable: false,
			allowUnsafe: false,
			baseUrl: '',
			allowedOrigins: '',
			timeout: 10000,
		} ) );
	}
	return blocks.join( '\n\n' );
}

function sanitizeHistoricalRest( body ) {
	return body
		.replace( /^X-WP-Nonce:\s*[A-Za-z0-9_-]+\s*$/gm, 'X-WP-Nonce: <redacted-wp-rest-nonce>' )
		.replace(
			/^"https:[^\n]*jetpack\.authorize[^\n]*"$/m,
			'"<redacted-authorize-url: contains a one-time secret and site/user data>"\n'
		)
		.replace(
			/(#### GET \/wp-json\/jetpack\/v4\/connection\/data[\s\S]*?\*\*Example response\*\*\s*```json\n)[\s\S]*?(\n```)/,
			'$1{\n  "currentUser": {\n    "isConnected": true,\n    "isMaster": true,\n    "username": "<redacted>",\n    "wpcomUser": "<redacted account data>",\n    "permissions": "<redacted capability map>"\n  }\n}$2'
		);
}

function frontMatter( entry, sourceHash, sourceBlob ) {
	return [
		'---',
		`title: ${ yamlString( entry.title ) }`,
		`description: ${ yamlString( entry.description ) }`,
		`audience: ${ entry.audience }`,
		`document_type: ${ entry.documentType }`,
		`sidebar_position: ${ entry.sidebarPosition }`,
		'sidebar_collapsed: true',
		`source_ref: ${ jetpackRef }`,
		`source_path: ${ yamlString( entry.sourcePath ) }`,
		`source_blob: ${ sourceBlob }`,
		`source_sha256: ${ sourceHash }`,
		`preservation_status: ${ entry.status }`,
		`last_reviewed: ${ reviewedAt }`,
		'---',
		'',
	].join( '\n' );
}

async function main() {
	const checkout = path.resolve( process.argv[ 2 ] || '' );
	if ( ! process.argv[ 2 ] ) {
		throw new Error( 'Usage: node scripts/import-jetpack-docs.mjs /path/to/jetpack-checkout' );
	}
	if ( git( checkout, [ 'rev-parse', 'HEAD' ] ) !== jetpackRef ) {
		throw new Error( `Jetpack checkout must be pinned to ${ jetpackRef }.` );
	}
	if ( git( checkout, [ 'rev-parse', 'HEAD:docs' ] ) !== jetpackDocsTree ) {
		throw new Error( `Jetpack docs tree must be ${ jetpackDocsTree }.` );
	}

	const registryFiles = [];
	for ( const entry of documents ) {
		const sourceFile = path.join( checkout, entry.sourcePath );
		const raw = await fs.readFile( sourceFile, 'utf8' );
		const sourceHash = sha256( raw );
		const sourceBlob = git( checkout, [ 'rev-parse', `${ jetpackRef }:${ entry.sourcePath }` ] );
		const normalized = normalizeHeadings( raw, entry.title );
		let body = rewriteLinks( normalized.body, entry.sourcePath, entry.destination, checkout );
		body = normalizeDocsPressLinkLabels( body );
		body = normalizeUnsupportedMarkdown( body, entry.sourcePath );
		body = body.replace( /[ \t]+$/gm, '' );
		if ( entry.status === 'historical-sanitized' ) {
			body = sanitizeHistoricalRest( body );
		}
		const preservedBody = `<!-- jetpack-docs:preserved-source:start -->\n\n${ body.trim() }\n<!-- jetpack-docs:preserved-source:end -->`;
		const output = `${ frontMatter( entry, sourceHash, sourceBlob ) }${ supplementalBlocks( entry ) }\n\n${ preservedBody }\n`;
		const destinationFile = path.join( repositoryRoot, entry.destination );
		await fs.mkdir( path.dirname( destinationFile ), { recursive: true } );
		await fs.writeFile( destinationFile, output );
		registryFiles.push( {
			source_path: entry.sourcePath,
			source_blob: sourceBlob,
			source_sha256: sourceHash,
			source_bytes: Buffer.byteLength( raw ),
			mode: entry.status,
			destinations: [ entry.destination.replace( /^docs\//, '' ) ],
			preserved_body_sha256: sha256( body.trim() ),
		} );
	}

	for ( const entry of assets ) {
		const sourceFile = path.join( checkout, entry.sourcePath );
		const raw = await fs.readFile( sourceFile );
		const destinationFile = path.join( repositoryRoot, entry.destination );
		await fs.mkdir( path.dirname( destinationFile ), { recursive: true } );
		await fs.copyFile( sourceFile, destinationFile );
		registryFiles.push( {
			source_path: entry.sourcePath,
			source_blob: git( checkout, [ 'rev-parse', `${ jetpackRef }:${ entry.sourcePath }` ] ),
			source_sha256: sha256( raw ),
			source_bytes: raw.byteLength,
			mode: entry.status,
			destinations: [ entry.destination.replace( /^docs\//, '' ) ],
		} );
	}

	registryFiles.sort( ( left, right ) => left.source_path.localeCompare( right.source_path ) );
	const registry = {
		version: 1,
		reviewed_at: reviewedAt,
		upstream: {
			repository: 'Automattic/jetpack',
			ref: jetpackRef,
			docs_tree: jetpackDocsTree,
		},
		files: registryFiles,
	};
	await fs.writeFile( path.join( repositoryRoot, 'docs/source-preservation.json' ), `${ JSON.stringify( registry, null, 2 ) }\n` );
	console.log( `Imported ${ documents.length } source documents and ${ assets.length } supporting artifacts from ${ jetpackRef }.` );
}

main().catch( error => {
	console.error( error.stack || error.message );
	process.exit( 1 );
} );
