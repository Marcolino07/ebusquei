<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>Login | Ebusquei</title>
    
    <link rel="stylesheet" href="style.css">
    <script src="/zero7/zero7.js"></script>
    <link rel="stylesheet" href="/zero7/zero7.css">
    <script src="./script.js"></script>
    <link  rel='stylesheet' href="/api/fontawesome/css/all.min.css"></link>
    <style>
        body {
  font-family: Arial, sans-serif;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
#myModal{
    z-index: 2000;
}
.button-style{
    height: 3rem;
    margin: 1rem auto;
    text-align: center;
    border-radius: var(--radius-1);
    border: none;
    color: #fff;
    background-color: rgb(2, 174, 2)!important;
}

    </style>
</head>

<body>
    <main class="flex">
        <div class="card container-mobile">
            <div id="entrarConta" class="conteudo">
                <section class="form-section" id="sign-in">
                    <a href="/"><img src="logo2.png" alt="" class="logo"></a>
                    <h1 class="title">Entrar</h1>
                    <div class="form">
                        <span class="subtitle error-login">ou use a sua conta</span>
                        <input class="form-field z7-email" type="text" id='email' name='email' placeholder="Email">
                        <div class="dv-pass">
                            <label for="senha">
                                <input class="form-field z7-pass" type="password" id='senha' name='senha' placeholder="Senha">
                            </label>
                        </div>
                        <div class="actions">
                            <a class="forgot-password" id="openModalBtn">Esqueceu a senha?</a>
                            <button id='btn-logar' class="form-btn">
                                entrar
                            </button>

                            <button id='nao-tenho' class="form-btn mode-phone" value="#criarConta">
                                Quero criar uma conta
                            </button>
                        </div>
                    </div>
                </section>
            <div id="myModal" class="modal" id='tela-flutuante'>
    <div class="modal-content" id='dv-senha'>
        <span class="close" id="closeModalBtn">&times;</span>
        <h2>Esqueci Minha Senha</h2>
        <form id="resetPasswordForm">
            <label for="email" class='block' style="color: #0069e0; font-size: 1rem">Email:</label>
            <input class='z7-email' type="email" id="reset-email" name="email" required style="height: 3rem">

            <button class='btn-next' type="button" onclick="resetPass()" style="height: 3rem;
            width: 12rem;
            margin: 1rem auto;
            text-align: center;
            border-radius: var(--radius-1);
            border: none;
            color: #fff;
            background-color: rgb(2, 174, 2)!important;">Redefinir Senha</button>
        </form>
    </div>
    </div>
        </div>
            <div id="criarConta" class="conteudo">
                <div class="form-section" id="sign-up">
                    <a href="/"><img src="logo2.png" alt="" class="logo"></a>
                    <h1 class="title">Criar Conta</h1>

                    <div class="form">
                        <span class="subtitle error-cad">ou utilize o seu email</span>
                        <div class='x2'>
                            <input class="form-field" type="text" id='nome' name='nome' placeholder="Nome">
                            <input class="form-field" type="text" id='sobrenome' name='sobrenome' placeholder="Sobrenome">
                        </div>
                        <input class="form-field z7-email" type="text" id='email-2' name='email-2' placeholder="Email">
                        <div class="dv-pass">
                            <label for="senha-2">
                                <input class="form-field z7-pass" type="password" id='senha-2' name='senha-2' placeholder="Senha">
                            </label>
                        </div>
                        <div class="actions">
                            <button id='btn-cadastrar' class="form-btn">
                                Criar conta
                            </button>

                            <button id='ja-tenho' class="form-btn mode-phone" value="#entrarConta">
                                Já tenho uma conta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="call" id="sign-in-call" class="show" class="content">
                <h1 class="title">Bem-vindo de volta!</h1>
                <span class="subtitle">Se mantenha conectado fazendo login <br> com as suas informações!</span>
                <button class="call-btn" id="sign-in-call-btn">Já tenho conta</button>
            </div>
            <div class="call hide" id="sign-up-call" class="show" class="content">
                <h1 class="title">Olá, Buscador(a)!</h1>
                <span class="subtitle">Insira algumas informações e comece <br> a sua jornada conosco!</span>
                <button class="call-btn" id="sign-up-call-btn">Quero criar uma conta</button>
            </div>
            <div id="cover"></div>
        </div>
    </main>
    <!-- <script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script> -->
    <script src="./iconify-icon.min.js"></script>
    <script>
        // Abrir modal
        document.getElementById("openModalBtn").onclick = function() {
            $show("#myModal");
        }

        // Fechar modal
        document.getElementById("closeModalBtn").onclick = function() {
            $hide("#myModal");
        }

        // Fechar modal clicando fora dela
        window.onclick = function(event) {
            if (event.target === document.getElementById("myModal")) {
                $hide("#myModal");
            }
        }
        // Função para redefinir a senha (substitua com a lógica real do backend)
        function resetPass() {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(regexEmail.test($1('#reset-email').value))
            z7dialog('Um link de redefinição de senha foi enviado para o seu email')
            .then(()=>{
                $hide("#myModal");
            })
        }
    </script>
</body>

</html>