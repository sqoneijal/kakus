<?php

namespace App\Validation;

class Login
{

   private function validasiUsername($db): callable
   {
      return static function ($value, array $data, ?string &$error) use ($db): bool {
         $table = $db->table('tb_users');
         $table->where('username', $value);
         $table->orWhere('email', $value);

         $count = $table->countAllResults();
         if ($count > 0) {
            return true;
         }
         $error = 'Username/Email anda masukkan salah.';
         return false;
      };
   }

   private function validasiPassword($db): callable
   {
      return static function ($value, array $data, ?string &$error) use ($db): bool {
         $table = $db->table('tb_users');
         $table->select('password');
         $table->where('username', $data['username']);
         $table->orWhere('email', $data['username']);

         $get = $table->get();
         $row = $get->getRowArray();
         $get->freeResult();

         if (isset($row) && password_verify($value, $row['password'])) {
            return true;
         }

         $error = 'Password anda masukkan salah.';
         return false;
      };
   }

   public function submit(): array
   {
      $db = \Config\Database::connect();
      $validasiUsername = $this->validasiUsername($db);
      $validasiPassword = $this->validasiPassword($db);

      return [
         'username' => [
            'label' => 'Username/Email',
            'rules' => ['required', $validasiUsername],
            'errors' => [
               'is_not_unique' => 'Username/Email salah.'
            ]
         ],
         'password' => [
            'label' => 'Password',
            'rules' => ['required', $validasiPassword]
         ]
      ];
   }
}
