<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: content-type, X-Api-Key, Authorization");
header("Content-Type: application/x-www-form-urlencoded");
?>
<?php

//MIDDLEWARE TO CHANGE
$middleware = '';
$document_root = $_SERVER['DOCUMENT_ROOT'] . $middleware;

//API Config
define("IS_DEV", FALSE);
define('LOG_FILE_PATH', "$document_root/logs/bookbank.txt"); // used in helpers utils.php 
define('LOG_ERROR_FILE_PATH', "$document_root/logs/bookbank_errors.txt"); // used in helpers utils.php 
define('PUBLIC_API_KEY', 'Another12345Code');
define('API_URL', 'https://ecobookapi.soulxvintage.es' . $middleware);

//Database Config
// define('DB_HOST', "localhost");
// define('DB_NAME', 'banco_libros');
// define('DB_USERNAME', 'root');
// define('DB_PASSWORD', '');
define('DB_HOST', "127.0.0.1");
define('DB_NAME', 'mvqeywgh_ecobook');
define('DB_USERNAME', 'mvqeywgh_ecobook');
define('DB_PASSWORD', 'EcoBook123!');

//SMTP Config
define('ALLOW_EMAIL_SENDING', true);
define("SMTP_HOST", "mail.soulxvintage.es");
define("SMTP_USERNAME", "sender@soulxvintage.es");
define("SMTP_PASSWORD", "#o7D&GgcMELk");

//Files Config
define('FILE_STORAGE_PATH', "$document_root/storage");
define("MAX_THUMB_WIDTH", 500);
define("MAX_THUMB_HEIGHT", 500);

include_once $document_root . '/config/imports.php';
?>