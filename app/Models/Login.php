<?php

namespace App\Models;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Login extends Common
{

   public function submit(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $dataUsers = $this->getDataUsers($post);

         $session = \Config\Services::session();
         $session->set('id_user', $dataUsers['id']);

         $this->updateLastLogin($dataUsers['id']);
         $this->updateLoginLogs(array_merge($post, ['id' => $dataUsers['id']]));

         $response['status'] = true;
         $response['msg_response'] = 'Login berhasil, halaman segera dialihkan.';
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   private function updateLastLogin(int $id): void
   {
      $table = $this->db->table('tb_users');
      $table->where('id', $id);
      $table->update(['last_login' => new RawSql('now()')]);
   }

   private function updateLoginLogs(array $post): void
   {
      $client = \Config\Services::curlrequest();

      $response = $client->request('GET', 'http://www.geoplugin.net/json.gp?ip=' . $post['ipAddress']);
      $body = $response->getBody();
      $geo = json_decode($body, true);

      $fields = ['request', 'status', 'delay', 'city', 'region', 'countryName', 'continentName', 'latitude', 'longitude', 'timezone'];
      foreach ($fields as $field) {
         if (isset($geo['geoplugin_' . $field])) {
            $data[$field] = $geo['geoplugin_' . $field];
         } else {
            $data[$field] = null;
         }
      }

      $data['id_users'] = $post['id'];
      $data['device'] = $post['currentAgent'] . ' - ' . $post['platform'];
      $data['time'] = new RawSql('now()');

      $table = $this->db->table('tb_users_login_logs');
      $table->insert($data);
   }
}
