#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { parse as parseBlocks } from '@wordpress/block-serialization-default-parser';
import { validateBlueprint } from '@wp-playground/blueprints';
import { CUSTOM_BLOCK_DEFAULTS } from 'docspress/src/block-markdown.js';
import { collectDesiredPages } from 'docspress/src/docs.js';
import { readSidebarsRegistry } from 'docspress/src/sidebars.js';
import { parseDocument } from 'yaml';

const scriptDirectory = path.dirname( fileURLToPath( import.meta.url ) );
const repositoryRoot = path.resolve( scriptDirectory, '..' );
const docsRoot = path.join( repositoryRoot, 'docs' );
const errors = [];

const requiredFields = [
	'title',
	'description',
	'audience',
	'document_type',
	'sidebar_position',
	'sidebar_collapsed',
];
const allowedAudiences = new Set( [ 'site-user', 'agent-user', 'developer', 'contributor' ] );
const allowedDocumentTypes = new Set( [
	'overview',
	'tutorial',
	'how-to',
	'reference',
	'troubleshooting',
] );
const expectedProducts = [
	'jetpack',
	'forms',
	'ai',
	'crm',
	'social',
	'stats',
	'boost',
	'search',
	'videopress',
	'akismet',
	'backup',
	'protect',
	'scan',
];
const lifecycleFiles = [
	'index.md',
	'use-and-configure.md',
	'extend-hooks-and-apis.md',
	'develop-and-test.md',
	'troubleshoot-and-support.md',
];
const jetpackSourceRef = 'a6e65435e2531e430c75024f1183612f31263d1f';
const jetpackLogoSha256 = 'b0b13407f513b3ff48c43c894e4bea550dc4e98dfb59c4f43f28d21c98b42962';
const jetpackCrmSourceRef = '8dbe017c517819a7f6c583dff6e4cb8819a7f72e';
const akismetSourceRevision = 3514187;
const docsPressSourceRef = '517050b6aceb09cacd7dc66c0df2023718e57bd9';
const sidebarsFile = 'docs/sidebars.json';
const expectedSidebars = {
	default: 'use',
	sidebars: {
		use: '.',
		agents: 'using-an-agent',
		build: 'building-with-jetpack',
		products: 'products',
		reference: 'reference',
	},
};
const allowedCustomBlocks = new Set(
	Object.keys( CUSTOM_BLOCK_DEFAULTS ).filter( name => ! [ 'docspress/version-notice', 'docspress/version-switcher' ].includes( name ) )
);
const allowedAudienceIcons = new Set( [
	'api', 'arrow-right', 'arrow-up-right', 'agency', 'branch', 'bug', 'cloud', 'code', 'compass', 'contribute',
	'document', 'environment', 'globe', 'growth', 'help', 'operations', 'ownership', 'performance', 'plan', 'plug',
	'products', 'repository', 'rocket', 'security', 'settings', 'site', 'sparkles', 'steps', 'sync', 'terminal',
	'testing', 'troubleshoot', 'ui',
] );
const expectedPreservedSources = [
	'docs/CONTRIBUTING.md',
	'docs/automated-testing.md',
	'docs/code-reviews.md',
	'docs/coding-guidelines.md',
	'docs/deprecating-features.md',
	'docs/development-environment.md',
	'docs/examples/bootstrap.php',
	'docs/examples/unison-sample.prf',
	'docs/git-workflow.md',
	'docs/guides/report-bugs.md',
	'docs/monorepo.md',
	'docs/partners/README.md',
	'docs/pull-request.md',
	'docs/quick-start.md',
	'docs/release-management.md',
	'docs/rest-api.md',
	'docs/testing/beta-testing.md',
	'docs/testing/regression-checklist/README.md',
	'docs/testing/regression-checklist/mapping.json',
	'docs/testing/regression-checklist/regression-checklist.md',
	'docs/testing/regression-checklist/test-suites/extensions/all.md',
	'docs/testing/regression-checklist/test-suites/extensions/blocks/contact-form.md',
	'docs/testing/regression-checklist/test-suites/extensions/blocks/memberships.md',
	'docs/testing/regression-checklist/test-suites/modules/publicize.md',
	'docs/testing/regression-checklist/test-suites/modules/stats.md',
	'docs/testing/regression-checklist/test-suites/packages/connection.md',
	'docs/testing/regression-checklist/test-suites/packages/sync.md',
	'docs/testing/testing-tips.md',
	'docs/translations.md',
	'docs/unison-wordpress-com.md',
	'docs/writing-a-good-changelog-entry.md',
].sort();

function fail( message ) {
	errors.push( message );
}

async function walk( directory ) {
	const files = [];
	for ( const entry of await fs.readdir( directory, { withFileTypes: true } ) ) {
		const absolute = path.join( directory, entry.name );
		if ( entry.isDirectory() ) {
			files.push( ...( await walk( absolute ) ) );
		} else {
			files.push( absolute );
		}
	}
	return files;
}

function relative( filename ) {
	return path.relative( repositoryRoot, filename ).split( path.sep ).join( '/' );
}

function parseFrontMatter( content, filename ) {
	const match = content.match( /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/ );
	if ( ! match ) {
		fail( `${ relative( filename ) }: missing front matter` );
		return { data: {}, body: content };
	}


	const document = parseDocument( match[ 1 ], { strict: true, uniqueKeys: true } );
	for ( const error of [ ...document.errors, ...document.warnings ] ) {
		fail( `${ relative( filename ) }: invalid front matter: ${ error.message.split( '\n' )[ 0 ] }` );
	}
	let data = {};
	if ( document.errors.length === 0 ) {
		const parsed = document.toJS( { maxAliasCount: 0 } );
		if ( ! parsed || typeof parsed !== 'object' || Array.isArray( parsed ) ) {
			fail( `${ relative( filename ) }: front matter must be a YAML mapping` );
		} else {
			data = parsed;
		}
	}

	return { data, body: content.slice( match[ 0 ].length ) };
}

function routeForFile( filename ) {
	const source = path.relative( docsRoot, filename ).split( path.sep ).join( '/' );
	const withoutExtension = source.replace( /\.md$/i, '' );
	const segments = withoutExtension.split( '/' );
	if ( segments.at( -1 ).toLowerCase() === 'index' ) {
		segments.pop();
	}
	return `/docs/${ segments.length ? `${ segments.join( '/' ) }/` : '' }`;
}

function withoutFencedCode( body ) {
	let fence = null;
	return body
		.split( /\r?\n/ )
		.map( line => {
			const marker = line.match( /^\s*(`{3,}|~{3,})/ )?.[ 1 ];
			if ( marker && ! fence ) {
				fence = marker;
				return '';
			}
			if ( marker && fence && marker[ 0 ] === fence[ 0 ] && marker.length >= fence.length ) {
				fence = null;
				return '';
			}
			return fence ? '' : line;
		} )
		.join( '\n' );
}

function anchorsFor( body ) {
	const anchors = new Set();
	for ( const match of withoutFencedCode( body ).matchAll( /^#{1,6}\s+(.+?)\s*#*\s*$/gm ) ) {
		anchors.add(
			match[ 1 ]
				.toLowerCase()
				.replace( /[`*_~[\]()]/g, '' )
				.replace( /[^\p{Letter}\p{Number}\s-]/gu, '' )
				.trim()
				.replace( /\s+/g, '-' )
				.replace( /-+/g, '-' )
		);
	}
	for ( const match of body.matchAll( /"(?:anchor|id)":"([a-zA-Z0-9_-]+)"/g ) ) {
		anchors.add( match[ 1 ] );
	}
	return anchors;
}

