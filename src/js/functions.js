window.addEventListener("resize",mapResize);
window.onload = mapResize;

function mapResize(){
	var sizeH = document.getElementById("header").offsetHeight;
    var sizeF = document.getElementById("footer").offsetHeight;
    var h = window.outerHeight - sizeF - sizeH - 125;
    //alert(h);
    document.getElementById("map").style.height = h + "px";
}

function addControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '100%';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Adicionar novo ponto';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.paddingTop = '10px';
    controlText.style.paddingBottom = '6px';
    controlText.innerHTML = '<i class="material-icons">add</i>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
    map.setCenter(alfenas);
    });

}