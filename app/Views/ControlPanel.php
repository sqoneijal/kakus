<!DOCTYPE html>
<html lang="id" data-bs-theme="light">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title><?php echo $title; ?></title>
   <link rel="shortcut icon" href="/getfile/small-logo.png" />
   <?php
   echo link_tag('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700');
   echo link_tag('https://unpkg.com/leaflet/dist/leaflet.css');
   echo $webpack_css;
   ?>
</head>

<body id="kt_body" class="app-default" data-kt-app-layout="light-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" data-kt-app-footer-fixed="true" data-kt-app-toolbar-fixed="true">
   <div id="kt_app_root" class="d-flex flex-column flex-root app-root"></div>
   <?php
   echo $webpack_js;
   echo script_tag('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
   ?>
</body>

</html>