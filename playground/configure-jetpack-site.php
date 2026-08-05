<?php
/**
 * Apply the native Jetpack DocsPress design to a temporary Playground site.
 *
 * This file runs once during the Playground Blueprint. It saves ordinary
 * WordPress Global Styles and a template-part customization; it is not loaded
 * as a plugin or theme at runtime.
 *
 * @package JetpackDocs
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Stop the Blueprint when its native WordPress design cannot be installed.
 *
 * @param string $message Failure message.
 * @return never
 * @throws RuntimeException When native editor state cannot be configured.
 */
function jetpack_docs_design_failure( $message ) {
	throw new RuntimeException( $message );
}

/**
 * Find the Jetpack style variation bundled with the active DocsPress theme.
 *
 * @param WP_Theme $theme Active DocsPress theme.
 * @return array<string,mixed>
 */
function jetpack_docs_get_style_variation( $theme ) {
	$variation_path = $theme->get_stylesheet_directory() . '/styles/theme/jetpack.json';
	$variation_json = is_readable( $variation_path ) ? file_get_contents( $variation_path ) : false;
	if ( false === $variation_json ) {
		jetpack_docs_design_failure( 'The bundled Jetpack Global Style is unavailable.' );
	}

	$variation = json_decode( $variation_json, true );
	if ( ! is_array( $variation ) || JSON_ERROR_NONE !== json_last_error() ) {
		jetpack_docs_design_failure( 'The bundled Jetpack Global Style is not valid JSON.' );
	}

	$palette = $variation['settings']['color']['palette'] ?? array();
	$accent  = array_values(
		array_filter(
			$palette,
			static function ( $color ) {
				return 'accent' === ( $color['slug'] ?? '' );
			}
		)
	);
	if (
		'Jetpack' !== ( $variation['title'] ?? '' ) ||
		3 !== (int) ( $variation['version'] ?? 0 ) ||
		empty( $variation['settings'] ) ||
		empty( $variation['styles'] ) ||
		empty( $accent ) ||
		'#069e08' !== strtolower( (string) ( $accent[0]['color'] ?? '' ) )
	) {
		jetpack_docs_design_failure( 'The bundled Jetpack Global Style is invalid.' );
	}

	return $variation;
}

/**
 * Keep the Jetpack variation compatible with DocsPress's runtime color mode.
 *
 * DocsPress switches its semantic --dp-* color tokens when a visitor changes
 * color mode. The bundled Jetpack variation uses equivalent light-only preset
 * values in six semantic slots, so WordPress's generated Global Styles would
 * otherwise keep the document canvas and its typography light in dark mode.
 *
 * @param array<string,mixed> $variation Validated Jetpack style variation.
 * @return array<string,mixed>
 */
function jetpack_docs_enable_color_modes( $variation ) {
	$variation['styles']['color']['background']                    = 'var(--dp-paper)';
	$variation['styles']['color']['text']                          = 'var(--dp-copy)';
	$variation['styles']['elements']['caption']['color']['text']   = 'var(--dp-muted)';
	$variation['styles']['elements']['heading']['color']['text']   = 'var(--dp-ink)';
	$variation['styles']['elements']['link']['color']['text']      = 'var(--dp-blue-dark)';
	$variation['styles']['elements']['link'][':hover']['color']['text'] = 'var(--dp-blue)';

	return $variation;
}

/**
 * Save the upstream Jetpack variation as the active user Global Style.
 *
 * @param WP_Theme $theme Active DocsPress theme.
 * @return int Global Styles post ID.
 */
function jetpack_docs_apply_global_style( $theme ) {
	if ( ! class_exists( 'WP_Theme_JSON_Resolver' ) ) {
		jetpack_docs_design_failure( 'WordPress Global Styles are unavailable.' );
	}

	WP_Theme_JSON_Resolver::clean_cached_data();
	if ( function_exists( 'wp_clean_theme_json_cache' ) ) {
		wp_clean_theme_json_cache();
	}

	$variation = jetpack_docs_enable_color_modes( jetpack_docs_get_style_variation( $theme ) );
	$user_data = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( $theme, true );
	$post_id   = absint( $user_data['ID'] ?? 0 );

	if ( ! $post_id ) {
		jetpack_docs_design_failure( 'The Jetpack Global Styles post could not be created.' );
	}

	$payload = array(
		'version'                     => (int) $variation['version'],
		'isGlobalStylesUserThemeJSON' => true,
		'settings'                    => $variation['settings'],
		'styles'                      => $variation['styles'],
	);
	$result  = wp_update_post(
		array(
			'ID'           => $post_id,
			'post_content' => wp_slash( wp_json_encode( $payload, JSON_UNESCAPED_SLASHES ) ),
		),
		true
	);

	if ( is_wp_error( $result ) ) {
		jetpack_docs_design_failure( 'The Jetpack Global Style could not be saved.' );
	}
	$theme_terms = wp_set_object_terms( $post_id, 'docspress', 'wp_theme', false );
	if ( is_wp_error( $theme_terms ) ) {
		jetpack_docs_design_failure( 'The Jetpack Global Style theme assignment could not be saved.' );
	}

	WP_Theme_JSON_Resolver::clean_cached_data();
	if ( function_exists( 'wp_clean_theme_json_cache' ) ) {
		wp_clean_theme_json_cache();
	}

	return $post_id;
}

