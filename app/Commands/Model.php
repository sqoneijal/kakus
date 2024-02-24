<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\GeneratorTrait;

class Model extends BaseCommand
{

   use GeneratorTrait;

   protected $group       = 'CRUD';
   protected $name        = 'crud:model';
   protected $description = 'Generates a new model file.';

   public function run(array $params)
   {
      $this->params = $params;

      $this->component = 'Models';
      $this->directory = 'Models';
      $this->execute($params);  
   }

   protected function prepare(string $class): string {
      $namespace = trim(implode('\\', array_slice(explode('\\', $class), 0, -1)), '\\');
      $search[]  = '<@php';
      $search[]  = '{namespace}';
      $search[]  = '{class}';
      $replace[] = '<?php';
      $replace[] = $namespace;
      $replace[] = str_replace($namespace . '\\', '', $class);

      return str_replace($search, $replace, $this->renderTemplate());
   }
}
