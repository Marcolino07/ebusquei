// Configuarção Firebase do projeto cadastrado
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyBNdRaAgdhTy635_IKmiecd4_TRrq0Kmkk",
//     authDomain: "marcolimpo-07.firebaseapp.com",
//     projectId: "marcolimpo-07",
//     storageBucket: "marcolimpo-07.appspot.com",
//     messagingSenderId: "376562656396",
//     appId: "1:376562656396:web:ab424b8ea928f9f02487a9"
// });

//deslogar usuario -------------------------------------------------------------
// app.auth().onAuthStateChanged((user) => {
//     if(!user)
//         window.location.href = '/';
// });


if(!$gets('z7-navlink'))
{
    $sets('z7-navlink', '["home"]');
    $sets('z7-view', ':first-of-type');
}
var Z7_Links = JSON.parse($gets('z7-navlink'));
var Z7_NavButton = [['buscar','magnifying-glass-dollar'],['notificacao','bell'],['lista','list-check'],['home','home']];
var Z7_Navigation = ['tela-notificacao', 'tela-lista', 'tela-home'];

function news()
{
    const ajxNews = new XMLHttpRequest();
    ajxNews.onload = function()
    {
        let notify = $2('button.notificacao');
        notify[0].style.setProperty("--news", this.response);
        notify[1].style.setProperty("--news", this.response);
    };
    ajxNews.open('GET','./news.php');
    ajxNews.send();
};

function bestPrice(val) {
    val.classList.remove('tred');
    val.classList.add('tgreen');
}

function worsePrice(val) {
    val.classList.remove('tgreen');
    val.classList.add('tred');
}

function Comparar(vals)
{
    let menorValor = Math.min(...vals);

    vals.forEach((val, x) => {
        if(val == menorValor)
            bestPrice($2('#dv-total button')[x]);
        else
            worsePrice($2('#dv-total button')[x]);
    });
}


function goMerc(btn)
{
    let link = att(btn, 'go');
    let nome = att(btn, 'nome');

    z7confirm(`Você será redirecionado para o site ${nome}.<br>Deseja continuar?`)
    .then(()=>{
        window.open(link, '_blank');
    })
};

function removerAcentos(texto) {
    const comAcentos = 'áàãâêéèẽíìîĩòóõôùúũûçÁÀÃÂÉÊÈẼÍÌĨÎÓÔÒÕŨÚÙÛÇ ';
    const semAcentos = 'aaaaeeeeiiiioooouuuucAAAAEEEEIIIIOOOOUUUUC_';

    const regex = new RegExp(`[${comAcentos}]`, 'g');

    const textoSemAcentos = texto.replace(regex, (match) => semAcentos[comAcentos.indexOf(match)]);

    return textoSemAcentos.toLowerCase();
}

////HEADER ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
document.addEventListener('DOMContentLoaded', function()
{

});