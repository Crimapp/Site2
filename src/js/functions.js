window.addEventListener("resize",mapResize);
window.onload = mapResize;

function mapResize(){
	var sizeH = document.getElementById("header").offsetHeight;
    var sizeF = document.getElementById("footer").offsetHeight;
    var h = window.outerHeight - sizeF - sizeH - 125;
    
    document.getElementById("map").style.height = h + "px";
}