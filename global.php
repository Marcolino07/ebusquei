<?php
// --------------------------------CONEXÃO SERVIDOR------------------------------------------------
$version = 0.1;

date_default_timezone_set('America/Sao_Paulo');

function cookie($nome, $valor) {

    $tempo = $valor ? (86400*30) : (-3600);

    $cookieOptions = array(
        'expires' => time()+($tempo),
        'path' => '/',
    );
    setcookie($nome, $valor, $cookieOptions);
}


function valorAleatorio($length) {
    $characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return substr(str_shuffle($characters), 0, $length);
}

function Data($data) {
    return date('d/m/Y', strtotime($data));
}

function tb_config($s)
{
    $tb = valido($s->servico);
    $tb .= '_config';

    if(isset($s->cadastro)){
        $cmd = $GLOBALS['pdo']->prepare("SELECT * FROM $tb WHERE id = :idc");
        $cmd->bindValue(':idc', $s->id_config);
    }
    else{
        $cmd = $GLOBALS['pdo']->prepare("SELECT * FROM $tb WHERE id = (SELECT MAX(id) FROM $tb)");
    }

    $cmd->execute();
    $tabela = $cmd->fetch(PDO::FETCH_OBJ);
    return $tabela;
}


function RS($cash) {
    if($cash == '') $cash = 0;
    $cash = number_format($cash, 2, ',', '.');
    return "R$ $cash";
}

function ASC($a, $b) {
    return strcmp($a, $b);
}

function DESC($a, $b) {

    return strcmp($b->{'atributo'}, $a->{'atributo'});
}

function modificacao($a, $b) {
    return strcmp($b->modificacao, $a->modificacao);
}

function ListarProdutos()
{
    $select = "SELECT * FROM produto";

    $cmd = $GLOBALS['pdo']->query($select);

    $produtos = $cmd->fetchAll(PDO::FETCH_OBJ);

    if(count($produtos) == 0)
    {
    $add_produto = array('Arroz','Oléo','Achocolatado','Farinha de mandioca','Café','Sal','Trigo','Feijão','Leite','Açucar','Macarrão','Extrato de tomate','Maionese','Biscoito água e sal');

        $GLOBALS['pdo']->query("INSERT INTO mercado (nome, cidade) VALUES ('Atacadão','Itanhaém'),('Mercadão','Itanhaém'),('Tenda','Itanhaém')");

        $contagem = [];

        for($i=1; $i <= 3; $i++)
        {
            $ciclo = 0;
            $index = 1;
            $sql = "INSERT INTO produto (id_mercado, nome, valor, id_produto) VALUES ";
            foreach ($add_produto as $prod)
            {
                if($i == 1)
                    $contagem[] = sprintf("%05d", $index++);

                $id_item = $contagem[$ciclo];

                $valor = rand(5, 30);
                $sql .= "($i, '$prod', '$valor', '$id_item'),";
                $ciclo++;
            }
            $sql = rtrim($sql, ',');

            $GLOBALS['pdo']->query($sql);

            $cmd = $GLOBALS['pdo']->query($select);

            $produtos = $cmd->fetchAll(PDO::FETCH_OBJ);
        }
    }
    return $produtos;
}

