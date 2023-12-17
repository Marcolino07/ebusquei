//verificação para ir para a próxima tela----------------------------------------
var Z7_Clicar = 0;
var Z7_Not = 0;
var Z7_Next = [];
var Z7_nextText;
var Z7_btnNext;
var Z7_btnBack;
var Z7_Fotos = [];

function $1(tag){return document.querySelector(tag)}
function $2(tag){return document.querySelectorAll(tag)}


function $sets(key,val){return sessionStorage.setItem(key,val)}
function $gets(key){return sessionStorage.getItem(key)}
function $rems(key){return sessionStorage.removeItem(key)}
function $dels(key){return sessionStorage.removeItem(key)}

function $getl(key){return localStorage.getItem(key)}
function $reml(key){return localStorage.removeItem(key)}
function $dell(key){return localStorage.removeItem(key)}



function z7sets(key,val){
    if(typeof val == 'object')
        val = JSON.stringify(val);
    return sessionStorage.setItem(key,val);
}
function z7gets(key){return sessionStorage.getItem(key)}
function z7rems(key){return sessionStorage.removeItem(key)}
function z7dels(key){return sessionStorage.removeItem(key)}

function z7setl(key,val){
    if(typeof val == 'object')
        val = JSON.stringify(val);
    return localStorage.setItem(key,val);
}
function z7getl(key){return localStorage.getItem(key)}
function z7reml(key){return localStorage.removeItem(key)}
function z7dell(key){return localStorage.removeItem(key)}


function z7element(elemento) {
	let retornar = [];
	if (typeof elemento == 'string') retornar = document.querySelectorAll(elemento);
    else
    if (typeof elemento == 'object')
    {
        if(Array.isArray(elemento))
        {
            elemento.forEach((z, x) => {
                retornar[x] = z;
            });
        }
        else retornar[0] = elemento;
    }
    return retornar;
}

function z7selElemento(elemento) {
	let retornar = [];
	if (typeof elemento == 'string') retornar = document.querySelectorAll(elemento);
    else
    if (typeof elemento == 'object')
    {
        if(Array.isArray(elemento))
        {
            elemento.forEach((z, x) => {
                retornar[x] = z;
            });
        }
        else retornar[0] = elemento;
    }
    return retornar;
}


function removerAcentos(texto) {
    const comAcentos = 'áàãâêéèẽíìîĩòóõôùúũûçÁÀÃÂÉÊÈẼÍÌĨÎÓÔÒÕŨÚÙÛÇ ';
    const semAcentos = 'aaaaeeeeiiiioooouuuucAAAAEEEEIIIIOOOOUUUUC_';

    const regex = new RegExp(`[${comAcentos}]`, 'g');

    const textoSemAcentos = texto.replace(regex, (match) => semAcentos[comAcentos.indexOf(match)]);

    return textoSemAcentos.toLowerCase();
}

function att(element, attribute)
{
    if(typeof element === 'string')
        element = document.querySelector(element);
    return element.getAttribute(attribute);
}

function z7att(element, attribute)
{
    if(typeof element === 'string')
        element = document.querySelector(element);
    return element.getAttribute(attribute);
}


function z7loading(hidden){
    if(hidden)
    {
        if(typeof hidden == 'number') {
            setTimeout(()=>{ z7loading('remover') }, (hidden * 1000));
        }
        else {
            $2('.z7-loading').forEach(z => { z.remove(); }); return;
        }
    }

    if($1('.z7-loading')) return;

    let loading = document.createElement('div');
    loading.className = 'z7-loading';
    loading.innerHTML = '<img src="/img/marcolimpo/m.png">';
    $1('main').appendChild(loading);
}


