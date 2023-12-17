<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

    session_destroy();

    header("Location: /");
?>

