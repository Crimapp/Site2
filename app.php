<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8"/>
        <!-- Material Design Lite -->
        <script src="./src/js/material.min.js"></script>
        
        <link rel="stylesheet" href="./src/css/material.min.css">
        <!-- Custom styles -->
        <link rel="stylesheet" href="./src/css/style.css">
        <script src="./src/js/functions.js"></script>
        <!-- Material Design icon font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <title>Crimapp | App</title>
    </head>
    <body>
        <!-- Always shows a header, even in smaller screens. -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header id="header" class="mdl-layout__header">
                <div class="mdl-layout__header-row">
                    <!-- Title -->
                    <span class="mdl-layout-title">Crimapp</span>
                    <!-- Add spacer, to align navigation to the right -->
                    <div class="mdl-layout-spacer"></div>
                    
                    <!-- Right aligned menu below button -->
                    <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
                        <li class="mdl-menu__item">Criar conta</li>
                        <li class="mdl-menu__item">Login</li>
                    </ul>
                </div>
            </header>
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">Crimapp</span>
                <nav class="mdl-navigation">
                    <a class="mdl-navigation__link" href=""> Adicionar </a>
                    <a class="mdl-navigation__link" href=""> Consultar </a>
                    <a class="mdl-navigation__link" href=""> Outros </a>
                </nav>
            </div>
            <main class="mdl-layout__content">
                <div class="page-content">
                    <!-- Here the maps will displayed -->
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--12-col">
                            <?php
                                // inclui mapa na página
                                include('./src/system/map.php');
                            ?>
                        </div>
                    </div>
                </div>
            </main>

            <footer id="footer" class="mdl-mini-footer">
                <div class="mdl-mini-footer__left-section">
                    <div class="mdl-logo">Copyright &copy 2017 Crimapp.</div>
                </div>
                <div class="mdl-mini-footer__right-section">    
                    <ul class="mdl-mini-footer__link-list">
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="contato.html">Contato</a></li>
                        <li><a href="ajuda.html">F.A.Q.</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    </body>
</html>