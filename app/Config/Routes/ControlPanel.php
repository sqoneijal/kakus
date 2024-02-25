<?php

namespace Config\Routes;

use CodeIgniter\Config\BaseConfig;

class ControlPanel extends BaseConfig
{

   public function render($routes): void
   {
      $routes->group('controlpanel', ['filter' => 'ControlPanel'], function ($routes) {
         $routes->get('/', 'ControlPanel::index');
         $routes->get('init', 'ControlPanel::init');
      });
   }
}
