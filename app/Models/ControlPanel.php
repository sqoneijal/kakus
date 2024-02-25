<?php

namespace App\Models;

class ControlPanel extends Common
{
   public function initSession(): array
   {
      try {
         $session = \Config\Services::session();
         $dataUsers = $this->getDataUsers($session->get());

         if ($dataUsers['status']) {
            return array_merge($dataUsers['content'], ['status' => true]);
         } else {
            return ['status' => false, 'msg_response' => $dataUsers['msg_response']];
         }
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }
}
