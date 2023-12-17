document.addEventListener('DOMContentLoaded', function()
{
    $2(".mode-phone").forEach(el =>
    {
        el.addEventListener('click', ()=> {
            $hide('.conteudo');
            $show(el.value, 'flex');
        });
    });

    $1('#btn-logar').addEventListener('click', ()=>
    {
        $2('#sign-in input').forEach(z => {
            if(z.value)
                z.classList.remove('invalid');
            else
                z.classList.add('invalid');
        });

        let email = $1('#sign-in #email').value;
        let senha = $1('#sign-in #senha').value;

        if(!email || !senha)
        {
            $1('.error-login').innerHTML = '<span class="tred">Preencha os campos para prosseguir</span>';
            return;
        }

        z7ajax('logar.php', 'email='+email+'&senha='+senha, function(response) {
            if (response == 'success'){
                window.location.href = '/painel.php';
            }
            else
            {
                $1('.error-login').classList.add('tred');
                $1('.error-login').innerText = response;
            }
        })
    });

    $1('#btn-cadastrar').addEventListener('click', ()=>
    {
        $2('#sign-up input').forEach(z => {
            if(z.value)
                z.classList.remove('invalid');
            else
                z.classList.add('invalid');
        });

        let nome = $1('#sign-up #nome').value;
        let sobrenome = $1('#sign-up #sobrenome').value;
        let email = $1('#sign-up #email-2').value;
        let senha = $1('#sign-up #senha-2').value;

        if(!nome || !sobrenome || !email || !senha)
        {
            $1('.error-cad').innerHTML = '<span class="tred">Preencha os campos para prosseguir</span>';
            return;
        }

        z7ajax('cadastrar.php', 'nome='+nome+'&sobrenome='+sobrenome+'&email='+email+'&senha='+senha, function(response)
        {
            console.log(response);
            if (response == 'success'){
                window.location.href = '/painel.php';
            }
            else
            {
                $1('.error-cad').classList.add('tred');
                $1('.error-cad').innerText = response;
            }
        })
    });

    document.getElementById('sign-in-call-btn').addEventListener('click', () => {
        const cover = document.getElementById('cover');
        cover.classList.add('right');
        cover.classList.remove('left');

        const signin = document.getElementById('sign-in-call');
        signin.classList.add('hide');

        const signup = document.getElementById('sign-up-call');
        signup.classList.remove('hide');

        $2('.invalid').forEach(z => {
            z.classList.remove('invalid');
        });

        $1('.error-cad').innerText = 'Cadastre o seu email';
    })

    document.getElementById('sign-up-call-btn').addEventListener('click', () => {
        const cover = document.getElementById('cover');
        cover.classList.add('left');
        cover.classList.remove('right');

        const signin = document.getElementById('sign-in-call');
        signin.classList.remove('hide');

        const signup = document.getElementById('sign-up-call');
        signup.classList.add('hide');

        $2('.invalid').forEach(z => {
            z.classList.remove('invalid');
        });

        $1('.error-login').innerText = 'Use a sua conta';
    })
});
