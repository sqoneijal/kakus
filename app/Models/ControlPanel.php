<?php

namespace App\Models;

class ControlPanel extends Common
{

   public function initPage(): array
   {
      $table = $this->db->table('tb_responden tr');
      $table->select('tr.nama_lengkap, tr.nik, tk.latitude, tk.longitude, tvs.panjang, tvs.lebar, tvs.kedalaman, tvs.diameter_tabung, tvs.id_jenis_septiktank, tmjs.nama as jenis_septiktank');
      $table->join('tb_koordinat tk', 'tk.id = tr.id_koordinat');
      $table->join('tb_volume_septiktank tvs', 'tvs.id_responden = tr.id', 'left');
      $table->join('tb_mst_jenis_septiktank tmjs', 'tmjs.id = tvs.id_jenis_septiktank', 'left');

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }
}
