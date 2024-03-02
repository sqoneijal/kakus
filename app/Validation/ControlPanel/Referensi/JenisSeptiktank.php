<?php

namespace App\Validation\ControlPanel\Referensi;

class JenisSeptiktank
{

   public function submit(): array
   {
      return [
         'nama' => [
            'label' => 'Nama jenis septiktank',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID jenis septiktank',
            'rules' => 'required|numeric|is_not_unique[tb_mst_jenis_septiktank.id,id]'
         ]
      ];
   }
}
