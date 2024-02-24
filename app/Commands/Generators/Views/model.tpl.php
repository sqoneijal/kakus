<@php

namespace {namespace};

use CodeIgniter\Database\RawSql;
use App\Models\Common;

class {class} extends Common
{

   public function hapus(array $post):void
   {
      try {
         $table = $this->db->table('');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die(json_encode(['status' => false, 'msg_response' => $e->getMessage(), 'errors' => []]));
      }
   }

   public function submit(array $post):array
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

   public function getData(array $post) : array {
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
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }

   public function countData(array $post):int {
      $table = $this->db->table('');
      return $table->countAllResults();
   }

   public function filteredData(array $post):int {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData(array $post):object {
      $table = $this->db->table('');

      $this->prepareDatatableColumnSearch($table, []);
      $this->prepareDatatableColumnOrder($table, []);

      return $table;
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
               $table->like('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }
   }

}