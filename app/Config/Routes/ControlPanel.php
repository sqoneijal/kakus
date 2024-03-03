<?php

namespace Config\Routes;

use CodeIgniter\Config\BaseConfig;

class ControlPanel extends BaseConfig
{

   public function render($routes): void
   {
      $routes->get('/', 'ControlPanel::index');
      $routes->get('initpage', 'ControlPanel::initPage');

      $routes->group('/', ['filter' => 'ControlPanel'], function ($routes) {
         $this->profile($routes);
         $this->referensi($routes);
         $this->responden($routes);
         $this->penampungan($routes);
      });
   }

   private function penampungan($routes): void
   {
      $routes->group('penampungan', ['filter' => 'ControlPanel', 'namespace' => 'App\Controllers\ControlPanel'], function ($routes) {
         $routes->get('/', 'Penampungan::index');

         $routes->post('getdata', 'Penampungan::getData');
      });
   }

   private function responden($routes): void
   {
      $routes->group('responden', ['filter' => 'ControlPanel', 'namespace' => 'App\Controllers\ControlPanel'], function ($routes) {
         $routes->get('/', 'Responden::index');
         $routes->get('dummy', 'Responden::dummy');
         $routes->get('getdaftarprovinsi', 'Responden::getDaftarProvinsi');
         $routes->get('getdaftarkabkota', 'Responden::getDaftarKabkota');
         $routes->get('getdaftarkecamatan', 'Responden::getDaftarKecamatan');
         $routes->get('getdaftardesa', 'Responden::getDaftarDesa');
         $routes->get('initpenampungantinja', 'Responden::initPenampunganTinja');

         $routes->post('submit', 'Responden::submit');
         $routes->post('getdata', 'Responden::getData');
         $routes->post('hapus', 'Responden::hapus');
         $routes->post('getdetail', 'Responden::getDetail');
         $routes->post('submitvolumeseptiktank', 'Responden::submitVolumeSeptiktank');
         $routes->post('submitpenampungantinja', 'Responden::submitPenampunganTinja');
         $routes->post('hapuspenampungantinja', 'Responden::hapusPenampunganTinja');
      });
   }

   private function referensi($routes): void
   {
      $routes->group('referensi', ['filter' => 'ControlPanel', 'namespace' => 'App\Controllers\ControlPanel\Referensi'], function ($routes) {
         $this->referensiJenisSeptiktank($routes);
      });
   }

   private function referensiJenisSeptiktank($routes): void
   {
      $routes->group('jenisseptiktank', function ($routes) {
         $routes->get('/', 'JenisSeptiktank::index');

         $routes->post('submit', 'JenisSeptiktank::submit');
         $routes->post('hapus', 'JenisSeptiktank::hapus');
         $routes->post('getdata', 'JenisSeptiktank::getData');
      });
   }

   private function profile($routes): void
   {
      $routes->group('profile', ['filter' => 'ControlPanel', 'namespace' => 'App\Controllers\ControlPanel'], function ($routes) {
         $routes->get('/', 'Profile::index');

         $routes->post('gantifoto', 'Profile::gantiFoto');
         $routes->post('submit', 'Profile::submit');
         $routes->post('init', 'Profile::init');
      });
   }
}
