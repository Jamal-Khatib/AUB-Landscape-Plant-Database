function $(e) {
  return document.getElementById(e);
}

window.onload = resizeFooter;
window.onresize = resizeFooter;

function resizeFooter() {
  $("footer").style.height = $("footer-bkg").clientHeight + "px";
}