/**
 * Install the pinned public Jetpack logo as the native Site Logo.
 *
 * @return int Attachment ID.
 */
function jetpack_docs_install_site_logo() {
	$source_path = ABSPATH . 'jetpack-docs-logo.png';
	$source_ref  = 'a6e65435e2531e430c75024f1183612f31263d1f';
	$source_hash = 'b0b13407f513b3ff48c43c894e4bea550dc4e98dfb59c4f43f28d21c98b42962';

	if ( ! is_readable( $source_path ) || $source_hash !== hash_file( 'sha256', $source_path ) ) {
		jetpack_docs_design_failure( 'The pinned Jetpack Site Logo is unavailable or invalid.' );
	}

	$existing = get_posts(
		array(
			'fields'         => 'ids',
			'meta_key'       => '_jetpack_docs_logo_source_ref',
			'meta_value'     => $source_ref,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'posts_per_page' => 1,
		)
	);
	$logo_id  = $existing ? absint( $existing[0] ) : 0;

	if ( ! $logo_id || ! wp_attachment_is_image( $logo_id ) ) {
		$image = file_get_contents( $source_path );
		if ( false === $image ) {
			jetpack_docs_design_failure( 'The pinned Jetpack Site Logo could not be read.' );
		}

		$upload = wp_upload_bits( 'jetpack-logo.png', null, $image );
		if ( ! empty( $upload['error'] ) ) {
			jetpack_docs_design_failure( 'The Jetpack Site Logo could not be uploaded.' );
		}

		$filetype = wp_check_filetype( $upload['file'], null );
		$logo_id  = wp_insert_attachment(
			array(
				'guid'           => $upload['url'],
				'post_mime_type' => $filetype['type'],
				'post_status'    => 'inherit',
				'post_title'     => 'Jetpack logo',
			),
			$upload['file'],
			0,
			true
		);

		if ( is_wp_error( $logo_id ) ) {
			jetpack_docs_design_failure( 'The Jetpack Site Logo attachment could not be created.' );
		}

		require_once ABSPATH . 'wp-admin/includes/image.php';
		$metadata = wp_generate_attachment_metadata( $logo_id, $upload['file'] );
		if ( $metadata ) {
			wp_update_attachment_metadata( $logo_id, $metadata );
		}
		update_post_meta( $logo_id, '_wp_attachment_image_alt', 'Jetpack' );
		update_post_meta( $logo_id, '_jetpack_docs_logo_source_ref', $source_ref );
		update_post_meta( $logo_id, '_jetpack_docs_logo_source_sha256', $source_hash );
	}

	update_option( 'site_logo', $logo_id );
	update_option( 'site_icon', $logo_id );
	update_option( 'docspress_default_site_logo_seeded', $logo_id );

	return $logo_id;
}

/**
 * Return the Jetpack documentation header as native block markup.
 *
 * @return string
 */
