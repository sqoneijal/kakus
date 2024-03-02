<?php

namespace App\Controllers\ControlPanel;

use App\Controllers\BaseController;
use App\Models\ControlPanel\Responden as Model;
use App\Validation\ControlPanel\Responden as Validate;

class Responden extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Responden'
      ];

      $this->template($this->data);
   }

   public function hapusPenampunganTinja(): object
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->hapusPenampunganTinja())) {
         $model = new Model();
         $submit = $model->hapusPenampunganTinja($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->respond($response);
   }

   public function submitPenampunganTinja(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitPenampunganTinja())) {
         $model = new Model();
         $submit = $model->submitPenampunganTinja($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function submitVolumeSeptiktank(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitVolumeSeptiktank())) {
         $model = new Model();
         $submit = $model->submitVolumeSeptiktank($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function initPenampunganTinja(): object
   {
      $model = new Model();
      $content = [
         'daftarJenisSeptiktank' => $model->getDaftarJenisSeptiktank(),
      ];
      return $this->respond($content);
   }

   public function getDetail(): object
   {
      $model = new Model();
      $content = $model->getDetailResponden($this->post['id_responden']);
      return $this->respond($content);
   }

   public function getDaftarDesa(): object
   {
      $model = new Model();
      $content = $model->getDaftarDesa($this->getVar);
      return $this->respond($content);
   }

   public function getDaftarKecamatan(): object
   {
      $model = new Model();
      $content = $model->getDaftarKecamatan($this->getVar);
      return $this->respond($content);
   }

   public function getDaftarKabkota(): object
   {
      $model = new Model();
      $content = $model->getDaftarKabkota($this->getVar);
      return $this->respond($content);
   }

   public function getDaftarProvinsi(): object
   {
      $model = new Model();
      $content = $model->getDaftarProvinsi();
      return $this->respond($content);
   }

   public function submit(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $submit = $model->submit($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function hapus(): object
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $model->hapus($this->post);

         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->respond($response);
   }

   public function getData(): object
   {
      $model = new Model();
      $query = $model->getData($this->getVar);

      $output = [
         'draw' => intval(@$this->post['draw']),
         'recordsTotal' => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data' => $query
      ];
      return $this->respond($output);
   }
}
