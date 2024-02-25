<?php

namespace App\Controllers\ControlPanel;

use App\Controllers\BaseController;
use App\Models\ControlPanel\Profile as Model;
use App\Validation\ControlPanel\Profile as Validate;

class Profile extends BaseController
{

   public function index(): void
   {
      $this->data = [
         'title' => 'Profile'
      ];

      $this->template($this->data);
   }

   public function init(): object
   {
      $model = new Model();
      $content = $model->initProfile($this->post);
      return $this->respond($content);
   }

   public function gantiFoto(): object
   {
      try {
         $file = $this->request->getFile('file');
         if ($file) {
            $doUpload = doUpload($file, ['png', 'jpg', 'jpeg', 'svg']);

            if ($doUpload['status']) {
               $this->post['avatar'] = $doUpload['content'];

               $model = new Model();
               $model->gantiFoto($this->post);

               $response = ['status' => true, 'content' => $doUpload['content'], 'msg_response' => 'Foto berhasil diperbaharui.'];
            } else {
               $response = ['status' => false, 'msg_response' => $doUpload['content']];
            }
         } else {
            $response = ['status' => false, 'msg_response' => 'Tolong pilih foto terlebih dahulu.'];
         }
      } catch (\Exception $e) {
         $response = ['status' => false, 'msg_response' => $e->getMessage()];
      }
      return $this->respond($response);
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
}
