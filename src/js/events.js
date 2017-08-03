/**
 * Created by Turox on 7/29/2017.
 */
window.onload = function(){
    snackbarContainer = document.querySelector('#message');
    windowResize();
    getLocation();
    google.maps.event.trigger(map, 'resize')
    // Add suport to dialog element on browsers that doens't support it
    dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    titulo = document.querySelector("#d-title");
    titulo.innerHTML = "Adicionar novo";

    //Page changers
    let pagechangers = document.getElementsByClassName('page-changer');
    for(let i in pagechangers){
        if(pagechangers.hasOwnProperty(i)){
            let pagechanger = pagechangers[i];
            pagechanger.addEventListener('click', function(){
                changePage(this.getAttribute('data-page'));
            })
        }
    }

    document.getElementById('logoutButton').onclick = function(){
        FB.logout(userLogout);
    };

    detectswipe('app-header', function(){

    });

    document.getElementById('crimeForm').onsubmit = function(e){
        e.preventDefault();
        aud('add');
    };
    document.getElementById('cancelCrime').onclick = function(e){
        e.preventDefault();
        document.getElementById('crimeForm').reset();
        document.getElementById('crimeFormHolder').close();
    }

    document.getElementById('login').onclick = function () {
        if(!isLogged()) {
            FB.login(function (response) {
                statusChangedCallback(response);
            }, {scope: 'public_profile'});
        }
    };

    document.getElementById('delCrime').onclick = function(e){
        e.preventDefault();
        aud('del');
    }

    document.getElementById('crimeFormHolder').addEventListener('close', function(){
        document.getElementById('crimeForm').reset();
        document.getElementById('delCrime').style.display = 'none';
    });
};


//page changers
