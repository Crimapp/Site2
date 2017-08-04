/**
 * Created by Turox on 7/10/2017.
 */
var btnlogin;
var userId = null;
var accessToken = null;


function userConnected(){
    FB.api('/me', function(response){
        //document.getElementById("login").innerHTML = response.name;
        document.getElementById("login").innerHTML = response.name;
        //document.getElementById('logoutButton').style.display = "block";
        document.getElementById('addDiv').style.display = "block";
    });
}
function userLogout(response) {
    if (response == 'OK') {
        userId = null;
        accessToken = null;
        document.getElementById('login').innerHTML = 'Login';
        document.getElementById('logoutButton').style.display = "none";
        document.getElementById('addDiv').style.display = "none";
    }
}

function statusChangedCallback(response) {
    console.log('statusChangedCallback');
    if(response.status == 'connected'){
        accessToken = response.authResponse.accessToken;
        userId = response.authResponse.userID;
        //btnlogin.onclick = function () {console.log("logado");};
        userConnected();
    }
}

window.fbAsyncInit = function () {
    FB.init({
        appId: 113508735925978,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangedCallback(response);
    });
};


(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));