function jetpack_docs_header_content() {
	return <<<'HTML'
<!-- wp:group {"align":"full","backgroundColor":"header-surface","style":{"typography":{"fontSize":"16px","lineHeight":"1.65"}},"className":"site-header","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull site-header has-header-surface-background-color has-background" style="font-size:16px;line-height:1.65">
	<!-- wp:group {"align":"wide","className":"header-inner","layout":{"type":"flex","flexWrap":"nowrap"}} -->
	<div class="wp-block-group alignwide header-inner">
		<!-- wp:group {"style":{"typography":{"fontSize":"17px","fontWeight":"700","letterSpacing":"-0.025em","lineHeight":"1.65"}},"className":"brand","layout":{"type":"flex","flexWrap":"nowrap"}} -->
		<div class="wp-block-group brand" style="font-size:17px;font-weight:700;letter-spacing:-0.025em;line-height:1.65">
			<!-- wp:site-logo {"width":34,"shouldSyncIcon":true,"className":"brand-mark"} /-->
			<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","letterSpacing":"-0.035em","lineHeight":"1.65"}},"className":"brand-title"} -->
			<p class="brand-title" style="font-weight:700;letter-spacing:-0.035em;line-height:1.65"><a href="/docs/"><strong>Jetpack</strong> Developer Docs</a></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:navigation {"overlayMenu":"mobile","style":{"typography":{"fontSize":"14px","fontWeight":"650","lineHeight":"1.65"}},"className":"primary-navigation","layout":{"type":"flex"}} -->
			<!-- wp:navigation-link {"label":"Docs","url":"/docs/","kind":"custom","isTopLevelLink":true} /-->
		<!-- /wp:navigation -->

		<!-- wp:group {"className":"header-actions","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
		<div class="wp-block-group header-actions">
			<!-- wp:docspress/command-search /-->
			<!-- wp:docspress/color-mode-toggle /-->
			<!-- wp:social-links {"openInNewTab":true,"showLabels":false,"size":"has-small-icon-size","className":"is-style-logos-only repository-link"} -->
			<ul class="wp-block-social-links has-small-icon-size is-style-logos-only repository-link">
				<!-- wp:social-link {"url":"https://github.com/f/jetpack-docs","service":"github"} /-->
			</ul>
			<!-- /wp:social-links -->
			<!-- wp:docspress/docs-menu-toggle /-->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
HTML;
}

/**
 * Create an editable Header template part without overwriting later edits.
 *
 * @return int Template-part post ID.
 */
function jetpack_docs_install_header() {
	$existing = get_posts(
		array(
			'fields'         => 'ids',
			'name'           => 'header',
			'post_status'    => array( 'publish', 'draft', 'auto-draft' ),
			'post_type'      => 'wp_template_part',
			'posts_per_page' => 1,
			'tax_query'      => array(
				array(
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => 'docspress',
				),
			),
		)
	);
	$post_id  = $existing ? absint( $existing[0] ) : 0;
	$seeded   = $post_id && get_post_meta( $post_id, '_jetpack_docs_header_seeded', true );

	if ( ! $seeded ) {
		$post = array(
			'post_content' => wp_slash( jetpack_docs_header_content() ),
			'post_name'    => 'header',
			'post_status'  => 'publish',
			'post_title'   => 'Header',
			'post_type'    => 'wp_template_part',
			'meta_input'   => array(
				'origin' => 'theme',
			),
		);
		if ( $post_id ) {
			$post['ID'] = $post_id;
		}

		$post_id = wp_insert_post( $post, true );
		if ( is_wp_error( $post_id ) ) {
			jetpack_docs_design_failure( 'The Jetpack Header template part could not be saved.' );
		}

		update_post_meta( $post_id, '_jetpack_docs_header_seeded', '1' );
	}

	$theme_terms = wp_set_object_terms( $post_id, 'docspress', 'wp_theme', false );
	$area_terms  = wp_set_object_terms( $post_id, 'header', 'wp_template_part_area', false );
	if ( is_wp_error( $theme_terms ) || is_wp_error( $area_terms ) ) {
		jetpack_docs_design_failure( 'The Jetpack Header template-part terms could not be saved.' );
	}
	update_post_meta( $post_id, 'origin', 'theme' );

	return $post_id;
}

/**
 * Apply the complete native Jetpack design seed.
 */
function jetpack_docs_configure_site() {
	$theme = wp_get_theme( 'docspress' );
	if ( ! $theme->exists() || 'DocsPress' !== $theme->get( 'Name' ) || 'docspress' !== get_option( 'stylesheet' ) ) {
		jetpack_docs_design_failure( 'The pinned DocsPress theme is not active.' );
	}

	$administrators = get_users(
		array(
			'fields'   => 'ids',
			'number'   => 1,
			'role'     => 'administrator',
			'orderby'  => 'ID',
			'order'    => 'ASC',
		)
	);
	if ( empty( $administrators ) ) {
		jetpack_docs_design_failure( 'A WordPress administrator is required to configure Jetpack Docs.' );
	}
	wp_set_current_user( absint( $administrators[0] ) );

	$style_id  = jetpack_docs_apply_global_style( $theme );
	$logo_id   = jetpack_docs_install_site_logo();
	$header_id = jetpack_docs_install_header();

	update_option( 'blogname', 'Jetpack Developer Docs' );
	update_option( 'blogdescription', 'Use, extend, and contribute to Jetpack.' );
	update_option(
		'jetpack_docs_design',
		array(
			'version'                 => 1,
			'global_style'            => 'Jetpack',
			'global_styles_post_id'   => $style_id,
			'header_template_part_id' => $header_id,
			'site_logo_id'            => $logo_id,
		)
	);
}
