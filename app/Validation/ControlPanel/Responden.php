<?php

namespace App\Validation\ControlPanel;

class Responden
{

   public function hapusPenampunganTinja(): array
   {
      return [
         'id' => [
            'label' => 'ID penampungan tinja',
            'rules' => 'required|numeric|is_not_unique[tb_penampungan_tinja.id,id]'
         ],
      ];
   }

   public function submitPenampunganTinja(): array
   {
      return [
         'kala_penyedotan' => [
            'label' => 'Tahun penyedotan',
            'rules' => 'required|numeric|exact_length[4]'
         ],
         'pembangunan' => [
            'label' => 'Tahun pembangunan',
            'rules' => 'required|numeric|exact_length[4]'
         ],
         'harga_penyedotan' => [
            'label' => 'Harga penyedotan',
            'rules' => 'required|numeric'
         ],
         'tanggal_penyedotan_terakhir' => [
            'label' => 'Tanggal penyedotan terakhir',
            'rules' => 'required|valid_date[Y-m-d]'
         ],
         'tanggal_rencana_penyedotan' => [
            'label' => 'Tanggal rencana penyedotan',
            'rules' => 'required|valid_date[Y-m-d]'
         ],
      ];
   }

   public function submitVolumeSeptiktank(): array
   {
      return [
         'panjang' => [
            'label' => 'Panjang',
            'rules' => 'required|numeric'
         ],
         'lebar' => [
            'label' => 'Lebar',
            'rules' => 'required|numeric'
         ],
         'kedalaman' => [
            'label' => 'Kedalaman',
            'rules' => 'required|numeric'
         ],
         'diameter_tabung' => [
            'label' => 'Diameter tabung',
            'rules' => 'required|numeric'
         ],
         'id_jenis_septiktank' => [
            'label' => 'Jenis septiktank',
            'rules' => 'required|numeric'
         ],
      ];
   }

   private function validasiNIK($db): callable
   {
      return static function ($value, array $data, ?string &$error) use ($db): bool {
         if (isset($data['old_nik']) && $data['old_nik'] !== $value) {
            $table = $db->table('tb_responden');
            $table->where('nik', $value);

            $count = $table->countAllResults();

            if ($count > 0) {
               $error = 'NIK sudah terdaftar, silahkan gunakan yang lain.';
               return false;
            }
         }
         return true;
      };
   }

   private function validasiNIKKepemilikan(): callable
   {
      return static function ($value, array $data, ?string &$error): bool {
         $status = true;
         if (isset($data['id_kepemilikan_rumah']) && $data['id_kepemilikan_rumah'] !== '1') {
            if (strlen($value) < 1) {
               $error = 'NIK tidak boleh kosong.';
               $status = false;
            }

            if (!preg_match('/^\\d{16}$/', $value)) {
               $error = "NIK harus berisi angka.";
               $status = false;
            }

            if (strlen($value) !== 16) {
               $error = "Panjang NIK harus tepat 16 karakter.";
               $status = false;
            }
         }
         return $status;
      };
   }

   private function validasiNamaKepemilikan(): callable
   {
      return static function ($value, array $data, ?string &$error): bool {
         if (isset($data['id_kepemilikan_rumah']) && $data['id_kepemilikan_rumah'] !== '1' && strlen($value) < 1) {
            $error = 'Nama lengkap tidak boleh kosong.';
            return false;
         }
         return true;
      };
   }

   public function submit(): array
   {
      $db = \Config\Database::connect();
      $validasiNIK = $this->validasiNIK($db);
      $validasiNIKKepemilikan = $this->validasiNIKKepemilikan();
      $validasiNamaKepemilikan = $this->validasiNamaKepemilikan();

      return [
         'nama_lengkap' => [
            'label' => 'Nama lengkap',
            'rules' => 'required'
         ],
         'nama_kepala_keluarga' => [
            'label' => 'Nama kepala keluarga',
            'rules' => 'required'
         ],
         'nik' => [
            'label' => 'NIK',
            'rules' => ['required', 'numeric', 'exact_length[16]', $validasiNIK]
         ],
         'id_provinsi' => [
            'label' => 'Provinsi',
            'rules' => 'required'
         ],
         'id_kabkota' => [
            'label' => 'Kabupaten/Kota',
            'rules' => 'required'
         ],
         'id_kecamatan' => [
            'label' => 'Kecamatan',
            'rules' => 'required'
         ],
         'id_desa' => [
            'label' => 'Desa',
            'rules' => 'required'
         ],
         'alamat' => [
            'label' => 'Alamat',
            'rules' => 'required'
         ],
         'kode_pos' => [
            'label' => 'Kode pos',
            'rules' => 'required|numeric|exact_length[5]'
         ],
         'id_kepemilikan_rumah' => [
            'label' => 'Kepemilikan rumah',
            'rules' => 'required|numeric'
         ],
         'longitude' => [
            'label' => 'Longitude',
            'rules' => 'required|numeric'
         ],
         'latitude' => [
            'label' => 'Latitude',
            'rules' => 'required|numeric'
         ],
         'nik_kepemilikan' => [
            'label' => 'NIK',
            'rules' => [$validasiNIKKepemilikan]
         ],
         'nama_kepemilikan' => [
            'label' => 'Nama lengkap',
            'rules' => [$validasiNamaKepemilikan]
         ],
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID responden',
            'rules' => 'required|numeric|is_not_unique[tb_responden.id,id]'
         ]
      ];
   }
}
