<!DOCTYPE html>
<html lang="id" data-bs-theme="light">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title><?php echo $title; ?></title>
   <link rel="shortcut icon" href="/getfile/small-logo.png" />
   <?php
   echo link_tag('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700');
   echo $webpack_css;
   ?>
</head>

<body id="kt_body" class="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat" style="background: url(/getfile/login-bg.jpg);">
   <div id="kt_app_root" class="d-flex flex-column flex-root"></div>
   <?php echo $webpack_js; ?>
</body>

</html>