function $(e) {
  return document.getElementById(e);
}

window.onload = function () {
  tabs();
  imageDisplays();
};

function tabs() {
  const plant_tab_landscape = $("plant-tab-landscape");
  const plant_tab_botanical = $("plant-tab-botanical");
  const plant_tab_horticulture = $("plant-tab-horticulture");
  var listOfTabButtons = document.getElementsByClassName("tab");
  for (let i = 0; i < listOfTabButtons.length; i++) {
    const TabButton = listOfTabButtons[i];
    TabButton.addEventListener("click", () => {
      switch (parseInt(TabButton.value)) {
        case 1:
          plant_tab_landscape.style.display = "block";
          plant_tab_botanical.style.display = "none";
          plant_tab_horticulture.style.display = "none";

          listOfTabButtons[0].className = "selected-tab tab";
          listOfTabButtons[1].className = "tab";
          listOfTabButtons[2].className = "tab";
          break;
        case 2:
          plant_tab_landscape.style.display = "none";
          plant_tab_botanical.style.display = "block";
          plant_tab_horticulture.style.display = "none";

          listOfTabButtons[0].className = "tab";
          listOfTabButtons[1].className = "selected-tab tab";
          listOfTabButtons[2].className = "tab";
          break;
        case 3:
          plant_tab_landscape.style.display = "none";
          plant_tab_botanical.style.display = "none";
          plant_tab_horticulture.style.display = "block";

          listOfTabButtons[0].className = "tab";
          listOfTabButtons[1].className = "tab";
          listOfTabButtons[2].className = "selected-tab tab";
          break;
        default:
          plant_tab_landscape.style.display = "none";
          plant_tab_botanical.style.display = "none";
          plant_tab_horticulture.style.display = "none";

          listOfTabButtons[0].className = "tab";
          listOfTabButtons[1].className = "tab";
          listOfTabButtons[2].className = "tab";
          break;
      }
    });
  }
}

function imageDisplays() {
  var sideImages = document.getElementsByClassName("side-image");
  for (let i = 0; i < sideImages.length; i++) {
    sideImages[i].onmouseover = function () {
      $("zoomedImage").src = this.src;
    };
  }
}
