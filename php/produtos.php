<?php

require($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

$id = $_POST['id-item'];

$select = "SELECT * FROM produto WHERE id_produto = '$id'";

$cmd = $GLOBALS['pdo']->query($select);

$produtos = $cmd->fetchAll(PDO::FETCH_OBJ);

print(json_encode($produtos));