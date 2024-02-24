<?php

use Config\Routes\Login;

$routes->get('getfile/(:any)', 'GetFile::index/$1');

$login = new Login();
$login->render($routes);
