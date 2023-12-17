<?php
    require($_SERVER['DOCUMENT_ROOT'].'/pdo.php');

    if(isset($_SESSION['id_usuario']))
        $logado = true;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>

<meta charset="UTF-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<link rel="shortcut icon" type="image/x-icon" href="/img/ebusquei/logo.png"/>


<script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.3/min/tiny-slider.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css">
<link  rel='stylesheet' href="/api/fontawesome/css/all.min.css"></link>

<script src='https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js'></script>
<script src='https://www.gstatic.com/firebasejs/10.4.0/firebase-auth-compat.js'></script>

<script src="/api/html2pdf/dist/html2pdf.bundle.min.js"></script>

<link rel='stylesheet' href='/zero7/zero7.css?ver=<?php echo$version; ?>'/>
<script src='/zero7/zero7.js?ver=<?php echo$version; ?>'></script>

<link rel='stylesheet' href='index.css?ver=<?php echo$version; ?>'/>
<script src="index.js?ver=<?php echo$version; ?>"></script>

<title><?php echo$title;?> </title>

<?php
    $nav = 'home';

    if(isset($_GET['nav']) && !empty($_GET['nav']) && file_exists("views/$nav/$nav.php"))
        $nav = $_GET['nav'];

    echo "<link rel='stylesheet' href='views/$nav/$nav.css?v=$version'>";
    echo "<script src='views/$nav/$nav.js?v=$version'></script>";

    if ($lado == 'admin')
    {
        echo "<meta name='robots' content='noindex'>";
    }
?>
</head>