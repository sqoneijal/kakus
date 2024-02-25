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

   public function getDataUsers(array $post): array
   {
      try {
         $table = $this->db->table('tb_users');
         $table->select('id, avatar, nama, email, username, role, user_modified, uploaded, modified, last_login');
         $table->where('username', $post['username']);
         $table->orWhere('email', $post['username']);

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
}
