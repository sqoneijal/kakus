<?php

namespace App\Models\ControlPanel;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Profile extends Common
{

   public function initProfile(array $post): array
   {
      $response['loginSessions'] = $this->prepareLoginSessions($post['id']);
      $response['logs'] = [];
      return $response;
   }

   private function prepareLoginSessions(int $idUser): array
   {
      $table = $this->db->table('tb_users_login_logs');
      $table->where('id_users', $idUser);
      $table->limit(10);
      $table->orderBy('id', 'desc');

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

   public function gantiFoto(array $post): void
   {
      $table = $this->db->table('tb_users');
      $table->where('id', $post['id']);
      $table->update([
         'avatar' => $post['avatar'],
         'modified' => new RawSql('now()')
      ]);
   }

   public function submit(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $fields = ['nama', 'email'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];
         $data['modified'] = new RawSql('now()');
         if (isset($post['password'])) {
            $data['password'] = password_hash($post['password'], PASSWORD_BCRYPT);
         }

         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->update($data);

         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
         $response['content'] = $post;
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }
}
