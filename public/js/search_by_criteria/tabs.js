window.onload = function () {
    let currentTabBtn = document.getElementById("tab-btn-1");
    let currentTabContainer = document.getElementById("tab-1");

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
            let newTabContainer = document.getElementById(`tab-${tabNum}`);
            newTabContainer.className = "tab-container-selected";
            currentTabContainer.className = "tab-container-hidden";
            currentTabContainer = newTabContainer;
        };
    }
};
document.getElementById("map").onclick = function (event) {
    bounds = this.getBoundingClientRect();
    var left = bounds.left;
    var top = bounds.top;
    var x = event.pageX - left;
    var y = event.pageY - top;
    var cw = this.clientWidth;
    var ch = this.clientHeight;
    var iw = this.naturalWidth;
    var ih = this.naturalHeight;
    var px = (x / cw) * iw;
    var py = (y / ch) * ih;
    alert(
        "click on " +
            this.tagName +
            " at pixel (" +
            px +
            "," +
            py +
            ") mouse pos (" +
            x +
            "," +
            y +
            ") relative to boundingClientRect at (" +
            left +
            "," +
            top +
            ") client image size: " +
            cw +
            " x " +
            ch +
            " natural image size: " +
            iw +
            " x " +
            ih
    );
};