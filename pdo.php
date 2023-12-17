<?php

require_once('global.php');

// --------------------------------CONEXÃO SERVIDOR------------------------------------------------
$host = "localhost";
$dbname = "ebusquei";
$username = "root";
$password = "usbw";

$sql = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($sql, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");
}
catch (PDOException $e) {
    echo "<b>ERRO COM BANCO DE DADOS</b>: " . $e->getMessage();
    $pdo = null;
}

if(!isset($_SESSION))session_start();

$version = 1;
$logado = false;