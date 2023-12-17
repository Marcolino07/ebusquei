document.addEventListener('DOMContentLoaded', function()
{
    const stars = $2('.star-icon');
    document.addEventListener('click', function(e)
    {
        let starClass = e.target.classList;
        if (starClass.contains('star-icon'))
        {
            e.target.closest('.avaliacao').classList.remove('vazio');
            if(!starClass.contains('ativo')){
                stars.forEach(function(z){z.classList.remove('ativo');})
                starClass.add('ativo');
            }
            let avaliacao =  e.target.getAttribute('avaliacao');
        }
    });

    var l, Lista;

    for (l = 1; l <= 20; l++) {
        Lista = JSON.parse(z7getl('lista-'+l));
        if(!Lista)
        {
            if(l == 1)
                $1('.dv-nenhum').insertAdjacentHTML('afterbegin',`Nenhuma Lista salva até o momento 📝`);
            break;
        }

        $1('.dv-nenhum')
        .insertAdjacentHTML('afterbegin',`<div><button class="btn full btn-lista" value="lista-${l}" type="button">${Lista[0].nome}</button><button class="btn" onclick="gerarPDF('lista-${l}')" type="button">PDF</button><div>`);
    }

    $2('.btn-lista').forEach(z =>
    {
        z.addEventListener('click', ()=>
        {
            z7sets('lista-atual', z.value);
            z7sets('lista-nome', z.value);
            $navLink('buscar');
        });
    });
});


function gerarPDF(containerPDF) {

    minhaLista = JSON.parse(z7getl(containerPDF));

    let query = '';
    
    // setNewName(minhaLista[0].nome);

    minhaLista[1].forEach((z, y) => {
        query += `item-${y}=${z}&`;
    });
    
    query = query.slice(0,-1);

    z7ajax('../php/listas.php', query, function(response)
    {
        let item = JSON.parse(response);
        console.log(item);

        let element = `<div class='flex'><img src="/img/ebusquei/logo.png" width="20%" height="110px"><h1 style="align-self:center;">${minhaLista[0].nome}</h1></div>`;//style="margin-left: 80%;

        let merc = [0,0,0];

        element += `<div>`;

        item.forEach((z,x) =>
        {
            itemNome = removerAcentos(z[0].nome);

            let price = [z[0].valor, z[1].valor, z[2].valor];
            let menorValor = Math.min(...price);

            price.forEach((p,y) =>
            {
                price[y] = (p == menorValor) ? 'best-price' : 'worse-price';
            });

            element += `<div class='flex'>`;
            
            for (let index = 0; index < 3; index++) {
                element += `<div style='width: 33%;'>
                    <img width='50px' height='50px' src='/img/lista/produtos/${itemNome}.png'/>
                    <p>${z[index].nome}</p>
                    <p>R$${RS(z[index].valor)}</p>
                </div>`;
                merc[index] += z7float2(z[index].valor);
            }
            
            element += `</div>`;
            
            // Comparar(valor);
        });

        element += `<div id='dv' class='flex'>`;

        for (let index = 0; index < 3; index++) {
            element += `<div style='width: 33%;'>
                <p>${RS(merc[index])}</p>
            </div>`;
        }
        element += `</div>`;
        element += `</div>`;


        $1('.dv-nenhum').innerHTML = element;

        // Cria um novo objeto jsPDF
        // var opt = {
        //     margin:       .5,
        //     filename:     'myfile.pdf',
        //     image:        { type: 'jpeg', quality: 0.98 },
        //     html2canvas:  { scale: 2 },
        //     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        // };

        // // New Promise-based usage:
        // html2pdf().set(opt).from().save();

        // // Old monolithic-style usage:
        // html2pdf(element, opt);

        // console.log(element);
    });
}
