<?php

namespace Config\Routes;

use CodeIgniter\Config\BaseConfig;

class Login extends BaseConfig
{

   public function render($routes): void
   {
      $this->defaultRoutes($routes);
      $this->alternative($routes);
   }

   public function alternative($routes): void
   {
      $routes->group('login', function ($routes) {
         $this->defaultRoutes($routes);
      });
   }

   public function defaultRoutes($routes): void
   {
      $routes->get('/', 'Login::index');

      $routes->post('submit', 'Login::submit');
   }
}
