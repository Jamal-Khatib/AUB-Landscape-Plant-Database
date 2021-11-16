function $(e) {
    return document.getElementById(e);
}

window.onload = function () {
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
};
