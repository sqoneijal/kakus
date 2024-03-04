<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\ControlPanel as Model;

class ControlPanel extends BaseController
{
   public function index(): void
   {
      $this->data = [
         'title' => 'Dashboard'
      ];

      $this->template($this->data);
   }

   public function getPenampungan(): object
   {
      $model = new Model();
      $content = $model->getDaftarPenampungan($this->getVar);
      return $this->respond($content);
   }
}
