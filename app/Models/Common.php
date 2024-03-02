<?php

namespace App\Models;

use CodeIgniter\Model;

class Common extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function getDaftarJenisSeptiktank(): array
   {
      $table = $this->db->table('tb_mst_jenis_septiktank');
      $table->select('id, nama, keterangan');

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

   public function getDetailResponden(int $id_responden): array
   {
      $biodataResponden = $this->prepareBiodataResponden($id_responden);

      $response['biodataResponden'] = $biodataResponden;
      $response['koordinatRumah'] = $this->prepareKoordinatRumah($biodataResponden['id_koordinat']);
      $response['volumeSeptiktank'] = $this->prepareVolumeSeptiktank($id_responden);
      $response['penampunganTinja'] = $this->preparePenampunganTinja($id_responden);
      return $response;
   }

   private function preparePenampunganTinja(int $id_responden): array
   {
      $table = $this->db->table('tb_penampungan_tinja tpt');
      $table->select('tpt.id, tpt.id_responden, tpt.kala_penyedotan, tpt.pembangunan, tpt.id_volume_septiktank, tpt.harga_penyedotan, tpt.tingkat_keamanan, tpt.tanggal_penyedotan_terakhir, tpt.tanggal_rencana_penyedotan');
      $table->where('tpt.id_responden', $id_responden);

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

   private function prepareVolumeSeptiktank(int $id_responden): array
   {
      $table = $this->db->table('tb_volume_septiktank tvs');
      $table->select('tvs.id, tvs.panjang, tvs.lebar, tvs.kedalaman, tvs.diameter_tabung, tvs.id_jenis_septiktank, tmjs.nama as nama_jenis_septiktank, tmjs.keterangan as keterangan_jenis_septiktank, tvs.id_responden');
      $table->join('tb_mst_jenis_septiktank tmjs', 'tmjs.id = tvs.id_jenis_septiktank', 'left');
      $table->where('tvs.id_responden', $id_responden);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   private function prepareKoordinatRumah(int $id_koordinat): array
   {
      $table = $this->db->table('tb_koordinat');
      $table->where('id', $id_koordinat);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   private function prepareBiodataResponden(int $id_responden): array
   {
      $table = $this->db->table('tb_responden tr');
      $table->select('tr.id, tr.nama_lengkap, tr.nama_kepala_keluarga, tr.nik, tr.id_desa, tmd.nama as desa, tmd.id_kecamatan, tmk.nama as kecamatan, tmk.id_kabkota, tmk2.nama as kabkota, tmk2.id_provinsi, tmp.nama as provinsi, tr.alamat, tr.kode_pos, tr.id_kepemilikan_rumah, tr.id_koordinat, tkr.nik as nik_pemilik_rumah, tkr.nama_lengkap as nama_pemilik_rumah');
      $table->join('tb_mst_desa tmd', 'tmd.id = tr.id_desa', 'left');
      $table->join('tb_mst_kecamatan tmk', 'tmk.id = tmd.id_kecamatan', 'left');
      $table->join('tb_mst_kabkota tmk2', 'tmk2.id = tmk.id_kabkota', 'left');
      $table->join('tb_mst_provinsi tmp', 'tmp.id = tmk2.id_provinsi', 'left');
      $table->join('tb_kepemilikan_rumah tkr', 'tkr.id_responden = tr.id', 'left');
      $table->where('tr.id', $id_responden);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   public function getDaftarDesa(array $post): array
   {
      $table = $this->db->table('tb_mst_desa');
      $table->where('id_kecamatan', $post['id_kecamatan']);
      $table->orderBy('nama');

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

   public function getDaftarKecamatan(array $post): array
   {
      $table = $this->db->table('tb_mst_kecamatan');
      $table->where('id_kabkota', $post['id_kabkota']);
      $table->orderBy('nama');

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

   public function getDaftarKabkota(array $post): array
   {
      $table = $this->db->table('tb_mst_kabkota');
      $table->where('id_provinsi', $post['id_provinsi']);
      $table->orderBy('nama');

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

   public function getDaftarProvinsi(): array
   {
      $table = $this->db->table('tb_mst_provinsi');
      $table->orderBy('nama');

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

   public function getDataUsers(array $post): array
   {
      try {
         $table = $this->db->table('tb_users');
         $table->select('id, avatar, nama, email, username, role, user_modified, uploaded, modified, last_login');
         $table->where('username', @$post['username']);
         $table->orWhere('email', @$post['username']);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }
         }
         return ['status' => true, 'content' => $response];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function prepareDatatableColumnOrder($table, $column_order = []): void
   {
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   }

   public function prepareDatatableColumnSearch($table, $column_search = []): void
   {
      $i = 0;
      foreach ($column_search as $item) {
         if (@$_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like($item, trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike($item, trim(strtolower($_POST['search']['value'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }
   }
}
