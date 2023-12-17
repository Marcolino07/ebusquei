<?php

if ($_POST){
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
}
else exit;

if(!strpos($email, "@"))
    die('Email inválido');

require_once($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

$cmd = $pdo->prepare("SELECT id FROM usuario WHERE email = :tel");
$cmd->bindValue(':tel', $email);
$cmd->execute();

if($cmd->rowCount() > 0)
    die("Já existe uma conta com este E-mail");

$cmd = $pdo->prepare("INSERT INTO usuario (nome, sobrenome, email, senha) VALUES (:nom, :snm, :eml, :sen)");
$cmd->bindValue(":nom", $nome);
$cmd->bindValue(":snm", $sobrenome);
$cmd->bindValue(':eml', $email);
$cmd->bindValue(":sen", $senha);
if($cmd->execute())
{
    $_SESSION['id_usuario'] = $pdo->lastInsertId();
    $_SESSION['nome'] = $nome;
    echo'success';
}
else die("Erro ao cadastrar");