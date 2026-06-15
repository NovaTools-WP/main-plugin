# NovaTools

NovaTools is a foundational host plugin designed to power a dynamic, React-based ecosystem of tools for WordPress. Its main purpose is to serve as the core framework and host environment for various addon plugins.

NovaTools provides a seamless administrative and frontend interface using React, allowing developers to easily register, inject, and display their addon components within a unified application layout.

## 🌟 Ecosystem

NovaTools currently powers the following addons:

- [NovaTools SEO](https://github.com/NovaTools-WP/seo-plugin)
- [NovaTools Polyglot](https://github.com/NovaTools-WP/polyglot-plugin)

## 🛠️ For Addon Developers

NovaTools is designed from the ground up to be extensible. Developing an addon requires two main steps: registering the route in PHP and registering the component in React.

### 1. Registering the Addon in PHP

Use the `novatools_admin_routes` filter to tell NovaTools about your addon. This ensures that NovaTools will enqueue your addon's scripts when the NovaTools interface loads.

```php
add_filter( 'novatools_admin_routes', function( $routes ) {
    $routes[] = array(
        'name'         => 'SEO Dashboard',
        'href'         => '#/seo',
        'icon'         => 'ChartBarIcon', // Uses Heroicons
        'current'      => false,
        'addonId'      => 'novatools_seo',
        'component'    => 'Dashboard',
        'scriptHandle' => 'novatools-seo-admin-script', // The handle you used to enqueue your JS
    );
    return $routes;
});
```

### 2. Registering the Component in React

In your addon's JavaScript (React) code, use the global registry to inject your component. NovaTools exposes `window.NovaToolsAddons` to handle this.

```javascript
// In your addon's source code
function DashboardComponent() {
    return (
        <div>
            <h1>SEO Dashboard</h1>
            <p>Welcome to the NovaTools SEO addon!</p>
        </div>
    );
}

// Ensure the registry exists (or import if you are within the NovaTools build process)
window.NovaToolsAddons = window.NovaToolsAddons || {};

// Register your component
if (!window.NovaToolsAddons['novatools_seo']) {
    window.NovaToolsAddons['novatools_seo'] = {};
}
window.NovaToolsAddons['novatools_seo']['Dashboard'] = DashboardComponent;
```

When NovaTools loads, it reads the registered routes from PHP, looks up the corresponding `addonId` and `component` name in `window.NovaToolsAddons`, and dynamically renders your React component inside its main layout!

---

## 💻 Internal Development Guide

If you are contributing to the core NovaTools plugin, the following sections describe the internal setup.

### Get Started

The plugin consists of two main components: the frontend/admin, built with React, and the backend, which communicates via an API.

```bash
cd wp-content/plugins
git clone git@github.com:NovaTools-WP/main-plugin.git novatools
cd novatools
composer install
npm install
```

### Add Shadcn UI

We use Shadcn UI for our React components.

```bash
npx shadcn@latest add accordion
```
It will install the component in the `src/components` folder.

### Structure

<details open>
  <summary><strong>📂 novatools</strong></summary>
  <ul>
    <li>
    <details>
    <summary><strong>📂 config</strong></summary>
    <summary>
      <ul>
        <li><summary><strong>📄 plugin.php</strong></summary></li>
      </ul>
    </summary>
    </details>
    </li>
    <li>
    <details>
    <summary><strong>📂 database</strong></summary>
    <summary>
      <ul>
        <li>
        <details>
        <summary><strong>📂 Migrations</strong></summary>
        </details>
        </li>
        <li>
        <details>
        <summary><strong>📂 Seeders</strong></summary>
        </details>
        </li>
      </ul>
    </summary>
    </details>
    </li>
    <li><details>
    <summary><strong>📂 includes</strong></summary>
    <ul>
      <li><summary><strong>📂 Admin</strong></summary></li>
      <li><summary><strong>📂 Controllers</strong></summary></li>
      <li><summary><strong>📂 Core</strong></summary></li>
      <li><summary><strong>📂 Frontend</strong></summary></li>
      <li><summary><strong>📂 Interfaces</strong></summary></li>
      <li><summary><strong>📂 Models</strong></summary></li>
      <li><summary><strong>📂 Routes</strong></summary></li>
      <li><summary><strong>📂 Traits</strong></summary></li>
      <li><summary><strong>📄 functions.php</strong></summary></li>
    </ul>
    </details>
    </li>
    <li><details>
    <summary><strong>📂 src</strong></summary>
    <ul>
      <li><summary><strong>📂 admin</strong></summary></li>
      <li><summary><strong>📂 frontend</strong></summary></li>
      <li><summary><strong>📂 components</strong></summary></li>
      <li><summary><strong>📂 lib</strong></summary></li>
      <li><summary><strong>📂 blocks</strong></summary></li>
    </ul>
    </details>
    </li>
    <li><summary><strong>📂 libs</strong></summary></li>
    <li><summary><strong>📂 views</strong></summary></li>
    <li><summary><strong>📂 vendor</strong></summary></li>
    <li><summary><strong> 📄 plugin.php</strong></summary></li>
    <li><summary><strong> 📄 uninstall.php</strong></summary></li>
    <li><summary><strong> 📄 novatools.php</strong></summary></li>
  </ul>
</details>

### API Route

Add your API route in `includes/Routes/Api.php`

```php
Route::get( $prefix, $endpoint, $callback, $auth = false );
Route::post( $prefix, $endpoint, $callback, $auth = false );

// Route grouping.
Route::prefix( $prefix, function( Route $route ) {
    $route->get( $endpoint, $callback, $auth = false );
    $route->post( $endpoint, $callback, $auth = false );
});

// Authentication.
Route::prefix( $prefix, function( Route $route ) 
    $route->post( $endpoint, $callback, $auth = false );
})->auth( 'AuthController@check' );
```
#### API Example
```php
// Get All posts
$route->get( '/posts/get', '\NovaTools\Controllers\Posts\Actions@get_all_posts' );

// Get Single Posts
$route->get( '/posts/get/{id}', '\NovaTools\Controllers\Posts\Actions@get_post' );
```

### ORM ( Object Relational Mapping )

If you are familiar with Laravel, you will find this ORM very familiar. It is a simple and easy-to-use ORM for WordPress.

You can find the ORM documentation [here](https://github.com/prappo/wp-eloquent)

Create your model in the `includes/Models` folder.

Example: `includes/Models/Posts.php`

```php
<?php

namespace NovaTools\Models;

use Prappo\WpEloquent\Database\Eloquent\Model;

class Posts extends Model {
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array( 'post_title', 'post_content' );
}

```

You can access all your posts like this:

```php
$posts = Posts::all();
```

### Passing data from backend to frontend

Pass your data to the array in the Asset file (e.g. `includes/Assets/Frontend.php` or `includes/Assets/Admin.php`).

And access data in React like this:

```javascript
// Usually available on window.novaTools (based on your Asset enqueue handle)
const myData = window.novaTools;
```

### Shortcode

You can create a shortcode by using the `Shortcode` class.

```php

/**
 * Example Usage
 * 
 * Registering a shortcode that renders a PHP view file
 */
Shortcode::add()
    ->tag('myshortcode')
    ->attrs(['id', 'name'])
    ->render( plugin_dir_path( __FILE__ ) . 'views/shortcode/myshortcode.php');

/**
 * Registering a shortcode that renders with a function
 */
Shortcode::add()
    ->tag('customshortcode')
    ->attrs(['title', 'class'])
    ->render(function($atts, $content) {
        return "<div class='{$atts['class']}'><h3>{$atts['title']}</h3><p>{$content}</p></div>";
    });
```

### Development Scripts

The available scripts in `package.json` are:

```bash
npm run dev           # Run all (frontend and admin)
npm run dev:frontend  # Run specifically for frontend
npm run dev:admin     # Run specifically for admin
npm run dev:server    # Run with server
```

### Build

```bash
npm run build
```

### Developing blocks

```bash
npm run block:start
npm run block:build
```

### Release

```bash
npm run release
```

It will create a release plugin in the `release` folder.

### Troubleshooting

If you are facing any issues with the development server:

1. If you are using Local WP, you might see the dev server is not working because of an SSL certificate issue or domain mismatch. You can fix this by changing your `Router mode` to `localhost`.
2. Sometimes you might see on the first run of the dev server that nothing is happening. You can try to run it again.
