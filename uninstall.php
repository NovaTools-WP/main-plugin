<?php
/**
 * Uninstall the plugin
 *
 * @package NovaTools
 * @subpackage Database
 */

use NovaTools\Database\Migrations\Accounts;

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

require_once __DIR__ . '/vendor/autoload.php';

// delete tables from database which is created by this plugin.
Accounts::down();
