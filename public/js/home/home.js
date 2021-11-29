window.onload = function () {
    document.getElementById("show-more").onclick = function (e) {
        if (e.target.innerText == "Show More") {
            document.getElementById("hidden-about-us").style.display = "inline";
            e.target.innerHTML = "Show Less"
        }
        else if (e.target.innerText == "Show Less") {
            document.getElementById("hidden-about-us").style.display = "none";
            e.target.innerHTML = "Show More"
        }
    }
}