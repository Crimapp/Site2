window.addEventListener("resize",windowResize);
var dialog;
window.onload = function(){
    windowResize();
    getLocation();
    google.maps.event.trigger(map, 'resize')
    // Add suport to dialog element on browsers that doens't support it
    dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
}

function windowResize(){
    if(!document.querySelector(".is-small-screen")){
        document.querySelector(".mdl-layout-title").style = "margin-left: -55px;";
        document.getElementById("demo-menu-lower-right").style = "margin-right: -10px;";
    }
    else{
        document.querySelector(".mdl-layout-title").style = "margin-left: 0px;";
        document.getElementById("demo-menu-lower-right").style = "margin-right: 0px;";
    }
}

// HTML5 geolocation
function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(changeLocation);
    }
    else{
        alert("O seu navegador não suporta Geolocalização."); // muda isso depois
    }
}
