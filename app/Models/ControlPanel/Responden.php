<?php

namespace App\Models\ControlPanel;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Responden extends Common
{

   public function hapusPenampunganTinja(array $post): array
   {
      try {
         $table = $this->db->table('tb_penampungan_tinja');
         $table->where('id', $post['id']);
         $table->delete();
         return ['status' => true, 'msg_response' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function submitPenampunganTinja(array $post): array
   {
      try {
         $fields = ['id_responden', 'kala_penyedotan', 'pembangunan', 'id_volume_septiktank', 'harga_penyedotan', 'tingkat_keamanan', 'tanggal_penyedotan_terakhir', 'tanggal_rencana_penyedotan'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_penampungan_tinja');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         }
         return ['status' => true, 'content' => $this->getDetailResponden($post['id_responden']), 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function submitVolumeSeptiktank(array $post): array
   {
      try {
         $fields = ['panjang', 'lebar', 'kedalaman', 'diameter_tabung', 'id_jenis_septiktank', 'id_responden'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $check = $this->checkDuplicateVolumeSeptiktank($post['id_responden']);

         $table = $this->db->table('tb_volume_septiktank');
         if ($check) {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id_responden']);
            $table->update($data);
         } else {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
         }

         return ['status' => true, 'content' => $this->getDetailResponden($post['id_responden']), 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function checkDuplicateVolumeSeptiktank(int $id_responden): bool
   {
      $table = $this->db->table('tb_volume_septiktank');
      $table->where('id_responden', $id_responden);

      $count = $table->countAllResults();

      return $count > 0 ? true : false;
   }

   public function hapus(array $post): void
   {
      try {
         $table = $this->db->table('tb_responden');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die(json_encode(['status' => false, 'msg_response' => $e->getMessage(), 'errors' => []]));
      }
   }

   public function submit(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $this->db->transBegin();

         $fields = ['nama_lengkap', 'nama_kepala_keluarga', 'nik', 'id_desa', 'alamat', 'kode_pos', 'id_kepemilikan_rumah'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['id_koordinat'] = $this->insertKoordinat($post);
         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_responden');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);

            $post['id_responden'] = $this->db->insertID();
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);

            $post['id_responden'] = $post['id'];
         }

         if (intval($data['id_kepemilikan_rumah']) !== 1) {
            $this->handleKepemilikanRumah($post);
         }

         if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            $response['msg_response'] = 'Gagal menyimpan data.';
         } else {
            $this->db->transCommit();
            $response['status'] = true;
            $response['msg_response'] = 'Data berhasil disimpan.';
         }
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   private function handleKepemilikanRumah(array $post): void
   {
      $check = $this->checkKepemilikanRumah($post['id_responden']);

      $table = $this->db->table('tb_kepemilikan_rumah');
      if ($check > 0) {
         $table->where('id_responden', $post['id_responden']);
         $table->update([
            'nik' => $post['nik_kepemilikan'],
            'nama_lengkap' => $post['nama_kepemilikan']
         ]);
      } else {
         $table->insert([
            'id_responden' => $post['id_responden'],
            'nik' => $post['nik_kepemilikan'],
            'nama_lengkap' => $post['nama_kepemilikan']
         ]);
      }
   }

   private function checkKepemilikanRumah(int $id_responden): int
   {
      $table = $this->db->table('tb_kepemilikan_rumah');
      $table->where('id_responden', $id_responden);

      return $table->countAllResults();
   }

   private function insertKoordinat(array $post): int
   {
      $checkExistKoordinat = $this->checkExistKoordinat($post);

      if (intval($checkExistKoordinat['jumlah']) > 0) {
         return $checkExistKoordinat['id'];
      } else {
         $table = $this->db->table('tb_koordinat');
         $table->ignore(true)->insert([
            'longitude' => $post['longitude'],
            'latitude' => $post['latitude'],
         ]);
         return $this->db->insertID();
      }
   }

   private function checkExistKoordinat(array $post): array
   {
      $table = $this->db->table('tb_koordinat');
      $table->select('id, count(*) as jumlah');
      $table->where('latitude', $post['latitude']);
      $table->where('longitude', $post['longitude']);

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
      $table = $this->db->table('tb_responden');
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
      $table->select('tr.id, tr.nama_lengkap, tr.nik, tr.id_kepemilikan_rumah, tmd.nama as desa, tk.latitude, tk.longitude');
      $table->join('tb_mst_desa tmd', 'tmd.id = tr.id_desa', 'left');
      $table->join('tb_koordinat tk', 'tk.id = tr.id_koordinat', 'left');
      if (isset($post['id_kepemilikan_rumah'])) {
         $table->where('tr.id_kepemilikan_rumah', $post['id_kepemilikan_rumah']);
      }

      $this->prepareDatatableColumnSearch($table, ['tr.nama_lengkap', 'tr.nik', 'tmd.nama', 'tk.latitude', 'tk.longitude']);
      $this->prepareDatatableColumnOrder($table, ['nama_lengkap', 'nik', 'id_kepemilikan_rumah', 'desa']);

      return $table;
   }
}
