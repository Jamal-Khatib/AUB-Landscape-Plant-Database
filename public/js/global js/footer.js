setTimeout(resizeFooter,1000); 
window.onresize = resizeFooter;

function resizeFooter() {
  document.getElementById("footer").style.height = document.getElementById("footer-bkg").clientHeight + "px";
}
