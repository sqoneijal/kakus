<?php

namespace App\Models\ControlPanel;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Penampungan extends Common
{

   public function getPeta(array $post): array
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
      $table->where(new RawSql("extract(year from tpt2.tanggal_rencana_penyedotan) = '" . $post['tahun'] . "'"));
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

   public function submit(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $fields = [];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         }
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   public function getData(array $post): array
   {
      try {
         $table = $this->queryData($post);
         $table->limit((int) $post['length'], (int) $post['start']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();

         $get->freeResult();

         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = ($val[$field] ? trim($val[$field]) : '');
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function countData(array $post): int
   {
      $table = $this->db->table('tb_responden tr');
      $table->join('(select id_responden, max(tanggal_penyedotan_terakhir) as tanggal_penyedotan_terakhir from tb_penampungan_tinja group by id_responden) tpt', 'tpt.id_responden = tr.id', 'left');
      $table->join('tb_penampungan_tinja tpt2', 'tpt2.id_responden = tr.id and tpt2.tanggal_penyedotan_terakhir = tpt.tanggal_penyedotan_terakhir', 'left');
      $table->where(new RawSql("extract(year from tpt2.tanggal_rencana_penyedotan) = '" . $post['tahun'] . "'"));
      return $table->countAllResults();
   }

   public function filteredData(array $post): int
   {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData(array $post): object
   {
      $table = $this->db->table('tb_responden tr');
      $table->select('tr.id, tr.nama_lengkap, tr.nik, tr.id_kepemilikan_rumah, tk.latitude, tk.longitude, tpt2.kala_penyedotan, tpt2.pembangunan, tpt2.harga_penyedotan, tpt2.tingkat_keamanan, tpt2.tanggal_penyedotan_terakhir, tpt2.tanggal_rencana_penyedotan, tvs.panjang, tvs.lebar, tvs.kedalaman, tvs.diameter_tabung, tmjs.nama as jenis_septiktank, tpt2.status, tpt2.keterangan as keterangan_penampungan');
      $table->join('tb_koordinat tk', 'tk.id = tr.id_koordinat', 'left');
      $table->join('(select id_responden, max(tanggal_penyedotan_terakhir) as tanggal_penyedotan_terakhir from tb_penampungan_tinja group by id_responden) tpt', 'tpt.id_responden = tr.id', 'left');
      $table->join('tb_penampungan_tinja tpt2', 'tpt2.id_responden = tr.id and tpt2.tanggal_penyedotan_terakhir = tpt.tanggal_penyedotan_terakhir', 'left');
      $table->join('tb_volume_septiktank tvs', 'tvs.id = tpt2.id_volume_septiktank', 'left');
      $table->join('tb_mst_jenis_septiktank tmjs', 'tmjs.id = tvs.id_jenis_septiktank', 'left');
      $table->where(new RawSql("extract(year from tpt2.tanggal_rencana_penyedotan) = '" . $post['tahun'] . "'"));

      $this->prepareDatatableColumnSearch($table, ['tr.nama_lengkap', 'tr.nik', 'tk.latitude', 'tk.longitude']);
      $this->prepareDatatableColumnOrder($table, ['nama_lengkap', 'latitude', 'diameter_tabung', 'tanggal_rencana_penyedotan']);

      return $table;
   }
}