function normalizeRoute( value ) {
	const clean = value.split( /[?#]/ )[ 0 ];
	return clean.endsWith( '/' ) ? clean : `${ clean }/`;
}

function sha256( value ) {
	return createHash( 'sha256' ).update( value ).digest( 'hex' );
}

function flattenBlocks( blocks ) {
	const flattened = [];
	for ( const block of blocks ) {
		if ( block.blockName ) {
			flattened.push( block );
		}
		flattened.push( ...flattenBlocks( block.innerBlocks || [] ) );
	}
	return flattened;
}

function requireBlockString( name, attributes, field, filename ) {
	if ( typeof attributes[ field ] !== 'string' || ! attributes[ field ].trim() ) {
		fail( `${ relative( filename ) }: ${ name } requires a non-empty ${ field } attribute` );
	}
}

function validateBlockUrls( value, filename, trail = 'attributes' ) {
	if ( typeof value === 'string' ) {
		if ( /^\s*(?:javascript|vbscript):/i.test( value ) ) {
			fail( `${ relative( filename ) }: unsafe URL-like value in block ${ trail }` );
		}
		validatePublicWordPressUrls( value, filename );
		return;
	}
	if ( Array.isArray( value ) ) {
		value.forEach( ( child, index ) => validateBlockUrls( child, filename, `${ trail }[${ index }]` ) );
		return;
	}
	if ( value && typeof value === 'object' ) {
		for ( const [ key, child ] of Object.entries( value ) ) {
			validateBlockUrls( child, filename, `${ trail }.${ key }` );
		}
	}
}

function validateCustomBlock( block, filename ) {
	const name = block.blockName;
	const attributes = block.attrs || {};
	if ( ! allowedCustomBlocks.has( name ) ) {
		fail( `${ relative( filename ) }: unsupported or inapplicable DocsPress block ${ name }` );
		return;
	}
	if ( ! attributes || typeof attributes !== 'object' || Array.isArray( attributes ) ) {
		fail( `${ relative( filename ) }: ${ name } attributes must be an object` );
		return;
	}
	validateBlockUrls( attributes, filename );

	switch ( name ) {
		case 'docspress/api-request':
			requireBlockString( name, attributes, 'method', filename );
			requireBlockString( name, attributes, 'endpoint', filename );
			if ( attributes.runnable === true || attributes.allowUnsafe === true ) {
				fail( `${ relative( filename ) }: documentation API examples must remain non-runnable and must not allow unsafe requests` );
			}
			break;
		case 'docspress/audience-paths':
			if ( ! Array.isArray( attributes.paths ) || attributes.paths.length < 2 || attributes.paths.length > 4 ) {
				fail( `${ relative( filename ) }: ${ name } requires two to four paths` );
			} else {
				for ( const [ index, entry ] of attributes.paths.entries() ) {
					for ( const field of [ 'title', 'description', 'url', 'cta' ] ) {
						if ( typeof entry?.[ field ] !== 'string' || ! entry[ field ].trim() ) {
							fail( `${ relative( filename ) }: ${ name} path ${ index + 1 } requires ${ field }` );
						}
					}
					if ( entry.icon && ! allowedAudienceIcons.has( entry.icon ) ) {
						fail( `${ relative( filename ) }: ${ name } path ${ index + 1 } uses unsupported icon ${ entry.icon }` );
					}
				}
			}
			break;
		case 'docspress/callout':
			requireBlockString( name, attributes, 'content', filename );
			if ( ! [ 'note', 'tip', 'success', 'warning', 'danger', 'error', 'important' ].includes( attributes.tone ) ) {
				fail( `${ relative( filename ) }: ${ name } has invalid tone ${ attributes.tone }` );
			}
			break;
		case 'docspress/code-tabs':
			if ( ! Array.isArray( attributes.tabs ) || attributes.tabs.length < 2 || attributes.tabs.some( tab => ! tab?.label || ! tab?.code ) ) {
				fail( `${ relative( filename ) }: ${ name } requires at least two labeled code examples` );
			}
			break;
		case 'docspress/code-playground':
			if ( ! [ attributes.html, attributes.css, attributes.javascript ].some( value => typeof value === 'string' && value.trim() ) ) {
				fail( `${ relative( filename ) }: ${ name } requires HTML, CSS, or JavaScript` );
			}
			if ( attributes.allowNetwork !== false ) {
				fail( `${ relative( filename ) }: ${ name } must disable network access` );
			}
			break;
		case 'docspress/colorful-code':
			requireBlockString( name, attributes, 'code', filename );
			requireBlockString( name, attributes, 'language', filename );
			break;
		case 'docspress/diagram':
			requireBlockString( name, attributes, 'source', filename );
			break;
		case 'docspress/fields':
			if ( ! Array.isArray( attributes.fields ) || attributes.fields.length === 0 || attributes.fields.some( field => ! field?.name || ! field?.type || ! field?.description ) ) {
				fail( `${ relative( filename ) }: ${ name } requires typed, described fields` );
			}
			break;
		case 'docspress/file-tree':
			requireBlockString( name, attributes, 'root', filename );
			requireBlockString( name, attributes, 'tree', filename );
			break;
		case 'docspress/flow':
			if ( ! Array.isArray( attributes.steps ) || attributes.steps.length < 2 || attributes.steps.some( step => ! step?.title || ! step?.content ) ) {
				fail( `${ relative( filename ) }: ${ name } requires at least two titled steps` );
			}
			break;
		case 'docspress/hero':
			requireBlockString( name, attributes, 'description', filename );
			if ( attributes.title !== '' ) {
				fail( `${ relative( filename ) }: ${ name } title must stay empty because the Page title supplies the H1` );
			}
			break;
		case 'docspress/prompt':
			requireBlockString( name, attributes, 'prompt', filename );
			if ( ! [ 'chat', 'code', 'ask', 'plan' ].includes( attributes.mode ) ) {
				fail( `${ relative( filename ) }: ${ name } mode must be chat, code, ask, or plan` );
			}
			break;
		case 'docspress/result':
			requireBlockString( name, attributes, 'title', filename );
			requireBlockString( name, attributes, 'content', filename );
			if ( ! [ 'success', 'warning', 'error', 'danger', 'neutral' ].includes( attributes.status ) ) {
				fail( `${ relative( filename ) }: ${ name } has invalid status ${ attributes.status }` );
			}
			break;
		case 'docspress/terminal-session':
			requireBlockString( name, attributes, 'command', filename );
			break;
		case 'docspress/troubleshooter': {
			const questionIds = new Set( ( attributes.questions || [] ).map( question => question.id ) );
			const outcomeIds = new Set( ( attributes.outcomes || [] ).map( outcome => outcome.id ) );
			if ( ! questionIds.has( attributes.startId ) || outcomeIds.size === 0 ) {
				fail( `${ relative( filename ) }: ${ name } needs a valid start question and at least one outcome` );
			}
			for ( const question of attributes.questions || [] ) {
				for ( const next of [ question.yesNext, question.noNext ] ) {
					if ( ! questionIds.has( next ) && ! outcomeIds.has( next ) ) {
						fail( `${ relative( filename ) }: ${ name } question ${ question.id } points to missing node ${ next }` );
					}
				}
			}
			break;
		}
	}
}

function validatePublicWordPressUrls( content, filename ) {
	const publicWordPressHosts = new Set( [
		'wordpress.com',
		'www.wordpress.com',
		'developer.wordpress.com',
		'support.wordpress.com',
		'en.support.wordpress.com',
		'translate.wordpress.com',
	] );
	for ( const urlMatch of content.matchAll( /https?:\/\/[^\s<>"')]+/gi ) ) {
		try {
			const hostname = new URL( urlMatch[ 0 ] ).hostname.toLowerCase();
			if ( hostname.endsWith( '.wordpress.com' ) && ! publicWordPressHosts.has( hostname ) ) {
				fail( `${ relative( filename ) }: private-looking WordPress.com subdomain ${ hostname } is forbidden` );
			}
		} catch {
			// Link validation reports malformed local destinations separately.
		}
	}
}

function validatePublicRepositoryHygiene( content, filename ) {
	if ( /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/.test( content ) ) {
		fail( `${ relative( filename ) }: private key material is forbidden` );
	}
	if ( /\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/.test( content ) ) {
		fail( `${ relative( filename ) }: credential-shaped token is forbidden` );
	}
	for ( const match of content.matchAll( /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi ) ) {
		if ( ! [ 'git@github.com', 'username@remote-host.com' ].includes( match[ 0 ].toLowerCase() ) ) {
			fail( `${ relative( filename ) }: real-looking email address is forbidden; use a role URL or an obvious placeholder` );
		}
	}
}

const allFiles = await walk( docsRoot );
const knownFiles = new Set( allFiles );
const markdownFiles = allFiles.filter( filename => /\.md$/i.test( filename ) ).sort();
const authoringScripts = await walk( path.join( repositoryRoot, 'scripts' ) );
const authoredTextFiles = new Set( [
	...allFiles,
	...authoringScripts,
	path.join( repositoryRoot, '.gitignore' ),
	path.join( repositoryRoot, 'LICENSE.txt' ),
	path.join( repositoryRoot, 'README.md' ),
	path.join( repositoryRoot, 'package.json' ),
	path.join( repositoryRoot, 'package-lock.json' ),
	path.join( repositoryRoot, 'playground', 'blueprint.json' ),
	path.join( repositoryRoot, 'playground', 'local-blueprint.json' ),
	path.join( repositoryRoot, 'playground', 'configure-jetpack-site.php' ),
	path.join( repositoryRoot, '.github', 'workflows', 'validate-docs.yml' ),
] );
for ( const filename of authoredTextFiles ) {
	const content = await fs.readFile( filename, 'utf8' );
	validatePublicWordPressUrls( content, filename );
	validatePublicRepositoryHygiene( content, filename );
	if ( /[ \t]+$/m.test( content ) ) {
		fail( `${ relative( filename ) }: trailing whitespace is not allowed` );
	}
	if ( /jetpack-developer-docs(?:-site|\/)|\/developer-docs\//i.test( content ) ) {
		fail( `${ relative( filename ) }: references to the retired custom DocsPress experiment are forbidden` );
	}
}
for ( const forbidden of [
	'docs/manifest.json',
	'docs/sidebars.yml',
	'docs/redirects.json',
	'docs/versions.json',
	'theme',
	'plugin',
	'plugins',
] ) {
	try {
		await fs.access( path.join( repositoryRoot, forbidden ) );
		fail( `${ forbidden }: custom registries, themes, and site plugins are outside this repository's scope` );
	} catch ( error ) {
		if ( error.code !== 'ENOENT' ) {
			throw error;
		}
	}
}
const readmes = markdownFiles.filter( filename => path.basename( filename ).toLowerCase() === 'readme.md' );
for ( const filename of readmes ) {
	fail( `${ relative( filename ) }: README.md is not allowed inside docs; use index.md` );
}

const routes = new Map();
const parsedPages = new Map();
const blocksByFile = new Map();
for ( const filename of markdownFiles ) {
	const content = await fs.readFile( filename, 'utf8' );
	const parsed = parseFrontMatter( content, filename );
	parsedPages.set( filename, { ...parsed, content } );

	for ( const field of requiredFields ) {
		if ( parsed.data[ field ] === undefined || parsed.data[ field ] === '' ) {
			fail( `${ relative( filename ) }: missing front-matter field ${ field }` );
		}
	}
	for ( const field of [ 'title', 'description' ] ) {
		if ( typeof parsed.data[ field ] !== 'string' || ! parsed.data[ field ].trim() ) {
			fail( `${ relative( filename ) }: ${ field } must be a non-empty string` );
		}
	}
	if ( ! allowedAudiences.has( parsed.data.audience ) ) {
		fail( `${ relative( filename ) }: invalid audience ${ parsed.data.audience }` );
	}
	if ( ! allowedDocumentTypes.has( parsed.data.document_type ) ) {
		fail( `${ relative( filename ) }: invalid document_type ${ parsed.data.document_type }` );
	}
	if ( ! Number.isInteger( parsed.data.sidebar_position ) ) {
		fail( `${ relative( filename ) }: sidebar_position must be an integer` );
	}
	if ( typeof parsed.data.sidebar_collapsed !== 'boolean' ) {
		fail( `${ relative( filename ) }: sidebar_collapsed must be true or false` );
	}
		if ( /^#\s+/m.test( withoutFencedCode( parsed.body ) ) ) {
			fail( `${ relative( filename ) }: body-level H1 is not allowed; DocsPress renders the front-matter title` );
		}
		if ( /\[[^\]\n]*`[^`\n]+`[^\]\n]*\]\(/.test( withoutFencedCode( parsed.body ) ) ) {
			fail( `${ relative( filename ) }: inline code inside a Markdown link label leaks placeholder tokens in the pinned DocsPress converter; use a plain-text link label` );
		}
		if ( /\[[^\]\n]+\]\[[^\]\n]+\]/.test( withoutFencedCode( parsed.body ) ) ) {
			fail( `${ relative( filename ) }: reference-style Markdown links are not supported by the pinned DocsPress converter; use an inline link` );
		}
		if ( /\[\^[^\]\n]+\]/.test( withoutFencedCode( parsed.body ) ) ) {
			fail( `${ relative( filename ) }: Markdown footnotes are not supported by the pinned Playground importer; use ordinary prose` );
		}
		if ( /^\s*[-*+]\s+\[[ xX]\]\s+/m.test( withoutFencedCode( parsed.body ) ) ) {
			fail( `${ relative( filename ) }: GFM task lists are not supported by the pinned Playground importer; use readable checklist text` );
		}
		if ( /<!-- jetpack-docs:[^>\n]+:(?:start|end) -->\r?\n(?!\r?\n|$)/.test( parsed.body ) ) {
			fail( `${ relative( filename ) }: generator and preservation markers need a blank line after them for the pinned Playground importer` );
		}
	if ( parsed.data.source_ref !== undefined && ! /^[0-9a-f]{40}$/.test( String( parsed.data.source_ref ) ) ) {
		fail( `${ relative( filename ) }: source_ref must be a full 40-character commit SHA` );
	}
	if ( parsed.data.last_reviewed !== undefined && ! /^\d{4}-\d{2}-\d{2}$/.test( String( parsed.data.last_reviewed ) ) ) {
		fail( `${ relative( filename ) }: last_reviewed must use YYYY-MM-DD` );
	}

	const route = routeForFile( filename );
	if ( routes.has( route ) ) {
		fail( `${ relative( filename ) }: duplicate route ${ route } also used by ${ relative( routes.get( route ) ) }` );
	} else {
		routes.set( route, filename );
	}

	if ( /<!--\s*\/?docspress:block(?:\s|-->)/.test( parsed.body ) ) {
		fail( `${ relative( filename ) }: readable DocsPress block envelopes are not supported by the pinned Playground importer; use one-line serialized blocks` );
	}
	const customBlockLines = parsed.body
		.split( /\r?\n/ )
		.filter( line => line.includes( '<!-- wp:docspress/' ) );
	for ( const line of customBlockLines ) {
		if ( ! /^<!-- wp:docspress\/[a-z0-9-]+(?: \{.*\})? \/-->$/.test( line.trim() ) ) {
			fail( `${ relative( filename ) }: every DocsPress block must be a one-line self-closing serialized block` );
		}
	}
	if ( /<!--\s*\/wp:docspress\//.test( parsed.body ) ) {
		fail( `${ relative( filename ) }: DocsPress blocks must be self-closing` );
	}
	for ( const opening of parsed.body.matchAll( /<!--\s+wp:([^\s>{}]+)/g ) ) {
		const name = opening[ 1 ];
		if ( name.includes( '/' ) && ! name.startsWith( 'docspress/' ) && ! name.startsWith( 'core/' ) ) {
			fail( `${ relative( filename ) }: unsupported Gutenberg block ${ name }` );
		}
	}
	try {
		const namedBlocks = flattenBlocks( parseBlocks( parsed.body ) );
		const customBlocks = namedBlocks.filter( block => block.blockName?.startsWith( 'docspress/' ) );
		if ( customBlocks.length !== customBlockLines.length ) {
			fail( `${ relative( filename ) }: serialized DocsPress blocks could not all be parsed` );
		}
		for ( const block of namedBlocks ) {
			if ( block.blockName.startsWith( 'docspress/' ) ) {
				validateCustomBlock( block, filename );
			} else if ( ! block.blockName.startsWith( 'core/' ) ) {
				fail( `${ relative( filename ) }: unsupported Gutenberg block ${ block.blockName }` );
			}
		}
		blocksByFile.set( filename, new Set( customBlocks.map( block => block.blockName ) ) );
	} catch ( error ) {
		fail( `${ relative( filename ) }: block parser failed: ${ error.message }` );
		blocksByFile.set( filename, new Set() );
	}
}

const usedCustomBlocks = new Set( [ ...blocksByFile.values() ].flatMap( blocks => [ ...blocks ] ) );
for ( const blockName of allowedCustomBlocks ) {
	if ( ! usedCustomBlocks.has( blockName ) ) {
		fail( `docs/: the supported ${ blockName } block must have at least one semantic use` );
	}
}

function requirePageBlock( relativeFilename, blockName ) {
	const filename = path.join( repositoryRoot, relativeFilename );
	if ( ! blocksByFile.get( filename )?.has( blockName ) ) {
		fail( `${ relativeFilename }: required semantic block ${ blockName } is missing` );
	}
}

for ( const blockName of [ 'docspress/hero', 'docspress/audience-paths', 'docspress/prompt' ] ) {
	requirePageBlock( 'docs/index.md', blockName );
}
for ( const promptPage of [
	'build-integration.md',
	'configure-product.md',
	'prepare-contribution.md',
	'troubleshoot-site.md',
	'use-hook-safely.md',
] ) {
	requirePageBlock( `docs/using-an-agent/prompts/${ promptPage }`, 'docspress/prompt' );
}
for ( const product of expectedProducts ) {
	requirePageBlock( `docs/products/${ product }/index.md`, 'docspress/audience-paths' );
	requirePageBlock( `docs/products/${ product }/use-and-configure.md`, 'docspress/flow' );
	requirePageBlock( `docs/products/${ product }/extend-hooks-and-apis.md`, 'docspress/fields' );
	requirePageBlock( `docs/products/${ product }/develop-and-test.md`, 'docspress/file-tree' );
	requirePageBlock( `docs/products/${ product }/develop-and-test.md`, 'docspress/terminal-session' );
	requirePageBlock( `docs/products/${ product }/troubleshoot-and-support.md`, 'docspress/troubleshooter' );
	requirePageBlock( `docs/products/${ product }/troubleshoot-and-support.md`, 'docspress/result' );
}

for ( const [ filename, page ] of parsedPages ) {
	const anchors = anchorsFor( page.body );
	const linkableBody = withoutFencedCode( page.body );
	const targets = [
		...linkableBody.matchAll( /!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g ),
	].map( match => match[ 1 ] );
	for ( const match of linkableBody.matchAll( /"(?:url|primaryUrl|secondaryUrl)":"(\/docs\/[^"]*)"/g ) ) {
		targets.push( match[ 1 ] );
	}

	for ( const target of targets ) {
		if ( /^(?:https?:|mailto:|data:)/i.test( target ) ) {
			continue;
		}
		if ( target.startsWith( '#' ) ) {
			if ( ! anchors.has( target.slice( 1 ) ) ) {
				fail( `${ relative( filename ) }: missing local anchor ${ target }` );
			}
			continue;
		}

		const [ pathPart, fragment = '' ] = target.split( '#', 2 );
		let destination;
		if ( pathPart.startsWith( '/docs/' ) ) {
			destination = routes.get( normalizeRoute( pathPart ) );
		} else {
			const absolute = path.resolve( path.dirname( filename ), decodeURIComponent( pathPart ) );
			const candidates = [ absolute, `${ absolute }.md`, path.join( absolute, 'index.md' ) ];
			for ( const candidate of candidates ) {
				if ( knownFiles.has( candidate ) ) {
					destination = candidate;
					break;
				}
			}
		}
		if ( ! destination ) {
			fail( `${ relative( filename ) }: unresolved local link ${ target }` );
			continue;
		}
		if ( ! parsedPages.has( destination ) ) {
			fail( `${ relative( filename ) }: local link ${ target } targets a file that DocsPress does not publish as a Page; use a public source URL` );
			continue;
		}
		if ( fragment && parsedPages.has( destination ) && ! anchorsFor( parsedPages.get( destination ).body ).has( fragment ) ) {
			fail( `${ relative( filename ) }: unresolved anchor #${ fragment } in ${ relative( destination ) }` );
		}
	}
}

const catalogPath = path.join( docsRoot, 'products', 'catalog.json' );
const catalogContent = await fs.readFile( catalogPath, 'utf8' );
validatePublicWordPressUrls( catalogContent, catalogPath );
const catalog = JSON.parse( catalogContent );
if ( catalog.version !== 1 || ! /^\d{4}-\d{2}-\d{2}$/.test( catalog.reviewed_at || '' ) ) {
	fail( 'docs/products/catalog.json: version must be 1 and reviewed_at must use YYYY-MM-DD' );
}
const catalogIds = ( catalog.products || [] ).map( product => product.id );
if ( JSON.stringify( catalogIds ) !== JSON.stringify( expectedProducts ) ) {
	fail( `docs/products/catalog.json: expected products in order ${ expectedProducts.join( ', ' ) }` );
}
for ( const product of catalog.products || [] ) {
	if ( typeof product.label !== 'string' || ! product.label.trim() ) {
		fail( `docs/products/catalog.json: label required for ${ product.id }` );
	}
	if ( ! [ 'platform-and-creation', 'growth', 'performance-and-media', 'security' ].includes( product.category ) ) {
		fail( `docs/products/catalog.json: invalid category for ${ product.id }` );
	}
	if (
		! [ 'jetpack-monorepo', 'external', 'external-public-repository', 'wordpress-org-svn' ].includes( product.ownership?.type ) ||
		typeof product.ownership?.repository !== 'string'
	) {
		fail( `docs/products/catalog.json: invalid ownership for ${ product.id }` );
	}
	if (
		! Array.isArray( product.canonical_sources ) ||
		product.canonical_sources.length === 0 ||
		product.canonical_sources.some( source => typeof source.label !== 'string' || ! /^https:\/\//.test( source.url || '' ) )
	) {
		fail( `docs/products/catalog.json: canonical_sources required for ${ product.id }` );
	}
	if ( ! Array.isArray( product.source_paths ) ) {
		fail( `docs/products/catalog.json: source_paths must be an array for ${ product.id }` );
	}
	for ( const lifecycle of lifecycleFiles ) {
		const filename = path.join( docsRoot, 'products', product.id, lifecycle );
		if ( ! parsedPages.has( filename ) ) {
			fail( `${ relative( filename ) }: missing product lifecycle page` );
		} else if ( parsedPages.get( filename ).data.product !== product.id ) {
			fail( `${ relative( filename ) }: product front matter must be ${ product.id }` );
		}
	}
}

const sourceAuditPath = path.join( docsRoot, 'products', 'source-audit.json' );
const sourceAudit = JSON.parse( await fs.readFile( sourceAuditPath, 'utf8' ) );
if (
	sourceAudit.version !== 1 ||
	sourceAudit.reviewed_at !== '2026-08-05' ||
	sourceAudit.repository !== 'Automattic/jetpack' ||
	sourceAudit.ref !== jetpackSourceRef
) {
	fail( 'docs/products/source-audit.json: repository, source revision, version, and review date must remain pinned' );
}
if ( JSON.stringify( ( sourceAudit.products || [] ).map( product => product.id ) ) !== JSON.stringify( expectedProducts ) ) {
	fail( 'docs/products/source-audit.json: every catalog product must have a source audit entry in catalog order' );
}
for ( const auditedProduct of sourceAudit.products || [] ) {
	const catalogProduct = ( catalog.products || [] ).find( product => product.id === auditedProduct.id );
	const auditedPaths = ( auditedProduct.source_paths || [] ).map( entry => entry.path );
	if ( JSON.stringify( auditedPaths ) !== JSON.stringify( catalogProduct?.source_paths || [] ) ) {
		fail( `docs/products/source-audit.json: ${ auditedProduct.id } paths must match catalog.json` );
	}
	for ( const sourcePath of auditedProduct.source_paths || [] ) {
		if ( ! [ 'tree', 'blob' ].includes( sourcePath.type ) || ! /^[0-9a-f]{40}$/.test( sourcePath.object || '' ) ) {
			fail( `docs/products/source-audit.json: ${ auditedProduct.id } source ${ sourcePath.path } needs a pinned Git object` );
		}
	}
	if ( catalogProduct?.ownership?.type === 'external' && ! Array.isArray( auditedProduct.external_sources ) ) {
		fail( `docs/products/source-audit.json: external product ${ auditedProduct.id } needs pinned external source revisions` );
	}
}

const hookDetailFiles = markdownFiles.filter( filename => {
	const parent = path.basename( path.dirname( filename ) );
	return [ 'actions', 'filters' ].includes( parent ) && path.basename( filename ) !== 'index.md';
} );
const requiredHookDetails = [
	'actions/did-jetpack-search-query.md',
	'actions/grunion-after-feedback-post-inserted.md',
	'actions/jetpack-ai-assistant-generation-complete.md',
	'actions/jetpack-backup-initialized.md',
	'actions/jetpack-boost-clear-page-cache-url.md',
	'actions/jetpack-loaded.md',
	'actions/videopress-init.md',
	'filters/akismet-request-args.md',
	'filters/grunion-contact-form-redirect-url.md',
	'filters/jetpack-account-protection-user-requires-protection.md',
	'filters/jetpack-ai-enabled.md',
	'filters/jetpack-ai-image-generation-handler.md',
	'filters/jetpack-boost-cache-bypass-patterns.md',
	'filters/jetpack-boost-critical-css-urls.md',
	'filters/jetpack-boost-render-blocking-js-exclude-handles.md',
	'filters/jetpack-contact-form-forget-ip-address.md',
	'filters/jetpack-crm-company-vital-tabs.md',
	'filters/jetpack-crm-contact-vital-tabs.md',
	'filters/jetpack-instant-search-options.md',
	'filters/jetpack-offline-mode.md',
	'filters/jetpack-protect-can-send-recovery-emails.md',
	'filters/jetpack-publicize-capability.md',
	'filters/jetpack-search-es-wp-query-args.md',
	'filters/jetpack-search-should-handle-query.md',
	'filters/jetpack-stats-excluded-ips.md',
	'filters/publicize-should-publicize-published-post.md',
	'filters/stats-array.md',
	'filters/videopress-get-video-details.md',
	'filters/videopress-is-current-user-authed-for-video.md',
];
const actualHookDetails = hookDetailFiles
	.map( filename => path.relative( path.join( docsRoot, 'reference', 'hooks' ), filename ).replaceAll( path.sep, '/' ) )
	.sort();
if ( JSON.stringify( actualHookDetails ) !== JSON.stringify( [ ...requiredHookDetails ].sort() ) ) {
	fail( 'docs/reference/hooks/: curated hook files must match the reviewed 29-page catalog' );
}
for ( const hookFile of requiredHookDetails ) {
	const filename = path.join( docsRoot, 'reference', 'hooks', hookFile );
	if ( ! parsedPages.has( filename ) ) {
		fail( `${ relative( filename ) }: required curated hook detail page is missing` );
	}
}
const actionIndexBody = parsedPages.get( path.join( docsRoot, 'reference', 'hooks', 'actions', 'index.md' ) )?.body || '';
const filterIndexBody = parsedPages.get( path.join( docsRoot, 'reference', 'hooks', 'filters', 'index.md' ) )?.body || '';
const productHookIndexBody = parsedPages.get( path.join( docsRoot, 'reference', 'hooks', 'browse-hooks-by-product.md' ) )?.body || '';
for ( const hookFile of requiredHookDetails ) {
	const [ type, basename ] = hookFile.split( '/' );
	const typeIndexBody = type === 'actions' ? actionIndexBody : filterIndexBody;
	if ( ! typeIndexBody.includes( `(${ basename })` ) ) {
		fail( `docs/reference/hooks/${ type }/index.md: missing curated link to ${ basename }` );
	}
	if ( ! productHookIndexBody.includes( `(${ hookFile })` ) ) {
		fail( `docs/reference/hooks/browse-hooks-by-product.md: missing curated link to ${ hookFile }` );
	}
}
if ( ! hookDetailFiles.some( filename => path.basename( path.dirname( filename ) ) === 'actions' ) ) {
	fail( 'docs/reference/hooks/actions/: at least one curated action detail page is required' );
}
if ( ! hookDetailFiles.some( filename => path.basename( path.dirname( filename ) ) === 'filters' ) ) {
	fail( 'docs/reference/hooks/filters/: at least one curated filter detail page is required' );
}
const hookHeadings = [
	'Behavior',
	'Callback signature',
	'Parameters',
	'Return behavior',
	'Since, deprecation, and replacement',
	'Ownership',
	'Example',
	'Compatibility and failure cautions',
	'Verification',
	'Source',
];
for ( const filename of hookDetailFiles ) {
	const page = parsedPages.get( filename );
	const expectedType = path.basename( path.dirname( filename ) ) === 'actions' ? 'action' : 'filter';
	for ( const field of [ 'hook_name', 'hook_type', 'product', 'since', 'deprecated', 'source_url' ] ) {
		if ( page.data[ field ] === undefined || page.data[ field ] === '' ) {
			fail( `${ relative( filename ) }: missing hook contract field ${ field }` );
		}
	}
	if ( page.data.hook_type !== expectedType ) {
		fail( `${ relative( filename ) }: hook_type must be ${ expectedType }` );
	}
	if ( ! expectedProducts.includes( page.data.product ) ) {
		fail( `${ relative( filename ) }: hook product must match catalog.json` );
	}
	if ( typeof page.data.deprecated !== 'boolean' ) {
		fail( `${ relative( filename ) }: deprecated must be true or false` );
	}
	const trustedHookSources = [
		new RegExp( `^https://github\\.com/Automattic/jetpack/blob/${ jetpackSourceRef }/[^#]+#L\\d+(?:-L\\d+)?$` ),
		new RegExp( `^https://github\\.com/Automattic/jetpack-crm/blob/${ jetpackCrmSourceRef }/[^#]+#L\\d+(?:-L\\d+)?$` ),
		new RegExp( `^https://plugins\\.trac\\.wordpress\\.org/browser/akismet/tags/5\\.7/[^?#]+\\?rev=${ akismetSourceRevision }#L\\d+(?:-L\\d+)?$` ),
	];
	if ( ! trustedHookSources.some( pattern => pattern.test( page.data.source_url || '' ) ) ) {
		fail( `${ relative( filename ) }: source_url must be an immutable, line-level permalink to a pinned reviewed source` );
	}
	for ( const heading of hookHeadings ) {
		if ( ! page.body.includes( `## ${ heading }` ) ) {
			fail( `${ relative( filename ) }: missing hook contract section ${ heading }` );
		}
	}
	for ( const blockName of [ 'docspress/fields', 'docspress/colorful-code', 'docspress/callout', 'docspress/result' ] ) {
		if ( ! blocksByFile.get( filename )?.has( blockName ) ) {
			fail( `${ relative( filename ) }: hook detail requires semantic block ${ blockName }` );
		}
	}
}

const sourceRevisions = JSON.parse( await fs.readFile( path.join( docsRoot, 'source-revisions.json' ), 'utf8' ) );
if ( sourceRevisions.sources?.jetpack?.ref !== jetpackSourceRef ) {
	fail( 'docs/source-revisions.json: Jetpack source revision is not pinned to the approved commit' );
}
if (
	sourceRevisions.sources?.docspress?.ref !== docsPressSourceRef ||
	sourceRevisions.sources?.docspress?.release !== 'wordpress-0.10.7'
) {
	fail( 'docs/source-revisions.json: DocsPress source revision is not pinned to wordpress-0.10.7' );
}
for ( const [ sourceId, expected ] of Object.entries( {
	jetpack_crm: { repository: 'Automattic/jetpack-crm', ref: '8dbe017c517819a7f6c583dff6e4cb8819a7f72e' },
	jetpack_crm_api_docs: { repository: 'Automattic/jetpack-crm-api-docs', ref: 'c2a53fd8d6de70f27c87bd15652ccacf0ecabd3f' },
	jetpack_crm_code_examples: { repository: 'Automattic/jetpack-crm-code-examples', ref: 'b0048ae9c73a8bd3d2029aa343317240ecb7af73' },
	akismet: { repository: 'plugins.svn.wordpress.org/akismet', tag: '5.7', revision: 3514187 },
} ) ) {
	if ( JSON.stringify( sourceRevisions.sources?.[ sourceId ] ) !== JSON.stringify( expected ) ) {
		fail( `docs/source-revisions.json: ${ sourceId } source revision is not pinned to the reviewed public source` );
	}
}

const preservationPath = path.join( docsRoot, 'source-preservation.json' );
const preservation = JSON.parse( await fs.readFile( preservationPath, 'utf8' ) );
if (
	preservation.version !== 1 ||
	preservation.reviewed_at !== '2026-08-05' ||
	preservation.upstream?.repository !== 'Automattic/jetpack' ||
	preservation.upstream?.ref !== jetpackSourceRef ||
	preservation.upstream?.docs_tree !== '66564705886854cfbb3c089df4fe603e8075ec5a'
) {
	fail( 'docs/source-preservation.json: upstream repository, revision, docs tree, version, and review date must remain pinned' );
}
const preservationFiles = preservation.files || [];
const preservedSourcePaths = preservationFiles.map( entry => entry.source_path ).sort( ( left, right ) => left.localeCompare( right ) );
if ( JSON.stringify( preservedSourcePaths ) !== JSON.stringify( expectedPreservedSources.sort( ( left, right ) => left.localeCompare( right ) ) ) ) {
	fail( 'docs/source-preservation.json: registry must cover all 28 Markdown documents and three supporting artifacts in the pinned Jetpack docs tree' );
}
if ( preservationFiles.reduce( ( total, entry ) => total + Number( entry.source_bytes || 0 ), 0 ) !== 162869 ) {
	fail( 'docs/source-preservation.json: source byte inventory must total 162869 bytes' );
}
const preservedDestinations = new Set();
for ( const entry of preservationFiles ) {
	if (
		! /^docs\//.test( entry.source_path || '' ) ||
		! /^[0-9a-f]{40}$/.test( entry.source_blob || '' ) ||
		! /^[0-9a-f]{64}$/.test( entry.source_sha256 || '' ) ||
		! Number.isInteger( entry.source_bytes ) ||
		entry.source_bytes <= 0 ||
		! Array.isArray( entry.destinations ) ||
		entry.destinations.length !== 1
	) {
		fail( `docs/source-preservation.json: invalid preservation record for ${ entry.source_path || '(missing source)' }` );
		continue;
	}
	const destination = entry.destinations[ 0 ];
	if ( destination.startsWith( '/' ) || destination.split( '/' ).includes( '..' ) || preservedDestinations.has( destination ) ) {
		fail( `docs/source-preservation.json: unsafe or duplicate destination ${ destination }` );
		continue;
	}
	preservedDestinations.add( destination );
	const destinationFile = path.join( docsRoot, destination );
	let destinationContent;
	try {
		destinationContent = await fs.readFile( destinationFile );
	} catch {
		fail( `docs/source-preservation.json: missing preserved destination docs/${ destination }` );
		continue;
	}
	if ( /\.md$/i.test( destination ) ) {
		const page = parsedPages.get( destinationFile );
		if ( ! page ) {
			fail( `docs/${ destination }: preserved Markdown destination was not collected` );
			continue;
		}
		for ( const [ field, expected ] of [
			[ 'source_ref', jetpackSourceRef ],
			[ 'source_path', entry.source_path ],
			[ 'source_blob', entry.source_blob ],
			[ 'source_sha256', entry.source_sha256 ],
			[ 'preservation_status', entry.mode ],
		] ) {
			if ( String( page.data[ field ] || '' ) !== String( expected ) ) {
				fail( `docs/${ destination }: ${ field } must match source-preservation.json` );
			}
		}
		const preservedBody = page.body.match( /<!-- jetpack-docs:preserved-source:start -->\n([\s\S]*?)\n<!-- jetpack-docs:preserved-source:end -->/ )?.[ 1 ];
		if ( preservedBody === undefined || ! /^[0-9a-f]{64}$/.test( entry.preserved_body_sha256 || '' ) ) {
			fail( `docs/${ destination }: preserved source boundaries or body hash are missing` );
		} else if ( sha256( preservedBody.trim() ) !== entry.preserved_body_sha256 ) {
			fail( `docs/${ destination }: preserved normalized body does not match its registry hash` );
		}
	} else if ( sha256( destinationContent ) !== entry.source_sha256 ) {
		fail( `docs/${ destination }: supporting artifact must remain byte-for-byte identical to its registered source` );
	}
}
const historicalRest = await fs.readFile( path.join( docsRoot, 'reference', 'rest-api', 'historical-jetpack-v4-inventory.md' ), 'utf8' );
for ( const marker of [
	'<redacted-wp-rest-nonce>',
	'<redacted-authorize-url: contains a one-time secret and site/user data>',
	'"username": "<redacted>"',
	'"wpcomUser": "<redacted account data>"',
	'"permissions": "<redacted capability map>"',
] ) {
	if ( ! historicalRest.includes( marker ) ) {
		fail( `docs/reference/rest-api/historical-jetpack-v4-inventory.md: required historical redaction marker is missing` );
	}
}
for ( const [ pattern, label ] of [
	[ /^X-WP-Nonce:\s*(?!<redacted-wp-rest-nonce>)[A-Za-z0-9_-]{8,}\s*$/m, 'literal REST nonce' ],
	[ /jetpack\.authorize/i, 'one-time authorization URL' ],
	[ /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, 'email address' ],
	[ /https?:\/\/[^/\s"'<>]*(?:mysite|mydomain)[^/\s"'<>]*/i, 'example site hostname derived from the historical response' ],
] ) {
	if ( pattern.test( historicalRest ) ) {
		fail( `docs/reference/rest-api/historical-jetpack-v4-inventory.md: unsanitized ${ label }` );
	}
}

const configuratorPath = path.join( repositoryRoot, 'playground', 'configure-jetpack-site.php' );
const configurator = await fs.readFile( configuratorPath, 'utf8' );
const blueprintPath = path.join( repositoryRoot, 'playground', 'blueprint.json' );
const blueprintContent = await fs.readFile( blueprintPath, 'utf8' );
validatePublicWordPressUrls( blueprintContent, blueprintPath );
const blueprint = JSON.parse( blueprintContent );
const jetpackLogoUrl = `https://raw.githubusercontent.com/Automattic/jetpack/${ jetpackSourceRef }/projects/packages/forms/src/contact-form/images/field-icons/jetpack-logo%402x.png`;
const blueprintResult = validateBlueprint( blueprint );
if ( ! blueprintResult.valid ) {
	fail( `playground/blueprint.json: ${ JSON.stringify( blueprintResult.errors ) }` );
}
if ( blueprint.landingPage !== '/docs/' || blueprint.login !== true ) {
	fail( 'playground/blueprint.json: must log in and land on /docs/' );
}
if ( blueprint.preferredVersions?.php !== '8.3' || blueprint.preferredVersions?.wp !== 'latest' ) {
	fail( 'playground/blueprint.json: must use PHP 8.3 and current WordPress' );
}
const gitResources = blueprint.steps.flatMap( step => [ step.pluginData, step.themeData, step.filesTree ] ).filter( Boolean );
const docsPressResources = gitResources.filter( item => item.url === 'https://github.com/Automattic/docspress' );
if (
	JSON.stringify( blueprint.steps.map( step => step.step ) ) !== JSON.stringify( [ 'installPlugin', 'installTheme', 'writeFiles', 'mkdir', 'writeFile', 'writeFile', 'runPHP' ] ) ||
	gitResources.length !== 3 ||
	docsPressResources.length !== 2 ||
	! docsPressResources.some( resource => resource.path === 'plugins/docspress-blocks' ) ||
	! docsPressResources.some( resource => resource.path === 'theme' )
) {
	fail( 'playground/blueprint.json: must install only the upstream DocsPress blocks plugin and theme' );
}
for ( const resource of docsPressResources ) {
	if ( resource.resource !== 'git:directory' || resource.ref !== docsPressSourceRef || resource.refType !== 'commit' ) {
		fail( 'playground/blueprint.json: DocsPress resources must use the approved immutable commit' );
	}
}
const docsResource = gitResources.find( item => item.url === 'https://github.com/f/jetpack-docs' );
if ( ! docsResource || docsResource.resource !== 'git:directory' || docsResource.ref !== 'main' || docsResource.refType !== 'branch' || docsResource.path !== 'docs' ) {
	fail( 'playground/blueprint.json: must import f/jetpack-docs main/docs' );
}
const remoteWriteFiles = blueprint.steps.find( step => step.step === 'writeFiles' );
if ( remoteWriteFiles?.writeToPath !== '/wordpress/docspress-source-docs' || remoteWriteFiles.filesTree !== docsResource ) {
	fail( 'playground/blueprint.json: docs must be written to the upstream mounted-directory import path' );
}
const remoteWriteFileSteps = blueprint.steps.filter( step => step.step === 'writeFile' );
const remoteMkdirSteps = blueprint.steps.filter( step => step.step === 'mkdir' );
const remoteConfigurator = remoteWriteFileSteps.find( step => step.path === '/wordpress/jetpack-docs-playground/configure-jetpack-site.php' );
const remoteLogo = remoteWriteFileSteps.find( step => step.path === '/wordpress/jetpack-docs-logo.png' );
if (
	remoteWriteFileSteps.length !== 2 ||
	remoteMkdirSteps.length !== 1 ||
	remoteMkdirSteps[0].path !== '/wordpress/jetpack-docs-playground' ||
	typeof remoteConfigurator?.data !== 'string' ||
	remoteConfigurator.data !== configurator ||
	remoteLogo?.data?.resource !== 'url' ||
	remoteLogo.data.url !== jetpackLogoUrl
) {
	fail( 'playground/blueprint.json: must embed the reviewed configurator and load the immutable pinned Jetpack logo into their approved paths' );
}
const remoteBootstrap = blueprint.steps.find( step => step.step === 'runPHP' )?.code || '';
if (
	! remoteBootstrap.includes( '/playground/import-local-docs.php' ) ||
	! remoteBootstrap.includes( 'sourceContentBase64' ) ||
	! remoteBootstrap.includes( '/sidebars.json' ) ||
	! remoteBootstrap.includes( '_docspress_sidebar_id' ) ||
	! remoteBootstrap.includes( '_docspress_sidebar_root' ) ||
	! remoteBootstrap.includes( "'sidebarId'" ) ||
	! remoteBootstrap.includes( "'sidebarRoot'" ) ||
	! remoteBootstrap.includes( 'wp-block-code' ) ||
	! remoteBootstrap.includes( 'docspress_flush_llms_rewrite_rules' ) ||
	! remoteBootstrap.includes( "require '/wordpress/jetpack-docs-playground/configure-jetpack-site.php'" ) ||
	! remoteBootstrap.includes( 'jetpack_docs_configure_site();' )
) {
	fail( 'playground/blueprint.json: must use the upstream importer, preserve llms.txt/.md source metadata, and apply native Jetpack editor defaults' );
}

const localBlueprintPath = path.join( repositoryRoot, 'playground', 'local-blueprint.json' );
const localBlueprintContent = await fs.readFile( localBlueprintPath, 'utf8' );
validatePublicWordPressUrls( localBlueprintContent, localBlueprintPath );
const localBlueprint = JSON.parse( localBlueprintContent );
const localBlueprintResult = validateBlueprint( localBlueprint );
if ( ! localBlueprintResult.valid ) {
	fail( `playground/local-blueprint.json: ${ JSON.stringify( localBlueprintResult.errors ) }` );
}
if (
	localBlueprint.landingPage !== '/docs/' ||
	localBlueprint.login !== true ||
	localBlueprint.preferredVersions?.php !== '8.3' ||
	localBlueprint.preferredVersions?.wp !== 'latest'
) {
	fail( 'playground/local-blueprint.json: must log in, land on /docs/, use PHP 8.3, and use current WordPress' );
}
const localResources = localBlueprint.steps.flatMap( step => [ step.pluginData, step.themeData, step.filesTree ] ).filter( Boolean );
if (
	JSON.stringify( localBlueprint.steps.map( step => step.step ) ) !== JSON.stringify( [ 'installPlugin', 'installTheme', 'writeFile', 'runPHP' ] ) ||
	localResources.length !== 2 ||
	localResources.some( resource => resource.resource !== 'git:directory' || resource.url !== 'https://github.com/Automattic/docspress' || resource.ref !== docsPressSourceRef || resource.refType !== 'commit' ) ||
	! localResources.some( resource => resource.path === 'plugins/docspress-blocks' ) ||
	! localResources.some( resource => resource.path === 'theme' )
) {
	fail( 'playground/local-blueprint.json: must install only the two approved immutable DocsPress resources' );
}
const localWriteFileSteps = localBlueprint.steps.filter( step => step.step === 'writeFile' );
if (
	localWriteFileSteps.length !== 1 ||
	localWriteFileSteps[0].path !== '/wordpress/jetpack-docs-logo.png' ||
	localWriteFileSteps[0].data?.resource !== 'url' ||
	localWriteFileSteps[0].data.url !== jetpackLogoUrl
) {
	fail( 'playground/local-blueprint.json: must load only the immutable pinned Jetpack logo outside the mounted repository paths' );
}
const localBootstrap = localBlueprint.steps.find( step => step.step === 'runPHP' )?.code || '';
if (
	! localBootstrap.includes( '/playground/import-local-docs.php' ) ||
	! localBootstrap.includes( 'sourceContentBase64' ) ||
	! localBootstrap.includes( '/sidebars.json' ) ||
	! localBootstrap.includes( '_docspress_sidebar_id' ) ||
	! localBootstrap.includes( '_docspress_sidebar_root' ) ||
	! localBootstrap.includes( "'sidebarId'" ) ||
	! localBootstrap.includes( "'sidebarRoot'" ) ||
	! localBootstrap.includes( 'wp-block-code' ) ||
	! localBootstrap.includes( 'docspress_flush_llms_rewrite_rules' ) ||
	! localBootstrap.includes( "require '/wordpress/jetpack-docs-playground/configure-jetpack-site.php'" ) ||
	! localBootstrap.includes( 'jetpack_docs_configure_site();' )
) {
	fail( 'playground/local-blueprint.json: must use the upstream importer, preserve llms.txt/.md source metadata, and apply native Jetpack editor defaults' );
}
if ( localBootstrap !== remoteBootstrap ) {
	fail( 'playground blueprints: local and remote PHP bootstraps must remain byte-for-byte identical' );
}

const phpLint = spawnSync( 'php', [ '-l', configuratorPath ], { encoding: 'utf8' } );
if ( phpLint.error || phpLint.status !== 0 ) {
	fail( `playground/configure-jetpack-site.php: PHP lint failed: ${ phpLint.error?.message || phpLint.stderr || phpLint.stdout }` );
}
for ( const marker of [
	"'/styles/theme/jetpack.json'",
	"'Jetpack' !== ( $variation['title'] ?? '' )",
	"'#069e08'",
	"'isGlobalStylesUserThemeJSON' => true",
	"'version'                     => (int) $variation['version']",
	'jetpack_docs_enable_color_modes',
	"$variation['styles']['color']['background']                    = 'var(--dp-paper)';",
	"$variation['styles']['color']['text']                          = 'var(--dp-copy)';",
	"$variation['styles']['elements']['caption']['color']['text']   = 'var(--dp-muted)';",
	"$variation['styles']['elements']['heading']['color']['text']   = 'var(--dp-ink)';",
	"$variation['styles']['elements']['link']['color']['text']      = 'var(--dp-blue-dark)';",
	"$variation['styles']['elements']['link'][':hover']['color']['text'] = 'var(--dp-blue)';",
	'WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( $theme, true )',
	'WP_Theme_JSON_Resolver::clean_cached_data()',
	"wp_clean_theme_json_cache",
	"wp_set_current_user",
	"'wp_template_part'",
	"wp_set_object_terms( $post_id, 'docspress', 'wp_theme', false )",
	"wp_set_object_terms( $post_id, 'header', 'wp_template_part_area', false )",
	"update_post_meta( $post_id, 'origin', 'theme' )",
	'Jetpack</strong> Developer Docs',
	'"label":"Docs","url":"/docs/"',
	'wp:docspress/command-search',
	'wp:docspress/color-mode-toggle',
	'https://github.com/f/jetpack-docs',
	'wp:docspress/docs-menu-toggle',
	"update_option( 'blogname', 'Jetpack Developer Docs' )",
	jetpackSourceRef,
	jetpackLogoSha256,
] ) {
	if ( ! configurator.includes( marker ) ) {
		fail( `playground/configure-jetpack-site.php: required native design contract is missing ${ marker }` );
	}
}
if (
	configurator.includes( 'wp:docspress/version-switcher' ) ||
	configurator.includes( '>DocsPress</a>' ) ||
	configurator.includes( 'github.com/Automattic/docspress' ) ||
	configurator.includes( '"fontFamily":"ui"' ) ||
	configurator.includes( 'has-ui-font-family' )
) {
	fail( 'playground/configure-jetpack-site.php: header must inherit Jetpack typography and omit the DocsPress brand, repository, and unneeded version control' );
}
const headerNowdoc = configurator.match( /return <<<'HTML'\n([\s\S]*?)\nHTML;/ );
if ( ! headerNowdoc ) {
	fail( 'playground/configure-jetpack-site.php: native header block markup could not be extracted' );
} else {
	const headerBlocks = parseBlocks( headerNowdoc[ 1 ] );
	const flattenedHeaderBlocks = [];
	const collectHeaderBlocks = blocks => {
		for ( const block of blocks ) {
			flattenedHeaderBlocks.push( block );
			collectHeaderBlocks( block.innerBlocks || [] );
		}
	};
	collectHeaderBlocks( headerBlocks );
	if (
		headerBlocks.length !== 1 ||
		headerBlocks[ 0 ].blockName !== 'core/group' ||
		flattenedHeaderBlocks.some( block => ! block.blockName ) ||
		! flattenedHeaderBlocks.some( block => block.blockName === 'core/site-logo' ) ||
		! flattenedHeaderBlocks.some( block => block.blockName === 'docspress/color-mode-toggle' )
	) {
		fail( 'playground/configure-jetpack-site.php: native header must be one valid serialized group with its Jetpack logo and color-mode control' );
	}
}
for ( const match of configurator.matchAll( /<!-- wp:([a-z0-9-]+(?:\/[a-z0-9-]+)?)/g ) ) {
	const blockName = match[ 1 ].includes( '/' ) ? match[ 1 ] : `core/${ match[ 1 ] }`;
	if ( ! blockName.startsWith( 'core/' ) && ! blockName.startsWith( 'docspress/' ) ) {
		fail( `playground/configure-jetpack-site.php: unsupported header block namespace ${ blockName }` );
	}
}

const packageJson = JSON.parse( await fs.readFile( path.join( repositoryRoot, 'package.json' ), 'utf8' ) );
if (
	packageJson.devDependencies?.[ '@wordpress/block-serialization-default-parser' ] !== '5.52.0' ||
	packageJson.devDependencies?.[ '@wp-playground/blueprints' ] !== '3.1.46' ||
	packageJson.devDependencies?.[ '@wp-playground/cli' ] !== '3.1.46' ||
	packageJson.devDependencies?.docspress !== `https://github.com/Automattic/docspress/archive/${ docsPressSourceRef }.tar.gz` ||
	packageJson.devDependencies?.yaml !== '2.9.0' ||
	! packageJson.scripts?.playground?.includes( '--blueprint=playground/local-blueprint.json' ) ||
	! packageJson.scripts?.playground?.includes( '--mount=$PWD/playground:/wordpress/jetpack-docs-playground' ) ||
	! packageJson.scripts?.playground?.includes( '--login' )
) {
	fail( 'package.json: DocsPress and Playground validation dependencies must remain exactly pinned' );
}
const packageLock = JSON.parse( await fs.readFile( path.join( repositoryRoot, 'package-lock.json' ), 'utf8' ) );
if (
	packageLock.packages?.[ 'node_modules/@wordpress/block-serialization-default-parser' ]?.version !== '5.52.0' ||
	packageLock.packages?.[ 'node_modules/docspress' ]?.resolved !== `https://github.com/Automattic/docspress/archive/${ docsPressSourceRef }.tar.gz` ||
	packageLock.packages?.[ 'node_modules/@wp-playground/blueprints' ]?.version !== '3.1.46' ||
	packageLock.packages?.[ 'node_modules/@wp-playground/cli' ]?.version !== '3.1.46' ||
	packageLock.packages?.[ 'node_modules/yaml' ]?.version !== '2.9.0'
) {
	fail( 'package-lock.json: resolved DocsPress and Playground dependencies must remain exactly pinned' );
}
const readme = await fs.readFile( path.join( repositoryRoot, 'README.md' ), 'utf8' );
const expectedPlaygroundLink = 'https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Ff%2Fjetpack-docs%2Fmain%2Fplayground%2Fblueprint.json&page-title=Jetpack%20Docs';
if (
	! readme.includes( expectedPlaygroundLink ) ||
	! readme.includes( docsPressSourceRef ) ||
	! readme.includes( '--blueprint=playground/local-blueprint.json' ) ||
	! readme.includes( '--mount="$PWD/playground:/wordpress/jetpack-docs-playground"' ) ||
	! readme.includes( 'native Jetpack Global Style' ) ||
	! readme.includes( 'light and dark modes' ) ||
	! readme.includes( 'Appearance → Editor' )
) {
	fail( 'README.md: remote and mounted local Playground instructions must document the approved pins and editable native Jetpack defaults' );
}
for ( const contributionMarker of [ 'Fork `f/jetpack-docs`', 'npm test', 'open a pull request' ] ) {
	if ( ! readme.includes( contributionMarker ) ) {
		fail( `README.md: contribution instructions must include ${ contributionMarker }` );
	}
}
const license = await fs.readFile( path.join( repositoryRoot, 'LICENSE.txt' ), 'utf8' );
if ( ! license.includes( 'GNU GENERAL PUBLIC LICENSE' ) || ! license.includes( 'Version 2, June 1991' ) || license.split( /\r?\n/ ).length < 300 ) {
	fail( 'LICENSE.txt: the complete GPL version 2 text is required' );
}

let sidebarsRegistry;
try {
	sidebarsRegistry = await readSidebarsRegistry( { cwd: repositoryRoot, sidebarsFile } );
	const actualSidebars = Object.fromEntries(
		sidebarsRegistry.entries.map( entry => [ entry.id, entry.root || '.' ] )
	);
	if (
		sidebarsRegistry.default !== expectedSidebars.default ||
		JSON.stringify( actualSidebars ) !== JSON.stringify( expectedSidebars.sidebars )
	) {
		fail( 'docs/sidebars.json: expected the approved use, agents, build, products, and reference navigation contexts' );
	}
} catch ( error ) {
	fail( `docs/sidebars.json: ${ error.message }` );
}

try {
	const desiredPages = await collectDesiredPages( {
		cwd: repositoryRoot,
		docsDir: 'docs',
		rootSlug: 'docs',
		rootTitle: 'Jetpack Docs',
		createH1: false,
		rewriteLinks: true,
		editLink: false,
		status: 'publish',
		sidebarsFile,
		sidebarsRegistry,
	} );
	if ( desiredPages.length !== markdownFiles.length ) {
		fail( `DocsPress collected ${ desiredPages.length } Pages from ${ markdownFiles.length } Markdown files; every directory needs an index.md` );
	}
	const expectedRoots = new Map( Object.entries( expectedSidebars.sidebars ).map( ( [ id, root ] ) => [ id, root === '.' ? '' : root ] ) );
	const seenRoots = new Set();
	const routeDepth = route => route ? route.split( '/' ).length : 0;
	const orderedRoots = [ ...expectedRoots.entries() ].sort( ( left, right ) => routeDepth( right[ 1 ] ) - routeDepth( left[ 1 ] ) );
	for ( const page of desiredPages ) {
		const expectedSidebar = orderedRoots.find( ( [ , root ] ) => root === '' || page.routeKey === root || page.routeKey.startsWith( `${ root }/` ) );
		if ( ! expectedSidebar || page.sidebarId !== expectedSidebar[ 0 ] ) {
			fail( `${ page.sourcePath }: expected sidebar ${ expectedSidebar?.[ 0 ] || '(none)' }, received ${ page.sidebarId || '(none)' }` );
		}
		const expectedRoot = page.routeKey === expectedSidebar?.[ 1 ];
		if ( Boolean( page.sidebarRoot ) !== expectedRoot ) {
			fail( `${ page.sourcePath }: sidebarRoot does not match the configured logical root` );
		}
		if ( expectedRoot ) {
			seenRoots.add( page.sidebarId );
		}
		if ( ! page.content.includes( `"sidebarId":"${ page.sidebarId }"` ) || ! page.content.includes( `"sidebarRoot":${ Boolean( page.sidebarRoot ) }` ) ) {
			fail( `${ page.sourcePath }: DocsPress sentinel is missing sidebar context metadata` );
		}
	}
	for ( const sidebarId of expectedRoots.keys() ) {
		if ( ! seenRoots.has( sidebarId ) ) {
			fail( `docs/sidebars.json: sidebar ${ sidebarId } does not resolve to an authored root page` );
		}
	}
} catch ( error ) {
	fail( `DocsPress conversion failed: ${ error.stack || error.message }` );
}

if ( errors.length ) {
	console.error( `Documentation validation failed with ${ errors.length } error(s):` );
	for ( const error of errors ) {
		console.error( `- ${ error }` );
	}
	process.exit( 1 );
}

console.log( `Validated ${ markdownFiles.length } Markdown pages, ${ catalog.products.length } product lifecycles, and the pinned DocsPress Playground.` );
