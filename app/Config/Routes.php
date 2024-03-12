<?php

use Config\Routes\Login;
use Config\Routes\ControlPanel;

$routes->get('logout', 'Login::logout');
$routes->get('getfile/(:any)', 'GetFile::index/$1');

$login = new Login();
$login->render($routes);

$controlPanel = new ControlPanel();
$controlPanel->render($routes);
