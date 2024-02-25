<?php

use CodeIgniter\Files\File;

function doUpload($file, $extAllowed = []): array
{
   $uploadPath = WRITEPATH . 'uploads';

   $maxUpload = (int) @(ini_get('upload_max_filesize')) ?? 2;
   $clientMime = $file->getMimeType();
   $allowedMime = getAllowedMimeTypes($extAllowed);

   if (isClientMimeTypeAllowed($clientMime, $allowedMime) && isFileSizeAllowed($file, $maxUpload)) {
      $getRandomName = $file->getRandomName();
      $file->move($uploadPath, $getRandomName);

      if (isUploadedFileValid($uploadPath, $getRandomName, $allowedMime)) {
         $response['status'] = true;
         $response['content'] = $getRandomName;
      } else {
         $response['status'] = false;
         $response['content'] = 'Anda mencoba upload file yang tidak diizinkan oleh sistem.';
      }
   } else {
      $response['status'] = false;
      $response['content'] = 'File yang coba anda upload tidak diizinkan.';
   }

   return $response;
}

function getAllowedMimeTypes($extAllowed): array
{
   $config_mime = new \Config\Mimes();
   $allowedMime = [];

   foreach ($extAllowed as $ext) {
      foreach ($config_mime::$mimes[$ext] as $row) {
         $allowedMime[] = $row;
      }
   }

   return $allowedMime;
}

function isClientMimeTypeAllowed($clientMime, $allowedMime): bool
{
   return in_array($clientMime, $allowedMime);
}

function isFileSizeAllowed($file, $maxUpload): bool
{
   return $maxUpload >= (float) $file->getSizeByUnit('mb');
}

function isUploadedFileValid($uploadPath, $getRandomName, $allowedMime): bool
{
   $filePath = $uploadPath . '/' . $getRandomName;
   if (file_exists($filePath)) {
      $info = new File($filePath);
      return in_array($info->getMimeType(), $allowedMime);
   }
   return false;
}
