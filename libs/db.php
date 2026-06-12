<?php
/**
 * Database configuration using Eloquent ORM.
 *
 * @package WordPress_Plugin_Boilerplate
 * @subpackage Database
 * @since 1.0.0
 */

namespace NovaTools\Libs\DatabaseConnection;

global $wpdb;
if ( isset( $wpdb ) ) {
	$original_charset = $wpdb->charset;
	$original_collate = $wpdb->collate;

	if ( empty( $wpdb->charset ) ) {
		$wpdb->charset = 'utf8mb4';
	}
	if ( empty( $wpdb->collate ) ) {
		$wpdb->collate = 'utf8mb4_unicode_ci';
	}

	\Prappo\WpEloquent\Application::bootWp();

	$wpdb->charset = $original_charset;
	$wpdb->collate = $original_collate;
} else {
	\Prappo\WpEloquent\Application::bootWp();
}

