<?php
session_start();

require_once($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

if(isset($_POST['tel']))
{
    $sql = "SELECT id_auth, telefone, email FROM usuario WHERE telefone = :tel";
    if(isset($_POST['email']))
        $sql .= " OR email = :eml";

    $cmd = $pdo->prepare($sql);
    $cmd->bindValue(':tel', $_POST['tel']);

    if(isset($_POST['verify']))
    {
        if(isset($_POST['email']))
            $cmd->bindValue(':eml', $_POST['email']);
        $cmd->execute();

        if($cmd->rowCount() == 0)
            die('success');
        else
        {
            $u = $cmd->fetch(PDO::FETCH_OBJ);

            if($_POST['tel'] == $u->telefone)
                die('tel-existe');

            if($_POST['email'] == $u->email)
                die('email-existe');
        }
    }
    else if(isset($_POST['reset']))
    {
        $cmd->execute();

        if($cmd->rowCount() > 0)
        {
            $u = $cmd->fetch(PDO::FETCH_OBJ);
            $_SESSION['authReset'] = $u->id_auth;
            $_SESSION['token'] = bin2hex(random_bytes(32));
            die($_SESSION['token']);
        }
        else
            die('inexistente');
    }
    else die('unset');
}
else die('unset');
