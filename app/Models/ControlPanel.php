<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class ControlPanel extends Common
{

   public function getDaftarPenampungan(array $post): array
   {
      $page = intval($post['page']);
      $limit = 10;
      $offset = $page * $limit;

      $table = $this->db->table('tb_responden tr');
      $table->select('tr.id, tr.nama_lengkap, tr.nik, tr.id_kepemilikan_rumah, tk.latitude, tk.longitude, tpt2.kala_penyedotan, tpt2.pembangunan, tpt2.harga_penyedotan, tpt2.tingkat_keamanan, tpt2.tanggal_penyedotan_terakhir, tpt2.tanggal_rencana_penyedotan, tvs.panjang, tvs.lebar, tvs.kedalaman, tvs.diameter_tabung, tmjs.nama as jenis_septiktank, tpt2.status, tpt2.keterangan as keterangan_penampungan');
      $table->join('tb_koordinat tk', 'tk.id = tr.id_koordinat', 'left');
      $table->join('(select id_responden, max(tanggal_penyedotan_terakhir) as tanggal_penyedotan_terakhir from tb_penampungan_tinja group by id_responden) tpt', 'tpt.id_responden = tr.id', 'left');
      $table->join('tb_penampungan_tinja tpt2', 'tpt2.id_responden = tr.id and tpt2.tanggal_penyedotan_terakhir = tpt.tanggal_penyedotan_terakhir', 'left');
      $table->join('tb_volume_septiktank tvs', 'tvs.id = tpt2.id_volume_septiktank', 'left');
      $table->join('tb_mst_jenis_septiktank tmjs', 'tmjs.id = tvs.id_jenis_septiktank', 'left');
      $table->where(new RawSql("extract(year from tpt2.tanggal_rencana_penyedotan) = extract(year from now())"));
      if (isset($post['cari'])) {
         $table->groupStart();
         $table->like('tr.nama_lengkap', $post['cari']);
         $table->orLike('tr.nik', $post['cari']);
         $table->orLike('tk.latitude', $post['cari']);
         $table->orLike('tk.longitude', $post['cari']);
         $table->groupEnd();
      }
      $table->limit($limit, $offset);

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
