<?php

namespace NovaTools\Core;

use NovaTools\Traits\Base;
use NovaTools\Libs\API\Config;

/**
 * Class API
 *
 * Initializes and configures the API for the NovaTools.
 *
 * @package NovaTools\Core
 */
class API {

	use Base;

	/**
	 * Initializes the API for the NovaTools.
	 *
	 * @return void
	 */
	public function init() {
		Config::set_route_file( NOVATOOLS_DIR . '/includes/Routes/Api.php' )
			->set_namespace( 'NovaTools\Api' )
			->init();
	}
}
