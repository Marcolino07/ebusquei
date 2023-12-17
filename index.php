<?php
    if(!isset($_SESSION)) session_start();

    if(isset($_SESSION['id_usuario']))
        header('location: /painel.php');

    $lado = 'public';
    $title = 'E-bu$quei';
    require_once('head.php');
?>
<style>
    :root{
    --sideLeft: 0%;
    --color: aqua;
}
</style>
<body>
    <?php include ('header.php');?>

    <main>
        <?php
            require_once('views/home/home.php');
        ?>
    </main>
    <aside class='side-right'>
        <?php
            file_exists("views/$nav/$nav-right.php") ? include("views/$nav/$nav-right.php") : include('side-right.php');
        ?>
    </aside>
</body>
</html>
