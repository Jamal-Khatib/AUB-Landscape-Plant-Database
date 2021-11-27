function $(id) { return document.getElementById(id);}

window.onload = function () { 
    var sideImages = document.getElementsByClassName("side-image");
    for (let i=0; i<sideImages.length; i++){
        sideImages[i].onmouseover = function () {
            $("zoomedImage").src = this.src;
        };
    }
};