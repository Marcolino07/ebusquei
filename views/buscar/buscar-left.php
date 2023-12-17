<h2>Produtos</h2>

<ul class='produtos-disponiveis'>

<?php

$produto = listarProdutos();

foreach ($produto as $prod)
{
    if($prod->id_mercado == 1)
        echo "<li id='i-$prod->id_produto' id-item='$prod->id_produto' nome='$prod->nome' valor='$prod->valor'>$prod->nome</li>";
}

?>

</ul>