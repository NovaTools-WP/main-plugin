<?php

declare(strict_types=1);

namespace NovaTools\Assets;

use NovaTools\Core\Template;
use NovaTools\Traits\Base;
use NovaTools\Libs\Assets;

/**
 * Class Admin
 *
 * Handles admin functionalities for the NovaTools.
 *
 * @package NovaTools\Admin
 */
class Admin {

	use Base;

	/**
	 * Script handle for NovaTools.
	 */
	const HANDLE = 'novatools';

	/**
	 * JS Object name for NovaTools.
	 */
	const OBJ_NAME = 'novaTools';

	/**
	 * Development script path for NovaTools.
	 */
	const DEV_SCRIPT = 'src/admin/main.jsx';

	/**
	 * List of allowed screens for script enqueue.
	 *
	 * @var array
	 */
	private $allowed_screens = array(
		'toplevel_page_novatools',
	);

	/**
	 * Frontend bootstrapper.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_script' ) );
	}

	/**
	 * Enqueue script based on the current screen.
	 *
	 * @param string $screen The current screen.
	 */
	public function enqueue_script( $screen ) {
		$current_screen     = $screen;
		$template_file_name = Template::FRONTEND_TEMPLATE;

		if ( ! is_admin() ) {
			$template_slug = get_page_template_slug();
			if ( $template_slug ) {

				if ( $template_slug === $template_file_name ) {
					array_push( $this->allowed_screens, $template_file_name );
					$current_screen = $template_file_name;
				}
			}
		}

		if ( in_array( $current_screen, $this->allowed_screens, true ) ) {
			Assets\enqueue_asset(
				NOVATOOLS_DIR . '/assets/admin/dist',
				self::DEV_SCRIPT,
				$this->get_config()
			);
			$this->enqueue_addon_scripts();
			wp_localize_script( self::HANDLE, self::OBJ_NAME, $this->get_data() );
		}
	}

	/**
	 * Get the script configuration.
	 *
	 * @return array The script configuration.
	 */
	public function get_config() {
		return array(
			'dependencies' => array( 'react', 'react-dom' ),
			'handle'       => self::HANDLE,
			'in-footer'    => true,
		);
	}

	/**
	 * Get data for script localization.
	 *
	 * @return array The localized script data.
	 */
	public function get_data() {

		return array(
			'developer'    => 'prappo',
			'isAdmin'      => is_admin(),
			'apiUrl'       => rest_url(),
			'userInfo'     => $this->get_user_data(),
			'addonRoutes'  => $this->get_registered_routes(),
			'addons'       => $this->get_addons_data(),
		);
	}

	/**
	 * Get addons status and details.
	 *
	 * @return array Array of addons.
	 */
	public function get_addons_data() {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$addons = array(
			array(
				'id'          => 'novatools-polyglot',
				'name'        => 'NovaTools Polyglot',
				'path'        => 'novatools-polyglot/novatools-polyglot.php',
				'description' => esc_html__( 'Translate pages, posts, custom post types, menus, and theme strings with an intuitive interface. Features modern UI, WPML translation compatibility shim, and robust WP-CLI command integration.', 'novatools' ),
				'icon'        => 'Globe',
				'version'     => '1.0.0',
				'settingsPath'=> '/polyglot',
				'features'    => array(
					esc_html__( 'Multi-language management', 'novatools' ),
					esc_html__( 'Translation workflow for posts and pages', 'novatools' ),
					esc_html__( 'String translation support', 'novatools' ),
					esc_html__( 'WPML translation compatibility API', 'novatools' ),
					esc_html__( 'WP-CLI automation commands', 'novatools' ),
				),
			),
			array(
				'id'          => 'novatools-seo',
				'name'        => 'NovaTools SEO',
				'path'        => 'novatools-seo/novatools-seo.php',
				'description' => esc_html__( 'Boost your search rankings with ease. Build XML sitemaps, manage redirects, control social media sharing, optimize local and WooCommerce SEO, and use geo-targeting utilities.', 'novatools' ),
				'icon'        => 'Search',
				'version'     => '1.0.1',
				'settingsPath'=> '/seo',
				'features'    => array(
					esc_html__( 'XML Sitemap generation', 'novatools' ),
					esc_html__( 'Advanced redirect management', 'novatools' ),
					esc_html__( 'Social media meta tags control', 'novatools' ),
					esc_html__( 'Local SEO optimization', 'novatools' ),
					esc_html__( 'WooCommerce product SEO features', 'novatools' ),
					esc_html__( 'Geo-targeting capabilities', 'novatools' ),
				),
			),
		);

		$result = array();
		foreach ( $addons as $addon ) {
			$path = $addon['path'];
			$installed = file_exists( WP_PLUGIN_DIR . '/' . $path );
			$active = $installed && is_plugin_active( $path );

			$status = 'not_installed';
			if ( $active ) {
				$status = 'active';
			} elseif ( $installed ) {
				$status = 'inactive';
			}

			// Read version dynamically if installed
			$version = $addon['version'];
			if ( $installed ) {
				if ( ! function_exists( 'get_plugin_data' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}
				$plugin_data = get_plugin_data( WP_PLUGIN_DIR . '/' . $path );
				if ( ! empty( $plugin_data['Version'] ) ) {
					$version = $plugin_data['Version'];
				}
			}

			$addon['status'] = $status;
			$addon['version'] = $version;
			$addon['activateUrl'] = $installed ? wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=' . urlencode( $path ) . '&_wp_http_referer=' . urlencode( admin_url( 'admin.php?page=novatools' ) ) ), 'activate-plugin_' . $path ) : '';
			$addon['deactivateUrl'] = $active ? wp_nonce_url( admin_url( 'plugins.php?action=deactivate&plugin=' . urlencode( $path ) . '&_wp_http_referer=' . urlencode( admin_url( 'admin.php?page=novatools' ) ) ), 'deactivate-plugin_' . $path ) : '';
			$addon['installUrl'] = admin_url( 'plugin-install.php' );

			$result[] = $addon;
		}

		return $result;
	}

	/**
	 * Get registered add-on routes.
	 *
	 * @return array Array of add-on route definitions.
	 */
	public function get_registered_routes() {
		return apply_filters( 'novatools_admin_routes', array() );
	}

	/**
	 * Enqueue add-on scripts based on registered routes.
	 *
	 * @return void
	 */
	private function enqueue_addon_scripts() {
		$routes   = $this->get_registered_routes();
		$enqueued = array();

		foreach ( $routes as $route ) {
			$handle = $route['scriptHandle'] ?? '';
			if ( $handle && ! in_array( $handle, $enqueued, true ) ) {
				wp_enqueue_script( $handle );
				$enqueued[] = $handle;
			}
		}
	}

	/**
	 * Get user data for script localization.
	 *
	 * @return array The user data.
	 */
	private function get_user_data() {
		$username   = '';
		$avatar_url = '';

		if ( is_user_logged_in() ) {
			// Get current user's data .
			$current_user = wp_get_current_user();

			// Get username.
			$username = $current_user->user_login; // or use user_nicename, display_name, etc.

			// Get avatar URL.
			$avatar_url = get_avatar_url( $current_user->ID );
		}

		return array(
			'username' => $username,
			'avatar'   => $avatar_url,
		);
	}
}
