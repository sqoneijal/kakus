<?php

namespace Config\Routes;

use CodeIgniter\Config\BaseConfig;

class Login extends BaseConfig
{

   public function render($routes): void
   {
      $routes->group('login', function ($routes) {
         $this->defaultRoutes($routes);
      });
   }

   public function defaultRoutes($routes): void
   {
      $routes->get('/', 'Login::index');
      $routes->get('logout', 'Login::logout');
      $routes->get('init', 'Login::init');

      $routes->post('submit', 'Login::submit');
   }
}
