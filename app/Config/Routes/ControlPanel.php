<?php

namespace Config\Routes;

use CodeIgniter\Config\BaseConfig;

class ControlPanel extends BaseConfig
{

   public function render($routes): void
   {
      $routes->group('/', ['filter' => 'ControlPanel'], function ($routes) {
         $routes->get('/', 'ControlPanel::index');

         $this->profile($routes);
      });
   }

   private function profile($routes): void
   {
      $routes->group('profile', ['namespace' => 'App\Controllers\ControlPanel'], function ($routes) {
         $routes->get('/', 'Profile::index');

         $routes->post('gantifoto', 'Profile::gantiFoto');
         $routes->post('submit', 'Profile::submit');
         $routes->post('init', 'Profile::init');
      });
   }
}
