<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

    if(isset($_POST['nova-senha']))
    {
        $sql = "SELECT * FROM usuario WHERE id = ".$_SESSION['id_usuario'];
        $cmd = $GLOBALS['pdo']->query($sql);
        $u = $cmd->fetch(PDO::FETCH_OBJ);

        if($u->senha == $_POST['senha-atual'])
        {
            $cmd = $GLOBALS['pdo']->prepare("UPDATE usuario SET senha = :sen WHERE id = :id");
            $cmd->bindValue(":sen", $_POST['nova-senha']);
        }
        else die('incorreta');
    }
    else if(isset($_POST['verify-telefone']))
    {
        $cmd = $GLOBALS['pdo']->prepare("SELECT id FROM usuario WHERE telefone = :tel");
        $telefone = preg_replace("/\D/",'', $_POST['verify-telefone']);
        $cmd->bindValue(":tel", $telefone);

        if($cmd->rowCount())
            die('vinculado');
        else
            die('success');
    }
    else if(isset($_POST['novo-telefone']))
    {
        $telefone = preg_replace("/\D/",'', $_POST['novo-telefone']);
        $cmd = $GLOBALS['pdo']->prepare("UPDATE usuario SET telefone = :tel WHERE id = :id");
        $cmd->bindValue(":tel", $telefone);
    }
    else
    {
        $addServ = file_get_contents('php://input');
        $u = json_decode($addServ);

        $cmd = $GLOBALS['pdo']->prepare("UPDATE usuario SET nome = :nom, sobrenome = :sob, email = :eml, nascimento = :nsc WHERE id = :id");
        $cmd->bindValue(":nom", $u->nome);
        $cmd->bindValue(":sob", $u->sobrenome);
        $cmd->bindValue(":eml", $u->email);
        $cmd->bindValue(":nsc", $u->nascimento);
    }
    $cmd->bindValue(":id", $_SESSION['id_usuario']);

    try {
        $cmd->execute();
        echo'success';
    } catch (PDOException $e) {
        die($e);
    }
?>
