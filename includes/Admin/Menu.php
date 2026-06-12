<?php

namespace NovaTools\Admin;

use NovaTools\Traits\Base;

/**
 * Class Menu
 *
 * Represents the admin menu management for the NovaTools plugin.
 *
 * @package NovaTools\Admin
 */
class Menu {

	use Base;

	/**
	 * Parent slug for the menu.
	 *
	 * @var string
	 */
	private $parent_slug = 'novatools';

	/**
	 * Initializes the admin menu.
	 *
	 * @return void
	 */
	public function init() {
		// Hook the function to the admin menu.
		add_action( 'admin_menu', array( $this, 'menu' ) );
	}

	/**
	 * Adds a menu to the WordPress admin dashboard.
	 *
	 * @return void
	 */
	public function menu() {

		add_menu_page(
			esc_html__( 'NovaTools', 'novatools' ),
			esc_html__( 'NovaTools', 'novatools' ),
			'manage_options',
			$this->parent_slug,
			array( $this, 'admin_page' ),
			'dashicons-email',
			3
		);

		// Default submenu: parent page only (no core tabs).
		$submenu_pages = array(
			array(
				'parent_slug' => $this->parent_slug,
				'page_title'  => esc_html__( 'NovaTools', 'novatools' ),
				'menu_title'  => esc_html__( 'NovaTools', 'novatools' ),
				'capability'  => 'manage_options',
				'menu_slug'   => $this->parent_slug,
				'function'    => array( $this, 'admin_page' ),
			),
		);

		// Add-on plugins register their submenu pages via this filter.
		$plugin_submenu_pages = apply_filters( 'novatools_submenu_pages', $submenu_pages );

		foreach ( $plugin_submenu_pages as $submenu ) {

			add_submenu_page(
				$submenu['parent_slug'],
				$submenu['page_title'],
				$submenu['menu_title'],
				$submenu['capability'],
				$submenu['menu_slug'],
				$submenu['function']
			);
		}
	}

	/**
	 * Callback function for the main "MyPlugin" menu page.
	 *
	 * @return void
	 */
	public function admin_page() {
		?>
		<div id="novatools" class="novatools-app"></div>
		<?php
	}
}
