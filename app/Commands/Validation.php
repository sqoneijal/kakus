<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use CodeIgniter\CLI\GeneratorTrait;

class Validation extends BaseCommand
{

   use GeneratorTrait;

   protected $group       = 'CRUD';
   protected $name        = 'crud:validation';
   protected $description = 'Generates a new validation file.';

   public function run(array $params)
   {
      $this->params = $params;

      $this->component = 'Validation';
      $this->directory = 'Validation';
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
