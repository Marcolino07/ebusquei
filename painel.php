<?php
    if(!isset($_SESSION)) session_start();


$_SESSION['id_usuario'] = 1;

    if(!isset($_SESSION['id_usuario']))
        header('location: /conta/');

    $lado = 'public';
    $title = 'E-bu$quei';
    require_once ('head.php');
?>
<body>
    <?php include ('header.php');?>

    <aside class='side-left'>
        <?php
            file_exists("views/$nav/$nav-left.php") ? include("views/$nav/$nav-left.php") : include ('side-left.php');
        ?>
    </aside>wefewfwefefwwefwef
    <main>
        <?php
            if(isset($_GET['nav']))
            {
                $nav = $_GET['nav'];
            }

            if(file_exists("views/$nav/$nav.php"))
            {
                require_once("views/$nav/$nav.php");
            }
            else{
                require_once('views/home/home.php');
            }
        ?>
    </main>
    <aside class='side-right'>
        <?php
            file_exists("views/$nav/$nav-right.php") ? include("views/$nav/$nav-right.php") : include('side-right.php');
        ?>
    </aside>
</body>
</html>




