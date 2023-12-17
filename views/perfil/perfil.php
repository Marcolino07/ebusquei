<?php
    $sql = "SELECT * FROM usuario WHERE id = ".$_SESSION['id_usuario'];
    $cmd = $GLOBALS['pdo']->query($sql);

    $u = $cmd->fetch(PDO::FETCH_OBJ);

    $u->nascimento = $u->nascimento ?? '';
?>

<!--===========================AGENDAR=============================================-->
<section id="tela-perfil">
<h1>Configurações de Perfil</h1>


    <div class="x2">
        <p>
            <label for="nome">Nome
                <input class="z7-alfa" id="nome" name="nome" value='<?php echo $u->nome; ?>' autocomplete="name" required/>
            </label>
            <span class='nome' error='Insira um nome válido'></span>
        </p>
        <p>
            <label for="sobrenome">Sobrenome
                <input class="z7-alfa" id="sobrenome" name="sobrenome" value='<?php echo $u->sobrenome; ?>' autocomplete="family-name"/>
            </label>
            <span class='sobrenome' error='Insira um sobrenome válido'></span>
        </p>
    </div>

    <div>
        <label for="email">E-Mail
            <input class="z7-email" id='email' name="email" autocomplete="email" value='<?php echo $u->email; ?>'/>
        </label>
        <span class='email' error='É necessário inserir um email válido'></span>
    </div>

    <label for="nascimento">Data de nascimento</label>
    <div class='z7-date required' name='nascimento' min='10' value='<?php echo$u->nascimento; ?>'></div>

    <div>
        <label>Senha</label><br>
        <span id='btn-senha'>Alterar senha</span>
    </div>

    <button class='btn btn-next' id='salvar-perfil' value='send'>SALVAR ALTERAÇÕES</button>

</section>

<div id='tela-flutuante'>
    <div>
        <!-- <p> -->
            <i class='fa-solid fa-close' onclick="fechar('#tela-flutuante')"></i>
        <!-- </p> -->

        <div id='dv-senha'>
            <h2>Alterar senha</h2>
            <div>
                <label for="senha">Senha atual
                    <input class="z7-pass" id="senha-atual" name="senha-atual" type="password" placeholder='Digite a senha atual' required/>
                </label>
            </div>
            <span class='senha-atual'
                empty='É necessário inserir a senha atual'
                incorreta='A senha atual está incorreta'>
            </span>

            <div>
                <label for="nova-senha">Nova senha
                    <input class="z7-pass" id="nova-senha" name="nova-senha" type="password" placeholder='Digite a nova senha' required/>
                </label>
            </div>
            <span class='nova-senha'
                minimo='A senha precisa ter no minimo 6 caracteres'
                repetida='A nova senha deve ser diferente da senha atual'>
            </span>

            <div>
                <label for="confirmar-senha">Confirmação de senha
                    <input class="z7-pass" id="confirmar-senha" name="confirmar-senha" type="password" placeholder='Confirme a nova senha' required/>
                </label>
            </div>
            <span class='confirmar-senha'
                diferente='Confirmação de senha inválida'>
            </span>

            <button class='btn full' id='salvar-senha' name='salvar-senha'>Salvar nova senha</button>
        </div>
    </div>
</div>