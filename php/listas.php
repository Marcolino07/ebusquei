<?php

require($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

$x = 0;
$ids = [];

$select = "SELECT * FROM produto WHERE ";

while(isset($_POST['item-'.$x]))
{
    $id = $_POST['item-'.$x++];
    $select .= "id_produto = '$id' OR ";
}
$select = substr($select, 0, -3);

$cmd = $GLOBALS['pdo']->query($select);

$produtos = $cmd->fetchAll(PDO::FETCH_OBJ);

foreach ($produtos as $p)
{
    if(!isset($ids[$p->id_produto]))
        $ids[$p->id_produto] = [];

    $ids[$p->id_produto][] = $p;
}

$ids = array_values($ids);

print(json_encode($ids));