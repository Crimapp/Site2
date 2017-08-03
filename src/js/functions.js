window.addEventListener("resize",windowResize);
let dialog;
let titulo;
let snackbarContainer;

function isLogged(){
    return userId && accessToken;
}
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
function windowResize(){
    if(!document.querySelector(".is-small-screen")){
        document.querySelector(".title").style = "margin-left: -55px;";
        //document.getElementById("demo-menu-lower-right").style = "margin-right: -15px;";
    }
    else{
        document.querySelector(".title").style = "margin-left: 0px;";
        //document.getElementById("demo-menu-lower-right").style = "margin-right: 0px;";
    }
}

// HTML5 geolocation
function getLocation(){
    snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Adquirindo sua localização...'});
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(changeLocation);
    }
    else{
        snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Não foi possivel obter sua localização'});
    }
}

function changePage(page_str){
    let pages = document.getElementsByClassName('page');
    let page = null;
    for(let i in pages){
        if(pages.hasOwnProperty(i)){
            page = pages[i];
            page.style.display = 'none';
        }
    }
    page = document.getElementById(page_str);


    page.style.display = 'block';
    if(page_str === 'mainPage')
        google.maps.event.trigger(map, 'resize');
}

function detectswipe(el,func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 20;  //min x swipe for horizontal swipe
    var max_x = 40;  //max x difference for vertical swipe
    var min_y = 40;  //min y swipe for vertical swipe
    var max_y = 50;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    },false);
    ele.addEventListener('touchmove',function(e){
        //git e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    },false);
    ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if(swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if(swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc !== "") {
            if(typeof func === 'function') func(el,direc);
        }
        direc = "";
    },false);
}
