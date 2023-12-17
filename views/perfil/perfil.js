// Configuarção Firebase do projeto cadastrado
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyBNdRaAgdhTy635_IKmiecd4_TRrq0Kmkk",
//     authDomain: "marcolimpo-07.firebaseapp.com",
//     projectId: "marcolimpo-07",
//     storageBucket: "marcolimpo-07.appspot.com",
//     messagingSenderId: "376562656396",
//     appId: "1:376562656396:web:ab424b8ea928f9f02487a9"
// });

function z7view_next(btn)
{
    perfil_update();
    return null;
}

function perfil_update()
{
    let user = {
        nome: $1('#nome').value,
        sobrenome: $1('#sobrenome').value,
        email: $1('#email').value,
        nascimento: $1('#nascimento').value
        // telefone: $1('#telefone').value,
    }

    z7ajax(`/views/perfil/alterar-perfil.php`, JSON.stringify(user), function(response)
    {
        console.log(response);
        if(response == 'success')
        {
            z7infobox('Perfil Alterado com sucesso', 'green');
            $1('#salvar-perfil').disabled = true;
        }
    });
};


function telaSenhaReset()
{
    $2('#tela-flutuante input').forEach(z =>
    {
        z.value = null;
        if($1('.'+z.id))
            $1('.'+z.id).innerHTML = '';
        z.classList.remove('empty','invalid');
    });
    $hide('#tela-flutuante, #dv-telefone, #dv-senha, #dv-token');
}


document.addEventListener('DOMContentLoaded', function()
{
    $1('#btn-senha').onclick = ()=>{
        $show('#tela-flutuante','flex');
        $show('#dv-senha');
    }

    $1('.fa-close').onclick = ()=>{
        telaSenhaReset();
    }

    $1('#salvar-senha').onclick = function()
    {
        let atual = $1('#senha-atual');
        let nova = $1('#nova-senha');
        let confirmar = $1('#confirmar-senha');

        $2('.senha-atual, .nova-senha, .confirmar-senha').forEach(z =>
        {
            z.innerHTML = null;
        });

        if(!atual.value){
            $1('.'+atual.id).innerHTML = z7att('.'+atual.id, 'empty'); return
        }
        if(atual.value.length < 6){
            $1('.'+atual.id).innerHTML = z7att('.'+atual.id, 'incorreta'); return
        }
        if(atual.value == nova.value){
            $1('.'+nova.id).innerHTML = z7att('.'+nova.id, 'repetida'); return
        }
        if(nova.value !== confirmar.value){
            $1('.'+confirmar.id).innerHTML = z7att('.'+confirmar.id, 'diferente'); return
        }
        if(nova.value.length < 6){
            $1('.'+nova.id).innerHTML = z7att('.'+nova.id, 'minimo'); return
        }

        z7ajax(`/views/perfil/alterar-perfil.php`, `senha-atual=${atual.value}&nova-senha=${nova.value}`, function(response)
        {
            if(response == 'success')
            {
                $2('#tela-flutuante input').forEach(z =>
                {
                    z.value = null;
                    if($1('.'+z.id))
                        $1('.'+z.id).innerHTML = '';
                });
                $hide('#tela-flutuante');
                z7infobox('Senha alterada com sucesso', 'green');
            }
            else {
                $1('.senha-atual').innerHTML = z7att('.senha-atual', response);
            }
        });
    }
});