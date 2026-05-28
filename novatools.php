<?php
/**
 * Plugin Name: NovaTools
 * Description: A collection of tools for WordPress.
 * Author: 
 * Author URI: 
 * License: GPLv2
 * Version: 1.0.0
 * Text Domain: novatools
 * Domain Path: /languages
 *
 * @package NovaTools
 */

use NovaTools\Core\Install;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
require_once plugin_dir_path( __FILE__ ) . 'plugin.php';

/**
 * Initializes the NovaTools plugin when plugins are loaded.
 *
 * @since 1.0.0
 * @return void
 */
function novatools_init() {
	NovaTools::get_instance()->init();
}

// Hook for plugin initialization.
add_action( 'plugins_loaded', 'novatools_init' );

// Hook for plugin activation.
register_activation_hook( __FILE__, array( Install::get_instance(), 'init' ) );
