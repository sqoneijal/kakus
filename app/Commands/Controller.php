<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use CodeIgniter\CLI\GeneratorTrait;

class Controller extends BaseCommand
{

   use GeneratorTrait;

   protected $group       = 'CRUD';
   protected $name        = 'crud:controller';
   protected $description = 'Generates a new controller file.';

   public function run(array $params)
   {
      $this->params = $params;

      $this->component = 'Controller';
      $this->directory = 'Controllers';
      $this->execute($params);
   }

   protected function prepare(string $class): string
   {
      $useStatement = trim(implode('\\', array_slice(explode('\\', $class), 0, -1)), '\\');
      $useValidate = trim(APP_NAMESPACE, '\\') . '\Validation';
      $useModel = trim(APP_NAMESPACE, '\\') . '\Models';
      $extends      = 'Controller';

      $namespace = trim(implode('\\', array_slice(explode('\\', $class), 0, -1)), '\\');
      $search[]  = '<@php';
      $search[]  = '{namespace}';
      $search[]  = '{useStatement}';
      $search[]  = '{useValidate}';
      $search[]  = '{useModel}';
      $search[]  = '{class}';
      $replace[] = '<?php';
      $replace[] = $namespace;
      $replace[] = $useStatement;
      $replace[] = implode('\\', [$useValidate, implode('\\', array_slice(explode('\\', $class), 2))]);
      $replace[] = implode('\\', [$useModel, implode('\\', array_slice(explode('\\', $class), 2))]);
      $replace[] = str_replace($namespace . '\\', '', $class);

      return str_replace($search, $replace, $this->renderTemplate());
   }
}
