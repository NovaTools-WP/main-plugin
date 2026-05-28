<?php
use NovaTools\Core\Api;
use NovaTools\Admin\Menu;
use NovaTools\Core\Template;
use NovaTools\Assets\Frontend;
use NovaTools\Assets\Admin;
use NovaTools\Traits\Base;

defined( 'ABSPATH' ) || exit;

/**
 * Class NovaTools
 *
 * The main class for the Coldmailar plugin, responsible for initialization and setup.
 *
 * @since 1.0.0
 */
final class NovaTools {

	use Base;

	/**
	 * Class constructor to set up constants for the plugin.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __construct() {
		define( 'NOVATOOLS_VERSION', '1.0.0' );
		define( 'NOVATOOLS_PLUGIN_FILE', __FILE__ );
		define( 'NOVATOOLS_DIR', plugin_dir_path( __FILE__ ) );
		define( 'NOVATOOLS_URL', plugin_dir_url( __FILE__ ) );
		define( 'NOVATOOLS_ASSETS_URL', NOVATOOLS_URL . '/assets' );
		define( 'NOVATOOLS_ROUTE_PREFIX', 'novatools/v1' );
	}

	/**
	 * Main execution point where the plugin will fire up.
	 *
	 * Initializes necessary components for both admin and frontend.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function init() {
		if ( is_admin() ) {
			Menu::get_instance()->init();
			Admin::get_instance()->bootstrap();
		}

		// Initialze core functionalities.
		Frontend::get_instance()->bootstrap();
		API::get_instance()->init();
		Template::get_instance()->init();

		add_action( 'init', array( $this, 'i18n' ) );
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	public function register_blocks() {
		register_block_type( __DIR__ . '/assets/blocks/block-1' );
	}


	/**
	 * Internationalization setup for language translations.
	 *
	 * Loads the plugin text domain for localization.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function i18n() {
		load_plugin_textdomain( 'novatools', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}
}
