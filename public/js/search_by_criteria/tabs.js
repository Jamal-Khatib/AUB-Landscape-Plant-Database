function $(e) {
  return document.getElementById(e);
}

window.onload = () => {
  switchTabs();
  highlightCountry();
};

function switchTabs() {
  let currentTabBtn = $("tab-btn-1");
  let currentTabContainer = $("tab-1");

  listOfTabs = document.querySelectorAll("ul#tabs > li");
  for (let i = 0; i < listOfTabs.length; i++) {
    const tab = listOfTabs[i];
    tab.onclick = function (e) {
      if (e.target == currentTabBtn) return;
      //highlight active button only
      e.target.className = "tabs-selected";
      currentTabBtn.className = "tabs-done";
      currentTabBtn = e.target;

      //show respective tab
      const tabNum = e.target.id.split("-")[2];
      let newTabContainer = $(`tab-${tabNum}`);
      newTabContainer.className = "tab-container-selected";
      currentTabContainer.className = "tab-container-hidden";
      currentTabContainer = newTabContainer;
    };
  }
}

function highlightCountry() {
  let countryBtns = $("country-list").children;
  let countryShapes = document.querySelectorAll(".country");

  for (let i = 0; i < countryBtns.length; i++) {
    const btn = countryBtns[i];
    const correspondingShape = document.querySelector(
      `#map_${btn.getAttribute("alt")}`
    ).children[0].children[0];

    //On button hover -> highlight country shape
    btn.onmouseover = () => {
      correspondingShape.style.opacity = 1;
    };
    btn.onmouseleave = () => {
      if (correspondingShape.getAttribute("lastSelected") != "true") {
        correspondingShape.style.opacity = 0;
      }
    };

    //On button click -> leave shape highlighted
    btn.onclick = () => {
      correspondingShape.style.opacity = 1;
      correspondingShape.setAttribute("lastSelected", "true");
    };
  }
  for (let i = 0; i < countryShapes.length; i++) {
    countryShapes[i].onmouseover = () => {};
  }
}
