<?php
/**
 * Plugin Name: NovaTools - The Ultimate React-based Addon Framework
 * Description: Empower your WordPress experience with NovaTools, the robust, React-powered foundational framework designed to seamlessly host, manage, and display dynamic addon plugins in a unified interface.
 * Author: NovaTools
 * Author URI: https://novatools.ww0.dev
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

/**
 * Intercept deactivation to ensure addon plugins are deactivated first.
 */
add_action( 'deactivate_plugin', 'novatools_prevent_deactivation_check', 10, 2 );
function novatools_prevent_deactivation_check( $plugin, $silent ) {
	if ( $plugin === plugin_basename( __FILE__ ) ) {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$active_addons = array();
		if ( is_plugin_active( 'novatools-polyglot/novatools-polyglot.php' ) ) {
			$active_addons[] = 'NovaTools - Polyglot';
		}
		if ( is_plugin_active( 'novatools-seo/novatools-seo.php' ) ) {
			$active_addons[] = 'NovaTools - SEO';
		}

		if ( ! empty( $active_addons ) ) {
			wp_die(
				sprintf(
					esc_html__( 'NovaTools cannot be deactivated while the following addons are active: %s. Please deactivate the addons first.', 'novatools' ),
					implode( ', ', $active_addons )
				),
				esc_html__( 'Plugin Dependency Error', 'novatools' ),
				array( 'back_link' => true )
			);
		}
	}
}

/**
 * Add settings link to the plugin action links.
 */
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'novatools_add_settings_link' );
function novatools_add_settings_link( $links ) {
	$settings_link = sprintf(
		'<a href="%s">%s</a>',
		admin_url( 'admin.php?page=novatools' ),
		esc_html__( 'Settings', 'novatools' )
	);
	array_unshift( $links, $settings_link );
	return $links;
}


