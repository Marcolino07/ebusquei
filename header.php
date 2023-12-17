<header class="header">
    <nav>
        <div class="logo">
            <a href='/'><img src='/img/ebusquei/logo-2.png'/></a>
            <button class='btn-back'><i class='fa-solid fa-arrow-left'></i></button>
        </div>

        <?php if($logado) {?>

            <div>
                <button class='btn-user'>
                    <span> <?php if(!isset($_SESSION))session_start(); echo$_SESSION['nome']; ?></span><img src="/img/icon-user.gif" alt="" style="border-radius: 30px; margin-left: 15px; width: 3vw">
                </button>
                <button class='btn-nav btn-home' value='home'>
                    <span>Home</span><i class="fa-solid fa-home"></i>
                </button>
            </div>

        <?php }else{ ?>

            <div>
                <a class="btn-entrar" href="/conta/">
                    <span>Entrar</span><i class="fa-solid fa-arrow-right-to-bracket"></i>
                </a>
            </div>

        <?php } ?>
    </nav>
    <ul class="user-menu">
        <li>
            <button class='btn-nav' value="perfil">
                <i class="fa-solid fa-circle-user"></i> Minha conta
            </button>
        </li>
        <li>
            <a href="/conta/logout/"><button type='button'><i class="fa-solid fa-right-from-bracket"></i> Sair</button></a>
        </li>
    </ul>
</header>