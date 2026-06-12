<?php
/**
 * NovaTools Routes
 *
 * Defines and registers custom API routes for the NovaTools using the Haruncpi\WpApi library.
 *
 * @package NovaTools\Routes
 */

namespace NovaTools\Routes;

use NovaTools\Libs\API\Route;

Route::prefix(
	NOVATOOLS_ROUTE_PREFIX,
	function ( Route $route ) {

		// Define accounts API routes.

		$route->post( '/accounts/create', '\NovaTools\Controllers\Accounts\Actions@create' );
		$route->get( '/accounts/get', '\NovaTools\Controllers\Accounts\Actions@get' );
		$route->post( '/accounts/delete', '\NovaTools\Controllers\Accounts\Actions@delete' );
		$route->post( '/accounts/update', '\NovaTools\Controllers\Accounts\Actions@update' );

		// Posts routes.
		$route->get( '/posts/get', '\NovaTools\Controllers\Posts\Actions@get_all_posts' );
		$route->get( '/posts/get/{id}', '\NovaTools\Controllers\Posts\Actions@get_post' );
		// Allow hooks to add more custom API routes.
		do_action( 'novatools_api', $route );
	}
)->auth( function() {
	return current_user_can( 'manage_options' );
});
