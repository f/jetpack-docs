#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const scriptDirectory = path.dirname( fileURLToPath( import.meta.url ) );
const repositoryRoot = path.resolve( scriptDirectory, '..' );
const hooksRoot = path.join( repositoryRoot, 'docs', 'reference', 'hooks' );
const generatedPattern = /<!-- jetpack-docs:hook-blocks:start -->[\s\S]*?<!-- jetpack-docs:hook-blocks:end -->\s*/;

function safeBlock( name, attrs ) {
	const json = JSON.stringify( attrs )
		.replaceAll( '<', '\\u003c' )
		.replaceAll( '>', '\\u003e' )
		.replaceAll( '&', '\\u0026' )
		.replaceAll( '--', '\\u002d\\u002d' );
	return `<!-- wp:${ name } ${ json } /-->`;
}

function plainText( value ) {
	return value
		.replace( /\[([^\]]+)\]\([^)]+\)/g, '$1' )
		.replace( /[`*]/g, '' )
		.trim();
}

function section( body, heading, nextHeading ) {
	const pattern = new RegExp( `^## ${ heading }\\s*\\n([\\s\\S]*?)(?=^## ${ nextHeading }\\s*$)`, 'm' );
	return body.match( pattern )?.[ 1 ]?.trim() || '';
}

function parameterFields( body ) {
	const parameters = section( body, 'Parameters', 'Return behavior' );
	const fields = [];
	for ( const line of parameters.split( /\r?\n/ ) ) {
		const match = line.match( /^-\s+`([^`]+)`\s+\(`([^`]+)`[^)]*\)\s+[—-]\s+(.+)$/ );
		if ( ! match ) {
			continue;
		}
		fields.push( {
			name: match[ 1 ],
			type: match[ 2 ],
			required: true,
			defaultValue: '',
			description: plainText( match[ 3 ] ),
			values: '',
			deprecated: false,
		} );
	}
	if ( fields.length === 0 ) {
		fields.push( {
			name: 'parameters',
			type: 'none',
			required: false,
			defaultValue: '',
			description: 'This hook passes no callback parameters.',
			values: '',
			deprecated: false,
		} );
	}
	return fields;
}

function example( body ) {
	const exampleBody = section( body, 'Example', 'Compatibility and failure cautions' );
	const match = exampleBody.match( /```([A-Za-z0-9_+.-]*)\n([\s\S]*?)\n```/ );
	return {
		language: match?.[ 1 ] || 'text',
		code: match?.[ 2 ] || '// See the complete working example in the Example section below.',
	};
}

async function hookFiles() {
	const files = [];
	for ( const type of [ 'actions', 'filters' ] ) {
		for ( const entry of await fs.readdir( path.join( hooksRoot, type ) ) ) {
			if ( entry.endsWith( '.md' ) && entry !== 'index.md' ) {
				files.push( path.join( hooksRoot, type, entry ) );
			}
		}
	}
	return files.sort();
}

for ( const filename of await hookFiles() ) {
	const source = await fs.readFile( filename, 'utf8' );
	const clean = source.replace( generatedPattern, '' );
	const frontMatterMatch = clean.match( /^---\n([\s\S]*?)\n---\n/ );
	if ( ! frontMatterMatch ) {
		throw new Error( `${ filename } is missing front matter.` );
	}
	const data = parseDocument( frontMatterMatch[ 1 ] ).toJS();
	const body = clean.slice( frontMatterMatch[ 0 ].length );
	const sample = example( body );
	const filenameExtension = sample.language === 'php' ? 'php' : sample.language === 'js' || sample.language === 'javascript' ? 'js' : 'txt';
	const blocks = [
		safeBlock( 'docspress/fields', {
			title: `${ data.hook_name } callback parameters`,
			description: `The ${ data.hook_type } contract verified at the pinned source revision.`,
			fields: parameterFields( body ),
			searchable: true,
			compact: false,
		} ),
		safeBlock( 'docspress/colorful-code', {
			language: sample.language,
			filename: `${ data.hook_name }.${ filenameExtension }`,
			code: sample.code,
			highlightedLines: '',
			showLineNumbers: true,
			caption: `Minimal external ${ data.hook_type } callback`,
			diffMode: 'none',
			copyMode: 'all',
			annotations: [],
		} ),
		safeBlock( 'docspress/callout', {
			tone: 'warning',
			title: `Preserve the ${ data.hook_name } contract`,
			content: `<p>Register this callback outside Jetpack source, preserve earlier callback decisions, and follow the compatibility and failure cautions on this page. A source occurrence is not permission to depend on surrounding private implementation.</p>`,
			collapsible: false,
			open: true,
		} ),
		safeBlock( 'docspress/result', {
			status: 'success',
			title: `Source contract pinned for ${ data.hook_name }`,
			content: `<p>The classification, callback shape, example, and verification steps on this page are tied to an immutable public source permalink.</p>`,
			meta: `Since: ${ String( data.since ) } · Deprecated: ${ data.deprecated ? 'yes' : 'no' }`,
		} ),
	].join( '\n\n' );
	const insertion = `<!-- jetpack-docs:hook-blocks:start -->\n\n${ blocks }\n<!-- jetpack-docs:hook-blocks:end -->\n\n`;
	const output = `${ clean.slice( 0, frontMatterMatch[ 0 ].length ) }${ insertion }${ body }`;
	await fs.writeFile( filename, output );
}

console.log( `Enriched ${ ( await hookFiles() ).length } curated hook pages with DocsPress contract blocks.` );
