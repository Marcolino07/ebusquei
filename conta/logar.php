<?php
if ($_POST){
    $email = $_POST['email'];
    $senha = $_POST['senha'];
}
else exit;

// VERIFICAR EXISTENCIA DADOS----------------------------------------------------------------------------------

if(!strpos($email, "@"))
    die('Email inválido');


require_once($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

$cmd = $GLOBALS['pdo']->prepare("SELECT * FROM usuario WHERE email = :lgn AND senha = :sen");
$cmd->bindParam(':lgn', $email);
$cmd->bindParam(':sen', $senha);
$cmd->execute();

if($cmd->rowCount() > 0)
{
    $u = $cmd->fetch(PDO::FETCH_OBJ);

    $_SESSION['id_usuario'] = $u->id;
    $_SESSION['nome'] = $u->nome;

    echo'success';
}
else die('Login e/ou senha inválidos');


