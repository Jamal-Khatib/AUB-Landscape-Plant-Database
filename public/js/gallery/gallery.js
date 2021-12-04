function $(id) { return document.getElementById(id);}

window.onload = function () {
    
    $("typeSort").onchange = function () {
        document.forms["selections"].submit();
    };
    $("nameSort").onchange = function () {
        document.forms["selections"].submit();
    };

    var plantType = $("sentPlantType").innerHTML;
    //console.log(plantType);
    var selectOptions = $("plantTypeSel").getElementsByTagName("option");
    for (let i=0; i<selectOptions.length;i++){
        if (selectOptions[i].value == plantType){
            $("plantTypeSel").selectedIndex = i;
        }
    }

    var plantSort = $("sentPlantSort").innerHTML;
    console.log(plantSort);
    var sortOptions = $("plantName").getElementsByTagName("option");
    for (let i=0; i<sortOptions.length;i++){
        if (sortOptions[i].value == plantSort){
            $("plantName").selectedIndex = i;
        }
    }

    var images = document.getElementsByClassName("babyImage");
    for (let i=0; i*10<images.length; i++){
        let newRow = document.createElement("option");
        newRow.value=i;
        newRow.innerHTML = i*10 +" to " + ((i*10)+9);
        $("picNumSelector").appendChild(newRow);
    }
    $("picNumSelector").onchange = function () {
        if(this.value !="All"){
            for (let i=0; i<images.length; i++){
                if(i >= (this.value*10) + 9){
                    images[i].display = "none";
                }
                else images[i].display = "inline-block";
            }
        }
        
    };
};