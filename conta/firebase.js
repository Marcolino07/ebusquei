// Configuarção Firebase do projeto cadastrado
const app = firebase.initializeApp({
    apiKey: "AIzaSyBNdRaAgdhTy635_IKmiecd4_TRrq0Kmkk",
    authDomain: "marcolimpo-07.firebaseapp.com",
    projectId: "marcolimpo-07",
    storageBucket: "marcolimpo-07.appspot.com",
    messagingSenderId: "376562656396",
    appId: "1:376562656396:web:ab424b8ea928f9f02487a9"
});

app.auth().languageCode = 'pt-BR';


//LOGIN COM TELEFONE------------------------------------------------------------------------------------------------------------------------------------
function registerTel(btn, phoneNumber, appVerifier)
{
    z7loading();

    let email = $1("#email").value ? `&email=${$1("#email").value}` : '';
    z7ajax(`../verify.php`, 'verify&tel='+phoneNumber+email, function(response)
    {
        if(response == 'success')
        {
            app.auth().signInWithPhoneNumber('+55'+phoneNumber, appVerifier)
            .then((confirmationResult) => {// SMS enviado. Solicite ao usuário que digite o código da mensagem e conclua o cadastro
                window.confirmationResult = confirmationResult;
                window.verificationId = confirmationResult.verificationId;
                z7btn_next(btn);
                z7loading(true);
            })
            .catch((error) => {// Retorna erro se o telefone não estiver corretamente formatado
                console.log(error);
                z7loading(true);
            });
        }
        else
        {
            if(response == 'tel-existe')
                $1('span.telefone').innerHTML = z7att('span.telefone', response);
            else if(response == 'email-existe')
                $1('span.email').innerHTML = z7att('span.email', response);

            z7infobox('Já existe uma conta com este telefone e/ou email', 'red');
            z7loading('remover');
        }
    });
}

function tokenConfirm(tokenConfirmado) {
    z7loading();
    // Enviar o token preenchhido pelo usuario para verificar se esta correto
    window.confirmationResult.confirm(tokenConfirmado)
    .then(result =>{//Retorna usuario cadastrado no firebase

        const user = result.user;// Obter o login do usuário
        user.updateProfile({displayName: $1('#nome').value + ' ' + $1('#sobrenome').value});
        cadastrarUsuario(user.uid);
        z7loading('remover');
    })
    .catch(error =>{ // grecaptcha.reset(window.recaptchaWidgetId);
        console.log(error);
        if(error.code == 'auth/invalid-verification-code')
            $1('.tokenInput').innerHTML = z7att('.tokenInput', 'error');
        z7loading('remover');
    });
}

function resetTel(tel, appVerifier) {
    if(z7classError(tel))
        return;
    z7loading(5);

    let telefone = tel.value.replace(/\D/g,'');
    z7ajax(`../verify.php`, 'reset&tel='+telefone, function(response)
    {
        if(response.length == 64)
        {
            $1('#resetConfirm').disabled = true;
            window.Token = response;
            app.auth().signInWithPhoneNumber('+55'+telefone, appVerifier)
            .then((confirmationResult) => {// SMS enviado. Solicite ao usuário que digite o código da mensagem e conclua o cadastro
                window.confirmationResult = confirmationResult;
                window.verificationId = confirmationResult.verificationId;
                $hide('#tela-reset');
                $show('#tela-token', 'flex');
            })
            .catch((error) => {// Retorna erro se o numero não estiver corretamente formatado
                $hide('#tela-flutuante');
                infoErro(error.code);
            });
        }
        else
        {
            $1('.resetInput').innerHTML = z7att($1('.resetInput'), response);
            z7loading('remover');
            $1('#resetConfirm').disabled = true;
        }
    });
}


function resetToken(tokenConfirmado) {
    z7loading();
    // Enviar o token preenchhido pelo usuario para verificar se esta correto
    window.confirmationResult.confirm(tokenConfirmado)
    .then(result =>{//Retorna usuario cadastrado no firebase
        const user = result.user;// Obter o login do usuário
        let tkn = window.Token ? window.Token : 'expired';
        window.location.href = `../redefinir/redefinition.php?key=${tkn}`;
    })
    .catch(error =>{ // grecaptcha.reset(window.recaptchaWidgetId);
        console.log(error);
        if(error.code == 'auth/invalid-verification-code')
            $1('.tokenInput').innerHTML = z7att('.tokenInput', 'error');
        z7loading('remover');
    });
}


function infoErro(error) {
    let info;
    switch (error)
    {
        case 'auth/too-many-requests': info = 'Tentativas excedidas, tente novamente mais tarde' ; break;
        case 'auth/invalid-email': info = 'Email inválido' ; break;
        case 'auth/invalid-login-credentials': info = 'Login e/ou senha inválidos' ; break;
        case 'auth/user-not-found': info = 'Usuario não encontrado' ; break;
        case 'auth/email-already-in-use': info = 'Este email ja está em uso' ; break;
        case 'auth/invalid-verification-code': info = 'Código de verificação inválido' ; break;
        case 'auth/code-expired': info = 'Código de verificação expirado' ; break;
        default: break;
    }
    z7infobox(info);
}

function cadastrarUsuario(id_auth)
{
    z7loading();
    const usuario = {
        id_auth: id_auth,
        nome: $1("input[name='nome']").value,
        sobrenome: $1("input[name='sobrenome']").value,
        telefone: $1("input[name='telefone']").value,
        email: $1("input[name='email']").value,
        senha: $1("input[name='senha']").value,
        nascimento: $1("input[name='nascimento']").value,
    }
    z7ajax(`/conta/cadastro/cadastrar.php`, JSON.stringify(usuario), function(response)
    {
        console.log(response);
        if(response == 'success')
        {
            $show('#tela-sucesso', 'flex');
        }
        else{
            console.log(response);
            z7loading('remover');
        }
    });
}

function loginConta(login, pass) {
    z7loading();
    $1('.error').innerHTML = null;
    const usuario = {login: login, senha: pass};
    z7ajax(`/conta/login/logar.php`, JSON.stringify(usuario), function(response)
    {
        if(response == 'success'){
            window.location.href = "/painel/";
        }
        else{
            $1('span.error').innerText = z7att('span.error', 'error');
            z7loading(true);
        }
    });
}

document.addEventListener('DOMContentLoaded', function()
{
    const userPass = $1("input[name='senha']");
    const tokenInput = $1("#tokenInput");

    if($1('#captcha'))
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha', { 'size': 'invisible' });

    if($1('#tela-login'))
    {
        const userLogin = $1("input[name='login']");

        $1('#btn-avancar').addEventListener('click', function()
        {
            view = this.closest('section');
            if(z7inputError(view))
                return;
            loginConta(userLogin.value, userPass.value);
        });

        const resetInput = $1("#resetInput");
        $1("#resetConfirm").addEventListener('click', function()
        {
            resetTel(resetInput, window.recaptchaVerifier);
        });

        $1("#tokenConfirm").addEventListener('click', function()
        {
            resetToken(tokenInput.value);
        });
    }
    else
    {
        const userLogin = $1("input[name='telefone']");
        $1('#btn-avancar').addEventListener('click', function()
        {
            view = this.closest('section');
            if(z7inputError(view))
                return;
            let telefone = userLogin.value.replace(/\D/g,'');
            registerTel(this,telefone, window.recaptchaVerifier);
        });

        $1('#tokenConfirm').addEventListener('click', ()=>
        {
            tokenConfirm(tokenInput.value);
        });
    }
});