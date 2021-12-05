function $(e) {
    return document.getElementById(e);
}

let currentTabBtn;
let currentTabContainer;

window.onload = () => {
    currentTabBtn = $("tab-btn-1");
    currentTabContainer = $("tab-1");

    switchTabs();
    if (typeof $("main_map") != undefined && $("main_map") != null) {
        console.log("yto");
        highlightCountry();
    }
    toggleImgSelect();

    $("back-btn").onclick = backBtn;
    $("submit-btn").onclick = () => {
        if (
            !confirm(
                "You are about to search for a plant with your selected filters.\nAre you sure you don't want to add more filters?\n\nOK - To Proceed"
            )
        ) {
            return false;
        }
    };
    $("next-btn").onclick = nextBtn;
};

function backBtn() {
    listOfTabs = document.querySelectorAll("ul#tabs > li > button");
    for (let i = 0; i < listOfTabs.length; i++) {
        const tabBtn = listOfTabs[i];
        const tabNum = listOfTabs[i].id.split("-")[2];
        if (i != 0) {
            if (tabBtn.className == "tabs-selected") {
                tabBtn.className = "tabs-done";
                $(`tab-${tabNum}`).className = "tab-container-hidden";

                currentTabBtn = listOfTabs[i - 1];
                currentTabContainer = $(`tab-${parseInt(tabNum) - 1}`);

                currentTabBtn.className = "tabs-selected";
                currentTabContainer.className = "tab-container-selected";
                break;
            }
        }
    }
}

function nextBtn() {
    listOfTabs = document.querySelectorAll("ul#tabs > li > button");
    for (let i = 0; i < listOfTabs.length; i++) {
        const tabBtn = listOfTabs[i];
        const tabNum = listOfTabs[i].id.split("-")[2];
        if (i != listOfTabs.length - 1) {
            if (tabBtn.className == "tabs-selected") {
                tabBtn.className = "tabs-done";
                $(`tab-${tabNum}`).className = "tab-container-hidden";

                currentTabBtn = listOfTabs[i + 1];
                currentTabContainer = $(`tab-${parseInt(tabNum) + 1}`);

                currentTabBtn.className = "tabs-selected";
                currentTabContainer.className = "tab-container-selected";
                break;
            }
        }
    }
}

function switchTabs() {
    listOfTabs = document.querySelectorAll("ul#tabs > li > button");
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

// ------------------------------------------------------------Tab 1 - Country
function highlightCountry() {
    //function to toggle country shape opacity
    function toggleShape(shape, forced = -1) {
        forced = parseInt(forced);
        if (forced == 1) {
            shape.style.opacity = 1;
        } else if (forced == 0) {
            shape.style.opacity = 0;
        } else {
            if (shape.style.opacity == 0) {
                shape.style.opacity = 1;
            } else {
                shape.style.opacity = 0;
            }
        }
    }

    //function to toggle btn color
    function toggleButton(btn, forced = -1) {
        forced = parseInt(forced);
        if (forced == 1) {
            btn.style.backgroundColor = "#2d6a4fff";
        } else if (forced == 0) {
            btn.style.backgroundColor = "#52b788ff";
        } else {
            if (btn.style.backgroundColor == "#52b788ff") {
                btn.style.backgroundColor = "#2d6a4fff";
            } else {
                btn.style.backgroundColor = "#52b788ff";
            }
        }
    }

    //Add listeners to country Buttons
    let countryBtns = $("country-list").children;
    for (let i = 0; i < countryBtns.length; i++) {
        const btn = countryBtns[i];
        const correspondingShape = document.querySelector(
            `#map_${btn.getAttribute("alt")}`
        ).children[0].children[0];
        //On button hover -> highlight country shape
        btn.onmouseover = (e) => {
            toggleShape(correspondingShape, 1);
            toggleButton(e.target, 1);
        };
        btn.onmouseleave = (e) => {
            if (correspondingShape.getAttribute("lastselected") != "true") {
                toggleShape(correspondingShape, 0);
                toggleButton(e.target, 0);
            }
        };
        //On button click -> indent button and leave shape highlighted
        btn.onclick = (e) => {
            if (correspondingShape.getAttribute("lastselected") == "false") {
                correspondingShape.setAttribute("lastselected", "true");
                toggleShape(correspondingShape, 1);
                toggleButton(e.target, 1);
                console.log("i selected this country");

                //set checkbox to true
                $(
                    `hidden-checkbox-${e.target.getAttribute("alt")}`
                ).checked = true;
            } else if (
                correspondingShape.getAttribute("lastselected") == "true"
            ) {
                correspondingShape.setAttribute("lastselected", "false");
                toggleShape(correspondingShape, 0);
                toggleButton(e.target, 0);

                //set checkbox to false
                $(
                    `hidden-checkbox-${e.target.getAttribute("alt")}`
                ).checked = false;
            } else {
                console.error("Shape did not get selected correctly");
            }
        };
    }

    // Add listeners to country Shapes
    let countryShapes = document.querySelectorAll(".country");
    for (let i = 0; i < countryShapes.length; i++) {
        const shape = countryShapes[i];
        const countryNum = shape.parentNode.parentNode.id.split("_")[1];
        const correspondingBtn = document.querySelector(
            `#country-list > li[alt="${countryNum}"]`
        );
        // On shape hover -> hover corresponding button
        shape.onmouseover = (e) => {
            toggleShape(e.target, 1);
            toggleButton(correspondingBtn, 1);
        };
        shape.onmouseout = (e) => {
            if (e.target.getAttribute("lastselected") != "true") {
                toggleShape(e.target, 0);
                toggleButton(correspondingBtn, 0);
            }
        };
        //On shape click -> leave highlighted and indent button
        shape.onclick = (e) => {
            if (e.target.getAttribute("lastselected") == "false") {
                e.target.setAttribute("lastselected", "true");
                toggleButton(correspondingBtn, 1);
                toggleShape(e.target, 1);

                //set checkbox to true
                $(
                    `hidden-checkbox-${correspondingBtn.getAttribute("alt")}`
                ).checked = true;
            } else if (e.target.getAttribute("lastselected") == "true") {
                e.target.setAttribute("lastselected", "false");
                toggleButton(correspondingBtn, 0);
                toggleShape(e.target, 0);

                //set checkbox to true
                $(
                    `hidden-checkbox-${correspondingBtn.getAttribute("alt")}`
                ).checked = false;
            } else {
                console.error("Shape did not get selected correctly");
            }
        };
    }
}

// ------------------------------------------------------------All tabs
function toggleImgSelect() {
    var listOfInteractables = document.getElementsByClassName("selectbox");
    for (var i = 0; i < listOfInteractables.length; i++) {
        const box = listOfInteractables[i];
        const label = box.children[0];
        const checkbox = label.children[0];
        label.addEventListener("click", function (e) {
            e.preventDefault();
        });
        box.addEventListener("click", function (e) {
            if (checkbox.checked) {
                checkbox.checked = false;
                box.classList.replace("selected", "unselected");
            } else {
                checkbox.checked = true;
                box.classList.replace("unselected", "selected");
            }
        });
    }
}
