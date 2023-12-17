<?php
    if(empty($_SESSION)) session_start();

    $_SESSION['admin'] = true;
    $lado = 'admin';
    $title = 'Admin | Marcolimpo';
    require_once ('../global/global-head.php');

    // if(isset($_SESSION['logado']))
    // {
    //     if ($_SESSION['logado'] == false) header('Location: /admin/');
    // }
    // else header('Location: /admin/');

?>
<body>

    <aside class='side-left'>
        <?php
            file_exists("$pag/$pag-left.php") ? include("$pag/$pag-left.php") : include ('admin-left.php');
        ?>
    </aside>
    <main>
        <?php
            if(isset($_GET['nav']))
            {
                $pag = $_GET['nav'];

                if(file_exists("views/$pag/$pag.php"))
                {
                    require_once("views/$pag/$pag.php");
                }
                else if(file_exists("../global/$pag/$pag.php"))
                {
                    require_once("../global/$pag/$pag.php");
                }
                else if(file_exists("../public/$pag/$pag.php"))
                {
                    require_once("../public/$pag/$pag.php");
                }
                else{
                    require_once('views/erro/erro.php');
                }
            }
            else
            {
                $pag = 'orcamentos';
                include("$pag/$pag.php");
            }
        ?>
    </main>
    <aside class='side-right'>
        <?php
            file_exists("$pag/$pag-right.php") ? include("$pag/$pag-right.php") : include ('admin-right.php');
        ?>
    </aside>
</body>
</html>