function z7roll(z) {
    z.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function z7scroll(z) {
    z.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Função para configurar um cookie
function setCookie(nome, valor, diasParaExpirar) {
    var dataDeExpiracao = new Date();
    dataDeExpiracao.setTime(dataDeExpiracao.getTime() + (diasParaExpirar * 24 * 60 * 60 * 1000));
    var dataExpiracaoFormatada = "expires=" + dataDeExpiracao.toUTCString();
    document.cookie = nome + "=" + valor + ";" + dataExpiracaoFormatada + ";path=/";
}


function z7avisoCookies() {

    let cookies = document.createElement('div');
    cookies.className = 'avisocookies';

    cookies.innerHTML = `<p>Utilizamos cookies para fornecer uma melhor experiência para nossos usuários. `;
    cookies.innerHTML += `Para saber mais sobre o uso de cookies, consulte nossa política de privacidade. `;
    cookies.innerHTML += `Ao continuar navegando em nosso site, você concorda com a nossa política.</p>`;
    cookies.insertAdjacentHTML('beforeend', `<button>Aceito</button></div>`);

    document.body.insertAdjacentElement('beforeend', cookies);
    setTimeout(() => {$show('.avisocookies');}, 10);
    
    $1('.avisocookies button').onclick = function()
    {
        let altura = $1('.avisocookies').offsetHeight + 20;
        localStorage.setItem('aceitaCookie', 'aceito');
        $1('.avisocookies').style.bottom = `-${altura}px`;
    }
}




function z7ajax(arquivo, dados, callback, loader)
{
    if(loader)z7loading();

    const ajx_global = new XMLHttpRequest();
    ajx_global.onload = function()
    {
        if (ajx_global.status >= 200 && ajx_global.status < 300)
            callback(ajx_global.response);
        else
            console.error('Erro na requisição:', ajx_global.status, ajx_global.statusText);

        if(loader)
            z7loading(true);
    };
    ajx_global.open('POST', arquivo, true);

    var parametros = dados;
    if(!(dados instanceof FormData))
    {
        ajx_global.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if(typeof dados == 'object')
            parametros = JSON.stringify(dados);
    }

    ajx_global.send(parametros);
}

//PC OU MOBILE – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function $PC()
{
    if (navigator.userAgentData != undefined && navigator.userAgentData.mobile)
    {return false}else{return true}
}

//MOEDA BRASILEIRA – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function R$(Cash)
{
    Cash = String(Cash).replace(/[^0-9,.-]/g, '').replace(',', '.');
    if(!Cash) Cash = 0;
    Cash = parseFloat(Cash);
    return Cash.toLocaleString('pt-br',{style:'currency',currency:'BRL'});
}
function RS(Cash)
{
    Cash = R$(Cash);
    return Cash.replace('R$ ', '');
}

//NUMEROS DECIMAIS – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7float(Decimal)
{
    Decimal = String(Decimal).replace(/[^0-9,-]/g, '').replace(',', '.');
    if(!Decimal) Decimal = 0;
    return parseFloat(Decimal);
}

function z7float2(Decimal)
{
    Decimal = String(Decimal).replace(/,/g, '.').replace(/[^0-9.-]/g, '');
    if(!Decimal) Decimal = 0;
    return parseFloat(Decimal);
}

function z7decimal(Decimal) {
    Decimal = Decimal.replace(/\./g,'').replace(',','.');
    return parseFloat(Decimal).toFixed(2);
}

function z7post(objeto)
{
    let parametros;

    if(objeto.tagName)
    {
        const attributes = objeto.attributes;
        const attributeArray = Array.from(attributes);

        parametros = attributeArray
        .map(attr => `${encodeURIComponent(attr.name)}=${encodeURIComponent(attr.value)}`)
        .join('&');
    }
    else
    {
        parametros = Object.keys(objeto)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(objeto[key])}`)
        .join('&');
    }

    return parametros;
}


// REDIRECIONAMENTO WHATSAPP – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7whatsapp(Z7_Zap_Text, Z7_Cell)
{
    let Z7_Cell2 = Z7_Cell ? Z7_Cell : att('meta[name="telefone"]', 'content');
    let url = $PC ? 'https://api.whatsapp.com/send?phone=' : 'whatsapp://send?phone=';
    url = Z7_Zap_Text ? url.concat(`55${encodeURIComponent(Z7_Cell2)}&text=${encodeURIComponent(Z7_Zap_Text)}`) : url.concat(`55${encodeURIComponent(Z7_Cell2)}`);
    window.open(url, '_blank');
}

function fechar(z)
{
    (typeof z === 'string') ? $hide(document.querySelector(z)) : $hide(z.parentNode);
};

// INFOBOX - CAIXA DE INFORMAÇÕES – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7infobox(msg, color)
{
    if($1('.z7-infobox'))
        $1('.z7-infobox').remove();

    const infoBox = document.createElement('div');
    infoBox.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
    infoBox.className  = 'z7-infobox';
    if(color) infoBox.style.color = color;
    document.querySelector('main').appendChild(infoBox);

    setTimeout(()=> {(infoBox.classList.add('visible')), document.onclick =()=> {infoBox.remove()}}, 100);
    setTimeout(()=> {(infoBox.classList.remove('visible'))}, (1000+(msg.length*100)));
    setTimeout(()=> {(infoBox.remove())}, 3000+(msg.length*100));
}

function z7confirm(msg, color)
{
    const confirm = document.createElement('div');
    confirm.insertAdjacentHTML('beforeend', `<div><p>${msg}</p><div class='dv-btn'><button class='btn-cancel' value='no'>CANCELAR</button><button class='btn-confirm' value='yes'>CONFIRMAR</button></div></div>`);
    confirm.className  = 'z7-confirm';
    if(color) confirm.style.color = color;
    document.querySelector('main').appendChild(confirm);

    return new Promise((resolve)=>{
        $1('div.z7-confirm .dv-btn').addEventListener('click', function(event)
        {
            if ($1('.btn-confirm').contains(event.target)){
                resolve();
                confirm.remove();
            }
            else if ($1('.btn-cancel').contains(event.target)){
                confirm.remove();
            }
        });
    });
}

function z7dialog(msg, color)
{
    const confirm = document.createElement('div');
    confirm.insertAdjacentHTML('beforeend', `<div><p>${msg}</p><div class='dv-btn'><button class='btn-confirm' value='yes'>OK</button></div></div>`);
    confirm.className  = 'z7-confirm ok';
    if(color) confirm.style.color = color;
    document.querySelector('main').appendChild(confirm);

    return new Promise((resolve)=>{
        $1('div.z7-confirm .btn-confirm').addEventListener('click', function(event)
        {
            resolve();
            confirm.remove();
        });
    });
}

function z7insert(msg, color)
{
    const confirm = document.createElement('div');
    confirm.insertAdjacentHTML('beforeend', `<div><p>${msg}<br><input style='width:90%' type='text' id='z7-insert'></p><div class='dv-btn'><button class='btn-cancel' value='no'>CANCELAR</button><button class='btn-confirm' value='yes'>CONFIRMAR</button></div></div>`);
    confirm.className  = 'z7-confirm';
    if(color) confirm.style.color = color;
    document.querySelector('main').appendChild(confirm);

    return new Promise((resolve)=>{
        $1('div.z7-confirm .dv-btn').addEventListener('click', function(event)
        {
            if ($1('.btn-confirm').contains(event.target)){
                resolve($1('#z7-insert').value);
                confirm.remove();
            }
            else if ($1('.btn-cancel').contains(event.target)){
                confirm.remove();
            }
        });
    });
}

//VISIBILIDADE – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function $show(tag, style)
{
    let estilo = style ? style : 'block';
    z7selElemento(tag).forEach((z)=>
    {
        z.classList.remove('none');
        z.classList.add(estilo);
    });
}

function $hide(tag)
{
    let style = false;
    z7selElemento(tag).forEach((z)=>
    {
        z.classList.remove('flex','block','grid','inline');
        z.classList.add('none');
    });
}

function $visible(tag, arg)
{
    if(typeof arg=='string' && arg.includes('flex','block','grid','inline', 'none')) {
        z7selElemento(tag).forEach((z)=> {
            z.classList.remove('flex','block','grid','inline', 'none');
            z.classList.add(arg);
        });
        return;
    }

    if(arg) {
        z7selElemento(tag).forEach((z)=> {
            z.classList.remove('none');
            z.classList.add('block');
        });
    }
    else {
        z7selElemento(tag).forEach((z)=> {
            z.classList.remove('flex','block','grid','inline', 'none');
            z.classList.add('none');
        });
    }
}

//OPACIDADE – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function $opc(tag, arg) {
	z7selElemento(tag).forEach((z)=>
	{
        if(arg)
            z.classList.remove('opacity');
        else
            z.classList.add('opacity');
	});
}

//TELA MOBILE – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7mediaScreen()
{
    if ((window.innerWidth < window.innerHeight) || !$PC)
        $1('body').classList.add('mobile');
    else
        $1('body').classList.remove('mobile');
}

// Rolar para o topo – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7scrollTop(element) {
    document.documentElement.scrollTop = 0; // Para navegadores modernos
    if(element)
        document.querySelector(element).scrollTop = 0;
    else
        document.querySelector('main').scrollTop = 0;
}


function z7fileClick(z){
    if(!z.files[0])
        z7loading(3);
}

////INPUTS ADICIONAR FOTOS —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function z7fotoChange(z)
{
    let repetida, newImg = z.files[0];

    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (newImg.size > maxSize) {
        alert("A foto deve ter no máximo 5MBs.");
        z.value = '';
        z7loading('rmv');
        return;
    }

    $2('input[type="file"]').forEach((input) =>
    {
        if((input.files.length == 0) || input === z)
            return;

        if (input.files.length > 0 && input.files[0].name == z.files[0].name)
            repetida = true;
    });

    if(repetida)
    {
        alert(`A foto "${z.files[0].name}" já foi adicionada`);
        z.value = '';
        z7loading('rmv');
        return;
    }

    if(!['image/jpeg', 'image/png'].includes(newImg.type))
    {
        alert('A foto deve ser do tipo JPEG ou PNG');
        z.value = '';
        z7loading('rmv');
        return;
    }

    const reader = new FileReader();
    reader.onload = function ()
    {
        let pai = z.closest('.z7-file');
        let qImg = pai.querySelectorAll('img').length;
        let name = z7att(z, 'name') ? z7att(z, 'name') : 'file';
        let required = pai.hasAttribute('required') ? 'required' : null;

        let files = z7att(pai, 'files') ? z7att(pai, 'files') : 1;

        let lbl = z.closest('label');
        lbl.querySelector('img').src = URL.createObjectURL(newImg);
        lbl.classList.remove('empty');

        if(files > 1)
        {
            let add = `<label><img src='/zero7/icon/plus.png'/><input type='file' ${required} onclick='z7fileClick(this)' onchange='z7fotoChange(this)'/></label>`;

            z.addEventListener('click', function(ev)
            {
                if(z.files[0])
                {
                    ev.preventDefault();
                    if (confirm('Deseja apagar esta foto?'))
                    {
                        let ipt = pai.querySelectorAll('input');
                        if((qImg-1 < files) && (ipt[ipt.length-1].files[0]))
                        {
                            pai.insertAdjacentHTML("beforeend", add);
                        }
                        lbl.remove();

                        let pos = 0;
                        pai.querySelectorAll('input').forEach(ipt =>{
                            ipt.id = name +'-'+ pos++;
                            ipt.name = name +'-'+ pos++;
                        });
                    }
                }
            });

            if((!lbl.nextElementSibling) && (qImg < files))
            {
                pai.insertAdjacentHTML("beforeend", add);
            }
        }
    };
    reader.readAsDataURL(newImg);
    z7loading('remover');
};


function z7fotoView(control)
{
    let imagem = $2('.zoom');
    let ampliado = $1('.ampliado');

    imagem.forEach((img, x) =>{
        if(img == ampliado) {
            if(control.classList.contains('fa-chevron-left') && imagem[x-1])
            {
                ampliado.classList.remove('ampliado');
                imagem[x-1].classList.add('ampliado');
            }
            else if (control.classList.contains('fa-chevron-right') && imagem[x+1])
            {
                ampliado.classList.remove('ampliado');
                imagem[x+1].classList.add('ampliado');
            }
        }
    });
}

function z7zoom(z)
{
    if(!$1('.img-control'))
        $1('main').insertAdjacentHTML('beforeend',`<div class='img-control'><i class="btn fas fa-chevron-left" onclick='z7fotoView(this)'></i><i class="btn fas fa-chevron-right" onclick='z7fotoView(this)'></i></div>`);

    z.classList.toggle('ampliado');
    if(document.querySelectorAll('.zoom').length > 1)
    {
        if(z.classList.contains('ampliado'))
            $show('.img-control', 'flex');
        else
            $hide('.img-control');
    }
}

function z7mlEnter(ipt) { ipt.classList.add('focus'); }

function z7mlOut(ipt) { ipt.classList.remove('focus'); if (ipt.value) ipt.classList.remove('empty'); }


////VIEWS - NAVIGATION – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
window.addEventListener('popstate', function(event)
{
    let bck, view = $1('section.block');

    if(typeof z7view_back === 'function')
        bck = z7view_back(view.id);
    else
        bck = false;

    if (bck === null) return;

    if(bck) {
        $hide(view);
        $show('#'+bck);
    }
    else if(!z7viewAnterior(view))
    {
        $navLink('history');
    }
    z7scrollTop();

    view.querySelectorAll('.empty, .invalid').forEach(z=> {
        z.classList.remove('empty', 'invalid');
    });
});


function z7viewAnterior(view)
{
    let irmaoAnterior = view.previousElementSibling;
    while (irmaoAnterior)
    {
        if (irmaoAnterior.tagName === 'SECTION')
        {
            $hide(view);
            $show(irmaoAnterior);
            $naVisible(irmaoAnterior.id);
            return irmaoAnterior;
        }
        irmaoAnterior = irmaoAnterior.previousElementSibling;
    }
    return false;
};

function z7viewSeguinte(view)
{
    let irmaoSeguinte = view.nextElementSibling;
    while (irmaoSeguinte)
    {
        if (irmaoSeguinte.tagName === 'SECTION'){
            $hide(view);
            $show(irmaoSeguinte);
            return irmaoSeguinte.id;
        }
        irmaoSeguinte = irmaoSeguinte.nextElementSibling;
    }
    return false;
};

function z7btn_back(btn)
{
    if((!Z7_Clicar)&&(!btn.classList.contains("disabled")))
    {
        let bck, view = $1('section.block');

        if(typeof z7view_back === 'function')
            bck = z7view_back(view.id);
        else
            bck = false;

        if (bck === null) return;

        if(bck)
        {
            $hide(view);
            $show('#'+bck);
        }
        else if(!z7viewAnterior(view))
        {
            $navLink(null, 'back');
        }
        z7scrollTop();

        view.querySelectorAll('.empty, .invalid').forEach(z=> {
            z.classList.remove('empty', 'invalid');
        })
    }
};

function z7btn_next(btn)
{
    if((!Z7_Clicar)&&(!btn.disabled)&&(!btn.classList.contains('disabled')))
    {
        if(btn.tagName == 'FORM')
        {
            $navLink(btn, 'form');
            return;
        }

        let nxt, view = btn.closest('section') ? btn.closest('section') : btn.parentNode;

        if (!btn.classList.contains('target') && z7inputError(view))
            return;
        else if(typeof z7view_next == 'function')
            nxt = z7view_next(view.id, btn);
        else
            nxt = false;
        if(nxt === null) return;

        if (nxt){
            $hide(view);
            $show('#'+nxt);
        }
        else
        {
            nxt = z7viewSeguinte(view);
        }

        $naVisible(0);
        z7scrollTop();

        // Adicionar a URL atual ao histórico com um título personalizado e uma URL personalizada
        history.pushState(null, document.title, window.location.href);
        return 'sucesso';
    }
};

function $naVisible(show)
{
    if (typeof Z7_Navigation === 'undefined') return;
    if(Z7_Navigation.includes(show))
    {
        $hide('header .btn-back, header .btn-home');

        $show('.logo a', 'flex');
        $show('header .notificacao', 'flex');
        $show('header .btn-cart', 'flex');
        $show('header .btn-user', 'flex');

        $show('.dv-navigation');
        $1('#'+show).classList.add('navMargin');

        let nav = show.replace('tela-','');
        $sets('z7-view', ':first-of-type');
        $sets('z7-navlink', JSON.stringify([nav]));

        let btn = $1(`.dv-navigation .${nav}`) ? $2(`.dv-navigation .${nav}`) : false;
        if(btn)
        {
            btn[0].classList.add('select');
            btn[1].classList.add('select');
        }
    }
    else
    {
        $hide('.logo a');
        // $hide('.mobile header .notificacao');
        // $hide('.mobile header .btn-cart');
        $hide('.mobile header button');

        $hide('.dv-navigation');

        $show('header .btn-back, header .btn-home', 'flex');
    }
};

function $navLink(link, buttons)
{
    Z7_Links = JSON.parse($gets('z7-navlink'));

    let caminhoURL = window.location.pathname;// Obtém o caminho da URL
    let partesDoCaminho = caminhoURL.split('/');// Divide o caminho em partes usando a barra '/'
    let nomeDoArquivo = partesDoCaminho.pop();// Obtém o nome do arquivo (última parte do caminho)

    if(link === 'home' || Z7_Links.length == 0) {
        $sets('z7-navlink', '["home"]');
        $sets('z7-view', ':first-of-type');
        window.location.href = caminhoURL;
        return;
    }
    else if(link === 'reload') {
        buttons ? $sets('z7-view', buttons) : $sets('z7-view', ':first-of-type');
        window.location.reload();
        return;
    }
    else if(link === 'history') {
        Z7_Links.pop();
        $sets('z7-navlink', JSON.stringify(Z7_Links));
        return;
    }

    switch (buttons)
    {
        case 'form':
            $sets('z7-view', ':first-of-type');
            let action = link.getAttribute('value');
            $sets('z7-navlink', JSON.stringify([...Z7_Links, ...[action]]));
            link.method = 'POST';
            link.action = nomeDoArquivo+'?nav='+action;
            link.submit();
        return;
        case 'nav':
            if(link !== Z7_Links[Z7_Links.length-1])
                $sets('z7-navlink', JSON.stringify([...Z7_Links, ...[link]]));
            $sets('z7-view', ':first-of-type');
        break;
        case 'back':
                let back = Z7_Links.pop();
                link = Z7_Links[Z7_Links.length-1];
                $sets('z7-navlink', JSON.stringify(Z7_Links));
                ['perfil', 'carrinho'].includes(back) ? $sets('z7-view', ':first-of-type') : $sets('z7-view', ':last-of-type');
        break;
        default:
            if(link) {
                Z7_Links.push(link);
                $sets('z7-navlink', JSON.stringify(Z7_Links));
                buttons ? $sets('z7-view', buttons) : $sets('z7-view', ':first-of-type');
            }
            else {
                Z7_Links.pop();
                link = Z7_Links[Z7_Links.length-1];
                $sets('z7-navlink', JSON.stringify(Z7_Links));
                $sets('z7-view', buttons);
            }
        break;
    }
    window.location.href = nomeDoArquivo+'?nav='+link;
}

//verifica se os inputs requires estão preenchidos, com val validos, impede o next e mostra msg de erros se existirem
//VALIDATORS - VALIDATORS - VALIDATORS – – – – – – – – – – —————————————————————————————————————————————————————————————————————————————————————————————

function z7cpfMask(z) {
    let caret = z.selectionStart;
    let padrao = /[\d]/;
    let insert = z.value.charAt(z.value.length-1);
    let cpf = z.value.replace(/[\D]/g,'');
    let cpf2 = cpf.split('');

    for (let i = cpf.length; i >= 4 ; i--) {cpf2[i] = cpf2[i-1];}
    for (let i = cpf.length; i >= 7 ; i--) {cpf2[i+1] = cpf2[i];}
    for (let i = cpf.length; i >= 10; i--) {cpf2[i+2] = cpf2[i+1];}

    if (padrao.test(insert))
    {
        if (cpf.length>3) cpf2[3]='.';
        if (cpf.length>6) cpf2[7]='.';
        if (cpf.length>9) cpf2[11]='-';
    }
    else
    {
        if (cpf.length>2){cpf2[3]='.';}
        if (cpf.length>5){cpf2[3]='.'; cpf2[7]='.';}
        if (cpf.length>8){cpf2[3]='.'; cpf2[7]='.'; cpf2[11]='-';}
    }

    z.value = cpf2.join('');
    if (caret<cpf.length)
    {
        z.setSelectionRange(caret, caret);
    }
}
function z7cpfError(z) {

    //Validador de CPF--------------------------------------------------------
    let cpf = z.value.replace(/[\D]/g,'');

    let igual = true
    for (let i = 1; i < 10; i++) {
      if (cpf[i] !== cpf[0]) {
        igual = false; // Se algum caractere for diferente, retorne false.
      }
    }

    if(igual || cpf.substring(0,9) == '123456789')
        return z7invalid(z, true);

    let resto;
    let soma = 0;
    let mult = 10;
    for (let N = 0; N < 1; N++)
    {
        for (let i = 0; i < (9+N); i++){soma += cpf[i] * mult; mult--}
        resto = ((soma * 10) % 11);
        soma = Math.floor((soma * 10)/11);

        if ((resto==10) || (resto==11)){resto=0}

        z7invalid(z, resto != cpf[(9+N)]);

        mult=11; soma=0;
    }
};

function z7telMask(z) {

    let tel = z.value.replace(/[\s()-]/g, '');
    let tel2 = tel.split('');

    for (let i = tel.length; i > 0 ; i--) {tel2[i] = tel2[i-1];}
    for (let i = tel.length; i > 2 ; i--) {tel2[i+2] = tel2[i];}
    for (let i = tel.length; i > 7 ; i--) {tel2[i+3] = tel2[i+2];}
    if (tel.length>0){tel2[0]='(';}
    if (tel.length>2){tel2[0]='('; tel2[3]=')'; tel2[4]=' ';}
    if (tel.length>7){tel2[0]='('; tel2[3]=')'; tel2[4]=' '; tel2[10]='-';}

    z.value = tel2.join('');
}

function z7invalid(z, invalid)
{
    (invalid) ? z.classList.add('invalid') : z.classList.remove('empty', 'invalid');
}

function z7passError(z)
{
    let min = z7att(z, 'min');
    if(min && z.value.length)
    {
        z7invalid(z, (z.value.length < min));
        if(z.classList.contains('invalid'))
        {
            let spn;
            if(z.id || z.name)
                spn = (z.id) ? $1('span.'+z.id) : $1('span.'+z.name);
            if(spn)
                spn.innerText = `A senha precisa ter no minimo ${min} caracteres`;
            return true;
        }
    }
}
function z7telError(z)
{
    let tel = z.value.replace(/[\(\)\s\-]/g, '');

    let telSize = att(z,'tel-size') ? att(z,'tel-size') : 11;

    z7invalid(z, (tel.length != telSize || (/\D/.test(tel))));
}
function z7emailError(z)
{
    let email = z.value.trim();

    let emailPattern = /^[\w.-]+@[\w.-]+\.[a-z]{2,4}(?:\.[a-z]{2})?$/;

    z7invalid(z, !emailPattern.test(email));
}
function z7dateError(z)
{
    function dateParam(bool)
    {
        z7invalid(z, bool);
        z7boxData.querySelectorAll('select').forEach(sel => {
            z7invalid(sel, bool);
        });
    }

    let z7boxData = z.closest('.z7-date');
    let dataMoment = moment(z.value, 'YYYY-MM-DD'); // Cria um objeto Moment a partir da data

    dataMoment.isValid() ? dateParam(false) : dateParam(true);

    // A idade mínima para ser considerado maior de idade
    if(!z.classList.contains('invalid') && z7boxData.hasAttribute('min'))
    {
        //MOMENT JS – – – – – – – – – – ——————————————————————————————————————————————————————————————————————————————————————
        let diffMin = z7boxData.getAttribute('min');
        let atualMoment = moment(); // Cria um objeto Moment para a data e hora atuais
        let diferencaEmAnos = atualMoment.diff(dataMoment, 'years'); // Calcula a diferença entre as datas em anos

        let span
        if(z.id || z.name)
            span = (z.id) ? $1('span.'+z.id) : $1('span.'+z.name);

        if(diferencaEmAnos < diffMin){
            dateParam(true);
            if(span)
                span.innerText = z7att(span, 'min');
        }
        else
            dateParam(false);
    }
}
function z7inputError(view)
{
    let required = view.querySelectorAll(`*[required]`);

    required.forEach(z =>
    {
        if(!z.disabled)
        {
            z.classList.remove('empty', 'invalid');
            z7classError(z);
        }
    });

    if(view.querySelectorAll('.empty, .invalid').length)
    {
        if(view.querySelector('.invalid'))
        {
            z7infobox('Preencha os campos corretamente', 'red');
        }
        else if(view.querySelector('.empty'))
        {
            z7infobox('Preencher campos obrigatórios', 'red');
        }
        let elementoDestino = view.querySelectorAll('.empty, .invalid')[0];
        elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    else
        return false;
};


function z7startClass()
{
    $2('input, select, textarea, fieldset').forEach(elemento =>
    {
        if(elemento.classList.contains('z7-login'))
        {
            elemento.oninput =()=>
            {
                let tel = elemento.value.replace(/[\s()-]/g, ''); //(/[\(\)\s\-]/g, ''); data-agenda
                if((tel.length >= 3)&&(!/[\D]/.test(tel))){
                    z7telMask(elemento)
                    elemento.setAttribute("tipo", "tel");
                }
                else {
                    elemento.setAttribute("tipo", "email");
                }
            };
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-tel'))
        {
            elemento.type = "tel";
            if(elemento.value)
                z7telMask(elemento);
            elemento.oninput =()=> { z7telMask(elemento) };
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-email'))
        {
            if(elemento.value)
                z7emailError(elemento);
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-alfa'))
        {
            elemento.type = 'text';
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-cpf'))
        {
            elemento.type = "tel";
            elemento.maxLength = "14";
            if(elemento.value)
                z7cpfMask(elemento);
            elemento.oninput =()=> { z7cpfMask(elemento); };
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-pass'))
        {
            elemento.type = 'password';
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.classList.contains('z7-data'))
        {
            elemento.onchange =()=> { z7classError(elemento) };
        }
        else if(elemento.hasAttribute('required'))
        {   
            if(['FIELDSET'].includes(elemento.tagName))
            {
                elemento.querySelectorAll('input').forEach((z) =>
                {
                    z.addEventListener('change', ()=>
                    {
                        elemento.classList.remove('empty');
                    });
                });
            }
            else if(['radio','checkbox'].includes(elemento.type))
            {
                let superior = (elemento.closest('fieldset')) ? elemento.closest('fieldset') : elemento.closest('label');
                document.getElementsByName(elemento.name).forEach((z) =>
                {
                    z.addEventListener('change', ()=> { superior.classList.remove('empty'); });
                });
            }
            else
            {
                elemento.addEventListener('change', ()=>{
                    (elemento.value) ? elemento.classList.remove('empty') : elemento.classList.add('empty');
                });
            }
        }
    });
}

// if(['radio','checkbox'].includes(elemento.type))
// {
//     var fieldset = elemento.closest('fieldset') ? elemento.closest('fieldset') : elemento.closest('label');
//     (!fieldset.disabled && !fieldset.disabled) ? fieldset.classList.add('empty') : fieldset.classList.remove('empty');
//     document.getElementsByName(elemento.name).forEach((z) =>
//     {
//         if(z.checked)
//             fieldset.classList.remove('empty');
//     });
// }
// else

function z7classError(elemento)
{
    if(['radio','checkbox'].includes(elemento.type))
    {
        var fieldset = elemento.closest('fieldset') ? elemento.closest('fieldset') : elemento.closest('label');
        (!fieldset.disabled && !fieldset.disabled) ? fieldset.classList.add('empty') : fieldset.classList.remove('empty');
        document.getElementsByName(elemento.name).forEach((z) =>
        {
            if(z.checked)
                fieldset.classList.remove('empty');
        });
    }
    else if(['FIELDSET'].includes(elemento.tagName))
    {
        (!elemento.disabled && !elemento.disabled) ? elemento.classList.add('empty') : elemento.classList.remove('empty');
        elemento.querySelectorAll('input').forEach((z) =>
        {
            if(z.checked)
                elemento.classList.remove('empty');
        });
    }
    else if(elemento.classList.contains('z7-login'))
    {
        let tipo = elemento.getAttribute('tipo');
        (tipo == 'tel') ? z7telError(elemento) : z7emailError(elemento);
    }
    else if(elemento.classList.contains('z7-tel'))
    {
        z7telError(elemento);
    }
    else if(elemento.classList.contains('z7-email'))
    {
        z7emailError(elemento);
    }
    else if(elemento.classList.contains('z7-alfa'))
    {
        let pattern = /[\d]/;
        z7invalid(elemento, pattern.test(elemento.value));
    }
    else if(elemento.classList.contains('z7-pass'))
    {
        z7passError(elemento);
    }
    else if(elemento.classList.contains('z7-data'))
    {
        z7dateError(elemento);
    }
    else if(elemento.classList.contains('z7-cpf'))
    {
        z7cpfError(elemento);
    }
    else if(elemento.classList.contains('z7-moreless') && elemento.hasAttribute('min'))
    {
        if((elemento.value) < z7att(elemento, 'min'))
        {
            elemento.classList.add("empty");
            return;
        }
    }
    else if(elemento.type == 'file' && !elemento.files.length)
    {
        elemento.closest('label').classList.add('empty');
    }
    else if(elemento.id == 'data-agenda')
    {
        let dataAlvo = moment(elemento.value);// Data alvo que você deseja comparar
        let dataAtual = moment();// Data atual

        if(!elemento.value || dataAlvo.isSameOrBefore(dataAtual, 'day'))
            $1('.z7-agenda').classList.add('empty');
    }

    let span;
    if(elemento.id || elemento.name)
        span = (elemento.id) ? $1('span.'+elemento.id) : $1('span.'+elemento.name);

    if(['radio','checkbox'].includes(elemento.type))
    {
        if(fieldset.classList.contains('empty'))
        {
            if(span) 
                span.innerText = z7att(span, 'error');
            return true;
        }
        else if(span){
            span.innerText = null;
        }
    }
    else if(elemento.value)
    {
        elemento.classList.remove('empty');
        if(elemento.classList.contains('invalid'))
        {
            if(span && span.innerText == '')
                span.innerText = z7att(span, 'error');
            return true;
        }
        else
        {
            if(span)
                span.innerText = null;
        }
    }
    else
    {
        if(elemento.required)// && !elemento.hidden
        {
            elemento.classList.add('empty');
            if(span)
                span.innerText = z7att(span, 'error');
            return true;
        }
        else
        {
            elemento.classList.remove('invalid');
            if(span)
                span.innerText = null;
        }
    }
}

function z7morelessEventos(moreless, less, more)
{
    if(!moreless.step) moreless.step = 1;
    if(moreless.value=='') moreless.value=0;
    moreless.addEventListener('input', ()=> { moreless.value = moreless.value.replace(/\.+/g, '.').replace(/[^0-9.]/g,''); });

    less.addEventListener('pointerenter', function(){ z7mlEnter(moreless); });
    less.addEventListener('pointerout', function(){ z7mlOut(moreless); });
    less.addEventListener('click', function() {
        if(moreless.value <=0)
            moreless.value=0;
        else
            moreless.value -= parseInt(moreless.step);

        moreless.classList.remove('empty');
    });

    more.addEventListener('pointerenter', function(){ z7mlEnter(moreless); });
    more.addEventListener('pointerout', function(){ z7mlOut(moreless); });
    more.addEventListener('click', function() {
        if(moreless.value)
            moreless.value = (parseInt(moreless.value) + parseInt(moreless.step));
        else
            moreless.value=0;

        moreless.classList.remove('empty');
    });
}
function z7morelessDinamico(moreless)
{
    let z7_less, z7_more;
    moreless.forEach((z) =>
    {
        z7_less = z.nextElementSibling;
        z7_more = z7_less.nextElementSibling;
        z7morelessEventos(z, z7_less, z7_more);
    });
}

function z7sideMenu() {
    $1('.side-left').classList.toggle('block');
    $1('.side-left-out').classList.toggle('block');
}

function z7sideMenu2() {
    $1('.side-right').classList.toggle('block');
    $1('.side-right-out').classList.toggle('block');
}

//POS-CARREGAMENTO includes – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
document.addEventListener("DOMContentLoaded", function()
{
    if(typeof z7domLoad === "function")
        z7domLoad();

    ////MENU DE NAVEGAÇÃO MOBILE ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    if (typeof Z7_Navigation != 'undefined')
    {
        $1('main').insertAdjacentHTML('beforeend', `<div class='dv-navigation'><div class='dv-bar'></div><div class='dv-nav'></div></div>`);
        Z7_NavButton.forEach((z, x) =>
        {
            let _btnav = (z[0] == 'side-left-in') ? '' : ' btn-nav';
            $1('.dv-navigation .dv-bar').insertAdjacentHTML('beforeend', `<b class='${z[0]}'></b>`);
            $1('.dv-navigation .dv-nav').insertAdjacentHTML('beforeend', `<button class='btn${_btnav} ${z[0]}' value='${z[0]}'><i class='fas fa-${z[1]}'></i></button>`);
        });
    }

    if($1('.side-left-in'))
    {
        $1('.side-left').insertAdjacentHTML('beforebegin',`<div class="side-left-out"></div>`);
        $1('.side-left-in').onclick =()=> { z7sideMenu(); };
        $1('.side-left-out').addEventListener('click', ()=>{ z7sideMenu(); });
        $2('.side-left ul li').forEach(z => {
            z.onclick =()=> {
                $1('.side-left').classList.remove('block');
                $1('.side-left-out').classList.remove('block');
            };
        });
    }

    if($1('.side-right-in'))
    {
        $1('.side-right').insertAdjacentHTML('beforebegin',`<div class="side-right-out"></div>`);
        $1('.side-right-in').onclick =()=> { z7sideMenu2(); };
        $1('.side-right-out').addEventListener('click', ()=>{ z7sideMenu2(); });
        $2('.side-right ul li').forEach(z => {
            z.onclick =()=> {
                $1('.side-right').classList.remove('block');
                $1('.side-right-out').classList.remove('block');
            };
        });
    }

    if ($1('.btn-nav'))
    {
        $2('.btn-nav').forEach((z, x) =>
        {
            z.type = "menu";
            z.addEventListener('click', function()
            {
                if (!z.classList.contains('select'))
                    $navLink(z.value, 'nav');
            });
        });

        if($1('main section'))
            $2('main section').forEach((z, x) =>
            {
                if(!Z7_Navigation.includes(z.id) && !z.querySelector('.btn-next'))
                {
                    let idBtn = z.id.replace('tela-','btn-');
                    z.insertAdjacentHTML('beforeend', `<button class='btn btn-next' id='${idBtn}' value=''>CONTINUAR</button>`);
                }
                if(!Z7_Navigation.includes(z.id))
                    z.insertAdjacentHTML('afterbegin', "<button class='btn-back fas fa-arrow-left'></button>");
            });
    }

    //TELA MOBILE OU PC – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    let view = $1('section'+$gets('z7-view')) ? $1('section'+$gets('z7-view')) : $1('section');

    if(view == null)
        window.location.href = window.location.pathname;

    z7mediaScreen();

    $naVisible(view.id);

    if(view.id.startsWith('tela'))
        $show(view);

    document.body.style.display = "initial";

    var z7_alarm;
    window.visualViewport.addEventListener('resize', ()=>
    {
        clearTimeout(z7_alarm);
        z7_alarm = setTimeout(()=>{ z7mediaScreen() }, 500);
    });

    if ($1('.btn-target'))
    {
        function z7btn_target(target)
        {
            var urlCompleta = window.location.href;

            history.pushState(null, document.title, window.location.href);
            
            // Remove os parâmetros da URL
            var urlSemParametros = urlCompleta.split('?')[0];
            window.location.href = urlSemParametros + target;
        }

        $2('.btn-target').forEach(z =>
        {
            z.addEventListener('click', function()
            {
                z7btn_target(z.value);
            });
        });
    }


    //SENHA - SENHA - SENHA – – – – – – – – – – ————————————————————————————————————————————————————————————————————————————————————————————————————
    if($1('.z7-pass'))
    {
        $2('.z7-pass').forEach((z) =>
        {
            let pai = z.closest('label'); console.log(pai);
            pai.insertAdjacentHTML('afterend', `<i class='fa-regular fa-eye z7-showpass' title='mostrar/ocultar senha'></i>`)
        });

        $2('.z7-showpass').forEach((z,x) =>
        {
            z.addEventListener('click', function()
            {
                const senhaInput = $2('.z7-pass')[x];
                if (senhaInput.type === 'password'){
                    senhaInput.type = 'text';
                    z.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    senhaInput.type = 'password';
                    z.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });
    }

    //DATA SELECT ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    if ($1('.z7-date'))
    {
        let x, s, hoje = new Date();

        $2('.z7-date').forEach((z,num) =>
        {
            if(!s){
                // Crie um elemento de script
                let script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js';
                script.type = 'text/javascript';
                document.head.appendChild(script);
            }

            let z7data = att(z,'value') ? att(z,'value') : `${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}-${String(hoje.getDate()).padStart(2,'0')}`;

            let z7_dataName = att(z,'name') ? att(z,'name') : 'data-'+num;

            let required = z.classList.contains('required') ? 'required' : '';

            z.insertAdjacentHTML('afterbegin', `<input type='date' ${required} class='z7-data' id='${z7_dataName}' name='${z7_dataName}' value='${z7data}' hidden/>`);

            let span = $1('span.'+z7_dataName);
            if(!span)
            {
                span = document.createElement('span');
                span.className = z7_dataName;
                span.setAttribute('error', 'Data inválida')
                z.insertAdjacentElement('afterend', span);
            }
            z7data = z7data.split("-");

            let x = parseInt(z7data[1]);
            let meses = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','OUT','SET','NOV','DEZ'];

            let campos = `<select class='dia' name='dia'><option selected hidden value='${z7data[2]}'>${z7data[2]}</option></select>`;
            campos += `<select class='mes' name='mes'><option selected hidden value='${z7data[1]}'>${meses[x-1]}</option></select>`;
            campos += `<select class='ano' name='ano'><option selected hidden value='${z7data[0]}'>${z7data[0]}</option></select>`;

            z.insertAdjacentHTML('afterbegin', campos);

            //DIA-------------------------------------------------------------------
            let z7_dia = z.querySelector('.dia');

            for (x = 31; x > 0; x--)
            {
                s = String(x).padStart(2,'0');
                z7_dia.insertAdjacentHTML('beforeend', `<option value='${s}'>${s}</option>`);
            }

            //MES-------------------------------------------------------------------
            let z7_mes = z.querySelector('.mes');

            for (x = 11; x >= 0; x--)
            {
                s = String(x+1).padStart(2,'0');
                z7_mes.insertAdjacentHTML('beforeend', `<option value='${s}'>${meses[x]}</option>`);
            }

            //ANO-------------------------------------------------------------------
            let z7_ano = z.querySelector('.ano');

            let ano = hoje.getFullYear();
            for (x = 0; x < 115; x++) {
                z7_ano.insertAdjacentHTML('beforeend', `<option value='${ano}'>${ano--}</option>`);
            }

            let selects = z.querySelectorAll('select');
            selects.forEach(sel =>
            {
                sel.addEventListener('change', ()=>
                {
                    z.querySelector('input').value = `${z7_ano.value}-${z7_mes.value}-${z7_dia.value}`;
                    if(sel.classList.contains('invalid'))
                        z7classError(z.querySelector('input'));
                });
            });
        });
    }


    //ADICIONA FUNÇÃO AOS BTN-NEXT E BTN-NEXT – – – – – – – – – –
    if ($1('.btn-next')) {
        $2('.btn-next').forEach(z => {
            z.addEventListener('click', function()
            {
                z7btn_next(z);
            });
        });
    }

    if ($1('form.btn-next')) {
        $2('form.btn-next input').forEach(z => {
            z.type='hidden';
        });
    }

    if ($1('.btn-back')) {
        $2('.btn-back').forEach(z => {
            z.addEventListener('click', function()
            {
                z7btn_back(z);
            });
        });
    }


    //NUMBER - MORE - LESS – – – – – – – – – – ———————————————————————————————————————————————————————————————————————————————— z7btn_number()
    if($1('.z7-moreless'))
    {
        let z7_more, btn_more = "<button value='1' class='more' type='button'>+</button>";
        let z7_less, btn_less = "<button value='1' class='less' type='button'>–</button>";

        $2('.z7-moreless').forEach((moreless) =>
        {
            if(moreless.classList.contains('z7-moreless'))
            {
                moreless.type = 'number';
                moreless.insertAdjacentHTML('afterend', `${btn_less+btn_more}`);
                z7_less = moreless.nextElementSibling;
                z7_more = z7_less.nextElementSibling;
                z7morelessEventos(moreless, z7_less, z7_more);
            }
        });
    }


    //IMAGENS DO IMPUT Z7-IMAGEM ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //FOTOS SELECT ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    if ($1('.z7-file'))
    {
        $2('.z7-file').forEach((z, x) =>
        {
            let name = z7att(z, 'name') ? z7att(z, 'name') : 'file-' + x;
            let qImg = z.querySelectorAll('img').length;
            let files = z7att(z, 'files');
            let required = z.classList.contains('required') ? 'required' : '';

            if(!files)
            {
                if(typeof Z7_files === 'number')
                {
                    z.setAttribute('files', Z7_files);
                    files = Z7_files;
                }
                else
                    files = 1;
            }

            let icon = z7att(z, 'img') ? z7att(z, 'img') : 'plus';

            z.querySelectorAll('img').forEach(img =>
            {
                img.addEventListener('click', () =>
                {
                    if(!img.classList.contains('disabled'))
                        if (confirm('Deseja apagar esta foto?'))
                        {
                            let imgsNow = z.querySelectorAll('img').length;
                            let ipt = z.querySelectorAll('input');

                            if(((imgsNow <= files) && (!ipt.length)) || (ipt[ipt.length-1].files[0]))
                            {
                                let add = `<label><img src='/zero7/icon/${icon}.png'/><input type='file' ${required} onclick='z7fileClick(this)' onchange='z7fotoChange(this)'/></label>`;
                                z.insertAdjacentHTML("beforeend", add);

                                let pos = 0;
                                z.querySelectorAll('input').forEach(ipt =>{
                                    ipt.id = name +'-'+ pos++;
                                    ipt.name = name +'-'+ pos++;
                                });
                            }
                            img.closest('label').remove();
                        }
                });
            });

            if(files == 1)
                z.classList.add('block');
            if(qImg < files)
            {
                let src = z7att(z, 'value') ? z7att(z, 'value') : `/zero7/icon/${icon}.png`;
                z.insertAdjacentHTML('beforeend', `<label><img src='${src}'/><input type='file' ${required} id='${name}-${qImg}' name='${name}-${qImg}' onclick='z7fileClick(this)' onchange='z7fotoChange(this)'/></label>`);
            }
        });
    }

    const userMenu = $1('.user-menu');
    const btnUser = $1('.btn-user');
    if (userMenu && btnUser)
    {
        // Abre ou fecha o menu quando o botão de alternância é clicado
        btnUser.addEventListener('click', () => { userMenu.classList.toggle('open'); });
        // Função para detectar cliques fora do elemento
        document.addEventListener('pointerdown', function(event) {
            if(userMenu.classList.contains('open'))
            {
                if (!userMenu.contains(event.target) && !btnUser.contains(event.target)){
                    userMenu.classList.remove('open');
                }
            }
        });
    }


    //EDITOR DE TEXTO ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    if($1('.z7-editor'))
    {
        $2('.z7-editor').forEach(z =>
        {
            let inserir = `<div class='regua'>
                <button value='bold' type='button'>Negrito</button>
                <button value='italic' type='button'>Italico</button>
            </div>`;

            z.querySelector('.texto').insertAdjacentHTML('beforebegin', inserir);
            z.querySelector('.texto').contentEditable = true;

            z.querySelectorAll('.regua button').forEach(z =>
            {
                z.addEventListener('click', () =>
                {
                    let editor = z.closest('.z7-editor');

                    editor.querySelector('.texto').focus();
                    document.execCommand(`${z.value}`, false, null);
                    editor.querySelector('.texto').focus();
                });
            });
        });
    }

    if ($1('.z7-zoom'))
    {
        $2('.z7-zoom').forEach(z =>
        {
            z.classList.add('zoom');
            z.addEventListener('click', ()=>
            {
                z7zoom(z);
            });
        });
    }

    z7startClass();

    if($1('.btn-whats'))
    {
        let msg;
        $2('.btn-whats').forEach(z =>
        {
            msg = z.value;
            z.addEventListener('click', () => { z7whatsapp(msg); });
        });
    }


    //BUTTON TYPE BUTTON – – – – – – – – – – —————————————————————————————————————————————————————————————————————————————————————————————
    if($1('button'))
    {
        $2('button').forEach(z => {
            if(!z.closest('form'))
                z.type='button';
        });
    }


    //Concordo do Termo------------------------------
    if($1('.btn-concordo')){
        $1('.btn-concordo').addEventListener('change', function()
        {
            $opc('.btn-confirm', this.checked)
        });
    }

    if(!z7getl('aceitaCookie'))
    {
        z7avisoCookies();
    }
});
