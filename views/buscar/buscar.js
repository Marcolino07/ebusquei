var minhaLista, listaAtual


//Confirmar para sair-------------------------------------------------
window.onbeforeunload = function()
{
    // return true;
};

function setNewName(nomeNovo)
{
    if(!$1('h2.btn'))
    {
        $1('.side-right h2').onclick=()=>
        {
            z7insert('Insira um novo nome para a sua lista')
            .then(ev =>
            {
                minhaLista[0].nome = ev;
                $1('.side-right h2').innerHTML = ev + "<i class='fa fa-edit' style='position:absolute;right:1rem'></i>";
                z7setl(listaAtual, minhaLista);
                z7infobox('<b>O titulo da lista foi atualizado!</b>', 'green');
                $1('.side-right h2').classList.add('btn');
            });
            $1('#z7-insert').value = $1('.side-right h2').innerText;
        }
    }
    $1('.side-right h2').innerHTML = nomeNovo + "<i class='fa fa-edit' style='position:absolute;right:1rem'></i>";
    $1('.side-right h2').classList.add('btn');
}

//Redireciona do ORÇAMENTO para o WHATSAPP----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function()
{
    listaAtual = z7gets('lista-nome');

    if(listaAtual)
    {
        minhaLista = JSON.parse(z7getl(listaAtual));

        let query = '';
        
        setNewName(minhaLista[0].nome);
        

        minhaLista[1].forEach((z, y) => {
            $1('.minha-lista').appendChild($1('#i-'+z));
            query += `item-${y}=${z}&`;
        });
        
        query = query.slice(0,-1);

        z7ajax('../php/listas.php', query, function(response)
        {
            let item = JSON.parse(response);

            item.forEach((z,x) =>
            {
                itemNome = removerAcentos(z[0].nome);

                let price = [z[0].valor, z[1].valor, z[2].valor];
                let menorValor = Math.min(...price);
    
                price.forEach((p,y) =>
                {
                    price[y] = (p == menorValor) ? 'best-price' : 'worse-price';
                });
    
                $1('#dv-produtos').insertAdjacentHTML('beforeend',
                `<div id='dv-${itemNome}' class='produtos'>
                    <i class='fa fa-close del' idd='i-${z[0].id_produto}'></i>
                    <div class='${itemNome}1 ${price[0]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${z[0].nome}</p>
                        <p>R$ <span class='subVal'>${RS(z[0].valor)}</span></p>
                    </div>
                    <div class='${itemNome}2 ${price[1]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${z[1].nome}</p>
                        <p>R$ <span class='subVal'>${RS(z[1].valor)}</span></p>
                    </div>
                    <div class='${itemNome}3 ${price[2]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${z[2].nome}</p>
                        <p>R$ <span class='subVal'>${RS(z[2].valor)}</span></p>
                    </div>
                </div>`);
    
                let merc = [z7float2($1('#merc-1').innerText), z7float2($1('#merc-2').innerText), z7float2($1('#merc-3').innerText)]
    
                let valor = [merc[0]+z7float2(z[0].valor), merc[1]+z7float2(z[1].valor), merc[2]+z7float2(z[2].valor)];
    
                $1('#dv-total #merc-1').innerText = RS(valor[0]);
                $1('#dv-total #merc-2').innerText = RS(valor[1]);
                $1('#dv-total #merc-3').innerText = RS(valor[2]);
    
                Comparar(valor);
            });
        });
    }
    else
    {
        setTimeout(() => {
            $1('.side-left').classList.add('block');
            $1('.side-left-out').classList.add('block');
            
        }, 500);
    }

    $1('.produtos-disponiveis').addEventListener('pointerdown', (item)=>
    {
        let produto = item.target;
        if(produto.tagName === 'LI')
        {
            let idItem = att(produto, 'id-item');
            let idd = att(produto, 'id');
            let itemNome = att(produto, 'nome');

            $1('.minha-lista').appendChild(produto);

            z7ajax('../php/produtos.php', 'id-item='+idItem, function(response)
            {
                let item = JSON.parse(response);
                console.log(item);

                itemNome = removerAcentos(itemNome);

                let price = [item[0].valor, item[1].valor, item[2].valor];
                let menorValor = Math.min(...price);

                price.forEach((z,x) =>
                {
                    price[x] = (z==menorValor) ? 'best-price' : 'worse-price';
                });

                $1('#dv-produtos').insertAdjacentHTML('beforeend',
                `<div id='dv-${itemNome}' class='produtos'>
                    <i class='fa fa-close del' idd='${idd}'></i>
                    <div class='${itemNome}1 ${price[0]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${item[0].nome}</p>
                        <p>R$ <span class='subVal'>${RS(item[0].valor)}</span></p>
                    </div>
                    <div class='${itemNome}2 ${price[1]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${item[1].nome}</p>
                        <p>R$ <span class='subVal'>${RS(item[1].valor)}</span></p>
                    </div>
                    <div class='${itemNome}3 ${price[2]}'>
                        <img src='/img/lista/produtos/${itemNome}.png'/>
                        <p>${item[2].nome}</p>
                        <p>R$ <span class='subVal'>${RS(item[2].valor)}</span></p>
                    </div>
                </div>`);

                let merc = [z7float2($1('#merc-1').innerText), z7float2($1('#merc-2').innerText), z7float2($1('#merc-3').innerText)]

                let valor = [merc[0]+z7float2(item[0].valor), merc[1]+z7float2(item[1].valor), merc[2]+z7float2(item[2].valor)];

                $1('#dv-total #merc-1').innerText = RS(valor[0]);

                $1('#dv-total #merc-2').innerText = RS(valor[1]);

                $1('#dv-total #merc-3').innerText = RS(valor[2]);

                Comparar(valor);
            });
        }
    });

    $1('.minha-lista').addEventListener('pointerdown', (item)=>
    {
        let produto = item.target;
        if (produto.tagName === 'LI')
        {
            let itemNome = removerAcentos(att(produto,'nome'));

            $1('.produtos-disponiveis').appendChild(produto);

            let merc = [z7float2($1('#merc-1').innerText), z7float2($1('#merc-2').innerText), z7float2($1('#merc-3').innerText)]

            let valor = [z7float2($1('.'+itemNome+'1 .subVal').innerText), z7float2($1('.'+itemNome+'2 .subVal').innerText), z7float2($1('.'+itemNome+'3 .subVal').innerText)]

            $1('#dv-total #merc-1').innerText = RS(merc[0]-valor[0]);

            $1('#dv-total #merc-2').innerText = RS(merc[1]-valor[1]);

            $1('#dv-total #merc-3').innerText = RS(merc[2]-valor[2]);

            $1('#dv-'+itemNome).remove($1('#dv-'+itemNome));

            valor = [merc[0]-valor[0], merc[1]-valor[1], merc[2]-valor[2]];

            Comparar(valor);
        }
    });

    $1('#dv-produtos').addEventListener('pointerdown', (item)=>
    {
        let produto = item.target;

        if(produto.classList.contains('del'))
        {
            let prod = $1('#'+att(produto, 'idd'))

            let itemNome = removerAcentos(att(prod,'nome'));

            $1('.produtos-disponiveis').appendChild(prod);

            let merc = [z7float2($1('#merc-1').innerText), z7float2($1('#merc-2').innerText), z7float2($1('#merc-3').innerText)]

            let valor = [z7float2($1('.'+itemNome+'1 .subVal').innerText), z7float2($1('.'+itemNome+'2 .subVal').innerText), z7float2($1('.'+itemNome+'3 .subVal').innerText)]

            $1('#dv-total #merc-1').innerText = RS(merc[0]-valor[0]);

            $1('#dv-total #merc-2').innerText = RS(merc[1]-valor[1]);

            $1('#dv-total #merc-3').innerText = RS(merc[2]-valor[2]);

            valor = [merc[0]-valor[0], merc[1]-valor[1], merc[2]-valor[2]];
            Comparar(valor);
        
            produto.closest('div').remove();
        }
    });

    $1('.salvar-lista').addEventListener('click', ()=>
    {
        let numList;
        const salvar = [];

        salvar[0] = {};
        salvar[1] = [];

        $2('.minha-lista li').forEach(z => {
            salvar[1].push(att(z, 'id-item'));
        });

        if(listaAtual)
        {
            salvar[0].nome = $1('.side-right h2').innerText;
            z7setl(listaAtual, salvar);
            z7infobox('<b>Lista atualizada com sucesso!</b>', 'green');
        }
        else
        {
            let l;
            z7insert(`Dê um nome a sua lista`)
            .then((valor) =>
            {
                for (l = 1; l < 20; l++) {
                    numList = z7getl('lista-'+l);
                    if(!numList)
                        break;
                }
                salvar[0].nome = (valor || `Minha Lista ${l}`);
                z7setl('lista-'+l, salvar);
                z7infobox('<b>Lista salva com sucesso!</b>', 'green');
                setNewName(valor);
            });
        }
    });
});
