window.onload = function () {

    var noData = document.getElementsByClassName("noData");
    var result = document.getElementById("result");
    for (let i = 0; i < noData.length; i++) {
        noData[i].onclick = function () {

            result.style.fontSize = "80px";
            result.innerHTML = "No words for the letter" + noData[i].innerHTML;

        }

    }

    var data = document.getElementsByClassName("data");


    for (let i = 0; i < data.length; i++) {
        data[i].onclick = function () {
            if (this.innerHTML.trim() == "B") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                td1.style.color = "#2d6a4fff";
                var td2 = document.createElement("td");
                td1.innerHTML = "Bloom";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "A waxy, white covering on leaves or fruit; a name for the flowering part of a plant.";
                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }
            else if (this.innerHTML.trim() == "C") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";

                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                td1.style.fontWeight = "bold";
                var td2 = document.createElement("td");
                td1.innerHTML = "Canopy";
                td1.style.color = "#2d6a4fff";
                td1.style.fontWeight = "Canopy Shape";
                td2.innerHTML = "";
                row1.appendChild(td1);
                row1.appendChild(td2);

                var row2 = document.createElement("tr");
                var td3 = document.createElement("td");
                td3.style.fontWeight = "bold";
                td3.style.paddingLeft = "150px";
                td3.style.paddingRight = "150px";
                td3.innerHTML = "  Pyramidal "
                var td4 = document.createElement("td");
                td4.innerHTML = " Shaped like a pyramid, with a broad base and tapered point.";
                row2.appendChild(td3);
                row2.appendChild(td4);


                var row3 = document.createElement("tr");
                var td5 = document.createElement("td");
                td5.style.fontWeight = "bold";
                td5.style.paddingLeft = "150px";
                td5.style.paddingRight = "150px";
                td5.innerHTML = "Round "
                var td6 = document.createElement("td");
                td6.innerHTML = "Round or globe. About as broad as tall.";
                row3.appendChild(td5);
                row3.appendChild(td6);


                var row4 = document.createElement("tr");
                var td7 = document.createElement("td");
                td7.style.fontWeight = "bold";
                td7.style.paddingLeft = "150px";
                td7.style.paddingRight = "150px";
                td7.innerHTML = "Columnar "
                var td8 = document.createElement("td");
                td8.innerHTML = "Slender, upright form.";
                row4.appendChild(td7);
                row4.appendChild(td8);



                table.appendChild(row1);
                table.appendChild(row2);
                table.appendChild(row3);
                table.appendChild(row4);
                result.appendChild(table);
            }

            else if (this.innerHTML.trim() == "D") {

                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";

                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                td1.style.fontWeight = "bold";
                td1.style.color = "#2d6a4fff";
                var td2 = document.createElement("td");
                td1.innerHTML = " Fruit";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "";
                row1.appendChild(td1);
                row1.appendChild(td2);


                var row2 = document.createElement("tr");
                var td3 = document.createElement("td");
                td3.style.fontWeight = "bold";
                td3.style.paddingLeft = "150px";
                td3.style.paddingRight = "150px";
                td3.innerHTML = "  Follicle "
                var td4 = document.createElement("td");
                td4.innerHTML = " Follicle is a dry dehiscent fruit which splits on one side only. It may contain one or many seeds.";
                row2.appendChild(td3);
                row2.appendChild(td4);


                var row3 = document.createElement("tr");
                var td5 = document.createElement("td");
                td5.style.fontWeight = "bold";
                td5.style.paddingLeft = "150px";
                td5.style.paddingRight = "150px";
                td5.innerHTML = "Legume "
                var td6 = document.createElement("td");
                td6.innerHTML = "Dry dehiscent pod that splits on two sides.";
                row3.appendChild(td5);
                row3.appendChild(td6);

                table.appendChild(row1);
                table.appendChild(row2);
                table.appendChild(row3);
                result.appendChild(table);

            }

            if (this.innerHTML.trim() == "E") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                var td2 = document.createElement("td");
                td1.innerHTML = "Edible Plant Parts";
                td1.style.fontWeight = "bold";
                td1.style.color = "#2d6a4fff";
                td2.innerHTML = "Any part of the plant eaten by humans. Humans most commonly eat the seeds ";
                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }

            if (this.innerHTML.trim() == "F") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                var td2 = document.createElement("td");
                td1.innerHTML = "Family";
                td1.style.color = "#2d6a4fff";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "Family, as it relates to taxonomic rank, is between order and genus.";

                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }

            if (this.innerHTML.trim() == "G") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                var td2 = document.createElement("td");
                td1.style.color = "#2d6a4fff";
                td1.innerHTML = "Growth Rate";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "Rate of growth refers to the vertical increase in growth unless specified differently";
                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }

            else if (this.innerHTML.trim() == "M") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                var td2 = document.createElement("td");
                td1.style.color = "#2d6a4fff";
                td1.innerHTML = "Mowing Height";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "The optimal height of mowing which will help develop strong and decorative turf.";
                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }

            else if (this.innerHTML.trim() == "N") {
                var table = document.createElement("table");
                table.style.fontSize = "40px"
                var result = document.getElementById("result");
                result.innerHTML = "";
                var row1 = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.style.paddingLeft = "150px";
                td1.style.paddingRight = "150px";
                var td2 = document.createElement("td");
                td1.style.color = "#2d6a4fff";
                td1.innerHTML = "Native Origin";
                td1.style.fontWeight = "bold";
                td2.innerHTML = "The place or region from where the plant is originated from.";
                row1.appendChild(td1);
                row1.appendChild(td2);
                table.appendChild(row1);
                result.appendChild(table);

            }
        }

    }
}
