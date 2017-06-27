<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8"/>
        <!-- Material Design Lite -->
        <script src="./src/js/material.min.js"></script>
        
        <link rel="stylesheet" href="./src/css/material.min.css">
        <!-- Custom styles -->
        <link rel="stylesheet" href="./src/css/style.css">
        <!-- Material Design icon font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <title>Crimapp | App</title>
    </head>
    <body>
        <style>
            #map{
                height: 100% !important;
            }
            #mapcont{
                height: 100% !important;
            }
            body{
                height: 100% !important;
            }
        </style>
        <?php
            // inclui mapa na página
            include('./src/system/map.php');
        ?>
    </body>
</html>