<?php
    // Defina o tipo de conteúdo como "text/event-stream"

    // Simule uma conexão de banco de dados ou outra fonte de dados em tempo real
    function getData() {

        $cliente = $_SESSION['cliente'];

        $sql = "SELECT SUM(quantidade) AS quant FROM (";
        foreach (servicos() as $tb)
        {
            $sql .= "SELECT COUNT(id) AS quantidade FROM $tb WHERE etapa = 'enviado' || etapa = 'avaliar'  AND id_usuario = 1 UNION ";
        }
        $sql = substr($sql, 0, -6);
        $sql .= ") AS subquery";

        $cmd = $GLOBALS['pdo']->query($sql);
        $pendente = $cmd->fetch(PDO::FETCH_OBJ);

        return "$pendente->quant";

        return "Mensagem de atualização em tempo real\n";
    }

    // Envie dados para o cliente a cada 1 segundo
    while (true) {
        $data = getData();
        echo "$data\n\n";
        ob_flush();
        flush();
        sleep(16); // Aguarde 1 segundo antes de enviar a próxima atualização
    }
?>

