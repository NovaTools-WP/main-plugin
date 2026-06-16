<?php

namespace NovaTools\Core;

use NovaTools\Database\Migrations\Accounts;
use NovaTools\Database\Seeders\Accounts as SeedersAccounts;
use NovaTools\Traits\Base;

/**
 * This class is responsible for the functionality
 * which is required to set up after activating the plugin
 */
class Install {


	use Base;

	/**
	 * Initialize the class
	 *
	 * @return void
	 */
	public function init() {
		$this->install_tables();
		$this->insert_data();
	}

	/**
	 * Install the tables
	 *
	 * @return void
	 */
	private function install_tables() {
		Accounts::up();
	}

	/**
	 * Insert data to the tables
	 *
	 * @return void
	 */
	private function insert_data() {
		// Insert data to the tables.
		SeedersAccounts::run();
	}
}
