/**
 * Created by Turox on 7/29/2017.
 */
window.onload = function(){
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
    snackbarContainer = document.querySelector('#message');

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

    detectswipe('app-header', function(){

    })
};

//page changers
