<?php

namespace App\Controllers;

use App\Models\Login as Model;
use App\Validation\Login as Validate;

class Login extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'KAKUS'
      ];

      $this->template($this->data);
   }

   public function submit(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $agent = $this->request->getUserAgent();

         if ($agent->isBrowser()) {
            $currentAgent = $agent->getBrowser() . ' ' . $agent->getVersion();
         } elseif ($agent->isRobot()) {
            $currentAgent = $agent->getRobot();
         } elseif ($agent->isMobile()) {
            $currentAgent = $agent->getMobile();
         } else {
            $currentAgent = 'Unidentified User Agent';
         }

         $userAgent = [
            'currentAgent' => $currentAgent,
            'platform' => $agent->getPlatform()
         ];


         $model = new Model();
         $submit = $model->submit(array_merge($this->post, $userAgent, ['ipAddress' => $this->request->getIPAddress()]));

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function logout()
   {
      $session = \Config\Services::session();
      $session->destroy();
      return redirect()->to('/');
   }
}
