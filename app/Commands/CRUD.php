<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use CodeIgniter\CLI\GeneratorTrait;

class CRUD extends BaseCommand
{

   use GeneratorTrait;

   protected $group       = 'CRUD';
   protected $name        = 'crud';
   protected $description = 'Generates a new controller, models, validation file.';

   public function run(array $params)
   {
      $this->params = $params;

      $options = [];

      if ($this->getOption('namespace')) {
         $options['namespace'] = $this->getOption('namespace');
      }

      $class = $params[0] ?? CLI::getSegment(2);

      $this->call('crud:controller', array_merge([$class], $options));
      $this->call('crud:validation', array_merge([$class], $options));
      $this->call('crud:model', array_merge([$class], $options));
   }
}
