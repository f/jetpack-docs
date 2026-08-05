#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { validateBlueprint } from '@wp-playground/blueprints';
import { collectDesiredPages } from 'docspress/src/docs.js';
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
const jetpackSourceRef = '5c0d27877fd19504a8de8b8618950d51876816a0';
const docsPressSourceRef = '517050b6aceb09cacd7dc66c0df2023718e57bd9';

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

function anchorsFor( body ) {
	const anchors = new Set();
	for ( const match of body.matchAll( /^#{1,6}\s+(.+?)\s*#*\s*$/gm ) ) {
		anchors.add(
			match[ 1 ]
				.toLowerCase()
				.replace( /[`*_~[\]()]/g, '' )
				.replace( /[^\p{Letter}\p{Number}\s-]/gu, '' )
				.trim()
				.replace( /\s+/g, '-' )
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

function validatePublicWordPressUrls( content, filename ) {
	const publicWordPressHosts = new Set( [
		'wordpress.com',
		'www.wordpress.com',
		'developer.wordpress.com',
		'support.wordpress.com',
		'en.support.wordpress.com',
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

const allFiles = await walk( docsRoot );
const knownFiles = new Set( allFiles );
const markdownFiles = allFiles.filter( filename => /\.md$/i.test( filename ) ).sort();
const authoredTextFiles = new Set( [
	...allFiles,
	path.join( repositoryRoot, '.gitignore' ),
	path.join( repositoryRoot, 'LICENSE.txt' ),
	path.join( repositoryRoot, 'README.md' ),
	path.join( repositoryRoot, 'package.json' ),
	path.join( repositoryRoot, 'package-lock.json' ),
	path.join( repositoryRoot, 'playground', 'blueprint.json' ),
	path.join( repositoryRoot, 'playground', 'local-blueprint.json' ),
	path.join( repositoryRoot, '.github', 'workflows', 'validate-docs.yml' ),
] );
for ( const filename of authoredTextFiles ) {
	const content = await fs.readFile( filename, 'utf8' );
	validatePublicWordPressUrls( content, filename );
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
	if ( /^#\s+/m.test( parsed.body ) ) {
		fail( `${ relative( filename ) }: body-level H1 is not allowed; DocsPress renders the front-matter title` );
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

	for ( const block of content.matchAll( /<!--\s+wp:([^\s]+)(?:\s|\/-->)/g ) ) {
		const name = block[ 1 ];
		if ( name.includes( '/' ) && ! name.startsWith( 'docspress/' ) && ! name.startsWith( 'core/' ) ) {
			fail( `${ relative( filename ) }: unsupported Gutenberg block ${ name }` );
		}
	}
	for ( const block of content.matchAll( /<!--\s+wp:docspress\/prompt\s+({[^\n]*})\s+\/-->/g ) ) {
		try {
			const attributes = JSON.parse( block[ 1 ] );
			if ( ! [ 'chat', 'code', 'ask', 'plan' ].includes( attributes.mode ) ) {
				fail( `${ relative( filename ) }: docspress/prompt mode must be chat, code, ask, or plan` );
			}
		} catch ( error ) {
			fail( `${ relative( filename ) }: invalid docspress/prompt block attributes: ${ error.message }` );
		}
	}
}

for ( const [ filename, page ] of parsedPages ) {
	const anchors = anchorsFor( page.body );
	const targets = [
		...page.body.matchAll( /!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g ),
	].map( match => match[ 1 ] );
	for ( const match of page.body.matchAll( /"(?:url|primaryUrl|secondaryUrl)":"(\/docs\/[^"]*)"/g ) ) {
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

const hookDetailFiles = markdownFiles.filter( filename => {
	const parent = path.basename( path.dirname( filename ) );
	return [ 'actions', 'filters' ].includes( parent ) && path.basename( filename ) !== 'index.md';
} );
const requiredHookDetails = [
	'actions/jetpack-loaded.md',
	'actions/jetpack-backup-initialized.md',
	'filters/jetpack-offline-mode.md',
	'filters/jetpack-boost-render-blocking-js-exclude-handles.md',
	'filters/jetpack-boost-critical-css-urls.md',
	'filters/jetpack-search-should-handle-query.md',
	'filters/jetpack-search-es-wp-query-args.md',
	'filters/videopress-get-video-details.md',
];
for ( const hookFile of requiredHookDetails ) {
	const filename = path.join( docsRoot, 'reference', 'hooks', hookFile );
	if ( ! parsedPages.has( filename ) ) {
		fail( `${ relative( filename ) }: required curated hook detail page is missing` );
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
	if ( ! new RegExp( `^https://github\\.com/Automattic/jetpack/blob/${ jetpackSourceRef }/[^#]+#L\\d+(?:-L\\d+)?$` ).test( page.data.source_url || '' ) ) {
		fail( `${ relative( filename ) }: source_url must be an immutable, line-level Jetpack source permalink` );
	}
	for ( const heading of hookHeadings ) {
		if ( ! page.body.includes( `## ${ heading }` ) ) {
			fail( `${ relative( filename ) }: missing hook contract section ${ heading }` );
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

const blueprintPath = path.join( repositoryRoot, 'playground', 'blueprint.json' );
const blueprintContent = await fs.readFile( blueprintPath, 'utf8' );
validatePublicWordPressUrls( blueprintContent, blueprintPath );
const blueprint = JSON.parse( blueprintContent );
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
	JSON.stringify( blueprint.steps.map( step => step.step ) ) !== JSON.stringify( [ 'installPlugin', 'installTheme', 'writeFiles', 'runPHP' ] ) ||
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
const remoteBootstrap = blueprint.steps.find( step => step.step === 'runPHP' )?.code || '';
if (
	! remoteBootstrap.includes( '/playground/import-local-docs.php' ) ||
	! remoteBootstrap.includes( 'sourceContentBase64' ) ||
	! remoteBootstrap.includes( 'wp-block-code' ) ||
	! remoteBootstrap.includes( 'docspress_flush_llms_rewrite_rules' )
) {
	fail( 'playground/blueprint.json: must use the upstream importer and preserve llms.txt/.md source metadata' );
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
	JSON.stringify( localBlueprint.steps.map( step => step.step ) ) !== JSON.stringify( [ 'installPlugin', 'installTheme', 'runPHP' ] ) ||
	localResources.length !== 2 ||
	localResources.some( resource => resource.resource !== 'git:directory' || resource.url !== 'https://github.com/Automattic/docspress' || resource.ref !== docsPressSourceRef || resource.refType !== 'commit' ) ||
	! localResources.some( resource => resource.path === 'plugins/docspress-blocks' ) ||
	! localResources.some( resource => resource.path === 'theme' )
) {
	fail( 'playground/local-blueprint.json: must install only the two approved immutable DocsPress resources' );
}
const localBootstrap = localBlueprint.steps.find( step => step.step === 'runPHP' )?.code || '';
if (
	! localBootstrap.includes( '/playground/import-local-docs.php' ) ||
	! localBootstrap.includes( 'sourceContentBase64' ) ||
	! localBootstrap.includes( 'wp-block-code' ) ||
	! localBootstrap.includes( 'docspress_flush_llms_rewrite_rules' )
) {
	fail( 'playground/local-blueprint.json: must use the upstream importer and preserve llms.txt/.md source metadata' );
}

const packageJson = JSON.parse( await fs.readFile( path.join( repositoryRoot, 'package.json' ), 'utf8' ) );
if (
	packageJson.devDependencies?.[ '@wp-playground/blueprints' ] !== '3.1.46' ||
	packageJson.devDependencies?.[ '@wp-playground/cli' ] !== '3.1.46' ||
	packageJson.devDependencies?.docspress !== `https://github.com/Automattic/docspress/archive/${ docsPressSourceRef }.tar.gz` ||
	packageJson.devDependencies?.yaml !== '2.9.0' ||
	! packageJson.scripts?.playground?.includes( '--blueprint=playground/local-blueprint.json' )
) {
	fail( 'package.json: DocsPress and Playground validation dependencies must remain exactly pinned' );
}
const packageLock = JSON.parse( await fs.readFile( path.join( repositoryRoot, 'package-lock.json' ), 'utf8' ) );
if (
	packageLock.packages?.[ 'node_modules/docspress' ]?.resolved !== `https://github.com/Automattic/docspress/archive/${ docsPressSourceRef }.tar.gz` ||
	packageLock.packages?.[ 'node_modules/@wp-playground/blueprints' ]?.version !== '3.1.46' ||
	packageLock.packages?.[ 'node_modules/@wp-playground/cli' ]?.version !== '3.1.46' ||
	packageLock.packages?.[ 'node_modules/yaml' ]?.version !== '2.9.0'
) {
	fail( 'package-lock.json: resolved DocsPress and Playground dependencies must remain exactly pinned' );
}
const readme = await fs.readFile( path.join( repositoryRoot, 'README.md' ), 'utf8' );
const expectedPlaygroundLink = 'https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Ff%2Fjetpack-docs%2Fmain%2Fplayground%2Fblueprint.json&page-title=Jetpack%20Docs';
if ( ! readme.includes( expectedPlaygroundLink ) || ! readme.includes( docsPressSourceRef ) || ! readme.includes( '--blueprint=playground/local-blueprint.json' ) ) {
	fail( 'README.md: remote and mounted local Playground links must use the approved repository and DocsPress pin' );
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
	} );
	if ( desiredPages.length !== markdownFiles.length ) {
		fail( `DocsPress collected ${ desiredPages.length } Pages from ${ markdownFiles.length } Markdown files; every directory needs an index.md` );
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
