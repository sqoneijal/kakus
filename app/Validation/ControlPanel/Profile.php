<?php

namespace App\Validation\ControlPanel;

class Profile
{

   private function validasiEmail($db): callable
   {
      return static function ($value, array $data, ?string &$error) use ($db): bool {
         if ($data['old_email'] !== $value) {
            $table = $db->table('tb_users');
            $table->where('email', $value);

            $count = $table->countAllResults();

            if ($count > 0) {
               $error = 'Email anda masukkan sudah terdaftar, silahkan gunakan yang lain.';
               return false;
            }
         }
         return true;
      };
   }

   public function submit(): array
   {
      $db = \Config\Database::connect();
      $validasiEmail = $this->validasiEmail($db);

      return [
         'nama' => [
            'label' => 'Nama lengkap',
            'rules' => 'required'
         ],
         'email' => [
            'label' => 'Email',
            'rules' => ['required', 'valid_email', $validasiEmail]
         ]
      ];
   }
}
