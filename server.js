const express = require("express");
const mongoose = require("mongoose");
const Plant = require("./models/plant");
const url = require("url");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = new express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



const URI = "mongodb+srv://jamal:j1a2m3a4l5@cluster0.6vwvu.mongodb.net/firstDB?retryWrites=true&w=majority";
app.use(express.urlencoded({ extended: true }));

mongoose.connect(URI)
    .then((result) => {
        app.listen(3000);
        console.log("Server listening on port 3000");
    })
    .catch((error) => {
        console.log("This is the error" + error);
    })

// app.listen(3000) ; 

app.get("/", (req, res) => {
    Plant.find()
        .then((result) => {
            var theRandomNumber = Math.floor(Math.random() * result.length);
            var spotLight = result[theRandomNumber];
            res.render("home", { spotLight });
        })
    // const p = new Plant(
    //     {
    //         name : "Abelia x grandiflora",
    //         scientific_name : "Glossy Abelia",
    //         description : "Abelia x grandiflora is a fine-textured, semi-evergreen, sprawling shr...",
    //         french_name : "Not Available",
    //         pronounciation: "uh-BEEL-ee-uh gran-dif-FLOR-uh",
    //         type : "Shrub",
    //         origin : "Developed in Italy",
    //         heat : "6 to 9",
    //         hardiness : "5 to 9",
    //         uses : "Hedge, Specimen, Border Plant, Mass",
    //         growth_rate : "Moderate",
    //         tree_shape : "Round",
    //         canopy : "Symmetrical",
    //         height :  "0.5 to 1 m",
    //         spread  :  "1.5 to 3 meters",
    //         Leaf_Arrangement : "Opposite",
    //         Leaf_Venation : "Pinnate",
    //         Leaf_Persistance : "Semi Evergreen",
    //         Leaf_Type : "Simple",
    //         Leaf_Blade : "Less than 5",
    //         Leaf_Shape :"Lanceolate",
    //         Leaf_Margins:"Serrate",
    //         Leaf_Texture: "Smooth",
    //         Leaf_Scent: "No Fragance",
    //         color_growing_season:"Green",
    //         color_changing_season: "Red",
    //         Flower_Showiness : "Yes",
    //     Flower_Size : "1.5 - 3",
    //     Flower_Type : "Solitary",
    //     Flower_Scent : "Monoecious (Bisexual)",
    //     Flower_Color : "White, Pink",
    //     seasons: "Spring, Summer",
    //     Fruit_Type :"NA",
    //     Fruit_Showiness : "Yes",
    //     Fruit_Size : "0 - 1.5",
    //     Fruit_Color: "NA",
    //     Heat_Tolerance : "No",
    //     Drought_Tolerance : "No",
    //     Salt_Tolerance : "Poor",
    //     Soil_Requirements : "Clay, Loam, Sand",
    //     Soil_Ph_Requirements :"Acidic, Neutral",
    //     Water_Requirements : "Moderate",
    //     Light_Requirements : "Full, Part",
    //     Invasive_Potential : "No",
    //     Prunning_Requirements :"Needed, to develop a strong structure",
    //     Edible_Parts :"NA",
    //     Plant_Propagation : "Cutting",
    //     }
    // ); 
    // p.save() 
    // .then((result) => {
    //     console.log("Siiiiiiiiiiiiiiiiiiiiiiiiii") ; 
    // })
    // .catch((error)=> {
    //     console.log("Mmmmmmmmmmmmmmmmmm") ; 
    // })
});

// app.get("/plant",(req,res) => 
// {
//     Plant.find({"name":"Abelia x grandiflora"}) 
//     .then((result)=> {
//         console.log("This isss the result : "+(result[0].name)) ; 
//         res.render("plant_profile", {plant: result[0]}) ; 
//     });

// });


app.get("/ByLetter", (req, res) => {
    var letter = req.query.letter;
    Plant.find()
        .then((result) => {
            var plants = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].name[0] == letter) {
                    plants.push(result[i]);
                }
            }

            res.render("plants_by_letter", { plants: plants, firstLetter: letter });
        })
})

app.get("/gallery", async (req, res) => {
    //console.log(req.query.plantType);
    if (typeof req.query.plantType != "undefined") {
        if (req.query.plantType != "All") {
            Plant.find({ "type": req.query.plantType }).then((result) => {
                let sortType = megaSort(result, req); //sorts result and returns a value for sortType

                res.render("gallery", { plants: result, plantType: req.query.plantType, plantSort: sortType });
            });
        }
        else {
            Plant.find().then((result) => {
                let sortType = megaSort(result, req); //sorts result and returns a value for sortType

                res.render("gallery", { plants: result, plantType: req.query.plantType, plantSort: sortType });
            });
        }
    }
    else {
        Plant.find().then((result) => {
            res.render("gallery", { plants: result, plantType: "All", plantSort: "scientificA" });
        });
    }
})

app.get("/ByName", (req, res) => {

    //Search 
    if (req.query.name != "" && req.query.scientific_name == "") {
        Plant.find({ "name": req.query.name })
            .then((result) => {
                if (result.length == 0) { res.render("search_by_name"); }
                res.render("plant_profile", { plant: result[0] });
            })
            .catch((a) => {
                res.render("search_by_name");
            })
    }
    else if (req.query.name == "" && req.query.scientific_name != "") {
        Plant.find({ "scientific_name": req.query.scientific_name })
            .then((result) => {
                if (result.length == 0) { res.render("search_by_name"); }
                res.render("plant_profile", { plant: result[0] });
            })
            .catch((error) => {
                res.render("search_by_name");
            })
    }

    //Get profile by clicking on check its profile
    else {
        Plant.find({ "name": req.query.name })
            .then((result) => {
                if (result.length == 0) { res.render("search_by_name"); }
                res.render("plant_profile", { plant: result[0] });
            })
            .catch((a) => {
                res.render("search_by_name");
            })

    }


})
//To get the page with input fields 
app.get("/searchName", (req, res) => {
    res.render("search_by_name");
})

app.get("/searchCriteria", (req, res) => {
    res.render("search_by_criteria");
})

app.get("/adminCheck", (req, res) => {
    res.render("admin_check");
})


app.post("/adminCheck", (req, res) => {
    var real_name = "myAdmin";
    var real_password = "12345";


    var name = req.body.name;
    var password = req.body.password;

    if (name.trim() == real_name && password.trim() == real_password) {
        res.json({ "answer": "yes" });
        // res.render("admin_options") ; 
    }
    else {
        res.json({ "answer": "no" });
    }

})

app.get("/adminOptions", (req, res) => {
    console.log("Marilyn");
    res.render("admin_options");
})



app.get("/edit_plant", (req, res) => {
    res.render("edit_plant");
})

app.post("/edit_plant", (req, res) => {

    var name = req.body.name;
    var property = req.body.property;
    var value = req.body.newProperty;


    switch (property) {
        case "french_name":
            Plant.findOneAndUpdate({ "name": name }, { "french_name": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "pronounciation":
            Plant.findOneAndUpdate({ "name": name }, { "pronounciation": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "type":
            Plant.findOneAndUpdate({ "name": name }, { "type": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "origin":
            Plant.findOneAndUpdate({ "name": name }, { "origin": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "heat":
            Plant.findOneAndUpdate({ "name": name }, { "heat": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "hardiness":
            Plant.findOneAndUpdate({ "name": name }, { "hardiness": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "uses":
            Plant.findOneAndUpdate({ "name": name }, { "uses": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "growth_rate":
            Plant.findOneAndUpdate({ "name": name }, { "growth_rate": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "tree_shape":
            Plant.findOneAndUpdate({ "name": name }, { "tree_shape": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "canopy":
            Plant.findOneAndUpdate({ "name": name }, { "canopy": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "height":
            Plant.findOneAndUpdate({ "name": name }, { "height": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "spread":
            Plant.findOneAndUpdate({ "name": name }, { "spread": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Arrangement":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Arrangement": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Venation":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Venation": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Persistance":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Persistance": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Type":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Type": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Blade":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Blade": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Shape":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Shape": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Margins":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Margins": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Texture":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Texture": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Leaf_Scent":
            Plant.findOneAndUpdate({ "name": name }, { "Leaf_Scent": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "color_growing_season":
            Plant.findOneAndUpdate({ "name": name }, { "color_growing_season": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "color_changing_season":
            Plant.findOneAndUpdate({ "name": name }, { "color_changing_season": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Flower_Showiness":
            Plant.findOneAndUpdate({ "name": name }, { "Flower_Showiness": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Flower_Size":
            Plant.findOneAndUpdate({ "name": name }, { "Flower_Size": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Flower_Type":
            Plant.findOneAndUpdate({ "name": name }, { "Flower_Type": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Flower_Scent":
            Plant.findOneAndUpdate({ "name": name }, { "Flower_Scent": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Flower_Color":
            Plant.findOneAndUpdate({ "name": name }, { "Flower_Color": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "seasons":
            Plant.findOneAndUpdate({ "name": name }, { "seasons": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Fruit_Type":
            Plant.findOneAndUpdate({ "name": name }, { "Fruit_Type": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Fruit_Showiness":
            Plant.findOneAndUpdate({ "name": name }, { "Fruit_Showiness": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Fruit_Size":
            Plant.findOneAndUpdate({ "name": name }, { "Fruit_Size": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Fruit_Color":
            Plant.findOneAndUpdate({ "name": name }, { "Fruit_Color": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Heat_Tolerance":
            Plant.findOneAndUpdate({ "name": name }, { "Heat_Tolerance": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Drought_Tolerance":
            Plant.findOneAndUpdate({ "name": name }, { "Drought_Tolerance": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Salt_Tolerance":
            Plant.findOneAndUpdate({ "name": name }, { "Salt_Tolerance": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Soil_Requirements":
            Plant.findOneAndUpdate({ "name": name }, { "Soil_Requirements": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Soil_Ph_Requirements":
            Plant.findOneAndUpdate({ "name": name }, { "Soil_Ph_Requirements": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Water_Requirements":
            Plant.findOneAndUpdate({ "name": name }, { "Water_Requirements": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Light_Requirements":
            Plant.findOneAndUpdate({ "name": name }, { "Light_Requirements": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Invasive_Potential":
            Plant.findOneAndUpdate({ "name": name }, { "Invasive_Potential": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Prunning_Requirements":
            Plant.findOneAndUpdate({ "name": name }, { "Prunning_Requirements": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Edible_Parts":
            Plant.findOneAndUpdate({ "name": name }, { "Edible_Parts": value }, null, function (err, docs) { res.render("admin_options"); })
            break;

        case "Plant_Propagation":
            Plant.findOneAndUpdate({ "name": name }, { "Plant_Propagation": value }, null, function (err, docs) { res.render("admin_options"); })
            break;
    }


})

app.get("/delete_plant", (req, res) => {
    res.render("delete_plant")
})

app.post("/delete_plant", (req, res) => {
    var name = req.body.name;
    Plant.findOneAndRemove({ "name": name }, function (err, member) { res.render("admin_options") })
})



app.get("/add_plant", (req, res) => {
    res.render("add_plant");
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/plants")
    },
    filename: (req, file, cb) => {
        console.log(file);
        // cb(null,path.extname(file.originalname))
        cb(null, req.body.name + "0.jpg");
        // file.originalname
    }
})

const upload = multer({ storage: storage })


app.post("/add_plant", upload.single("image"), (req, res) => {
    console.log(req.body);
    const p = new Plant(
        {
            name: req.body.name,
            scientific_name: req.body.scientific_name,
            description: req.body.description,
            french_name: req.body.french_name,
            pronounciation: req.body.pronounciation,
            type: req.body.type,
            origin: req.body.origin,
            heat: req.body.heat,
            hardiness: req.body.hardiness,
            uses: req.body.uses,
            growth_rate: req.body.growth_rate,
            tree_shape: req.body.tree_shape,
            canopy: req.body.canopy,
            height: req.body.height,
            spread: req.body.spread,
            Leaf_Arrangement: req.body.Leaf_Arrangement,
            Leaf_Venation: req.body.Leaf_Venation,
            Leaf_Persistance: req.body.Leaf_Persistance,
            Leaf_Type: req.body.Leaf_Type,
            Leaf_Blade: req.body.Leaf_Blade,
            Leaf_Shape: req.body.Leaf_Shape,
            Leaf_Margins: req.body.Leaf_Margins,
            Leaf_Texture: req.body.Leaf_Texture,
            Leaf_Scent: req.body.Leaf_Scent,
            color_growing_season: req.body.color_growing_season,
            color_changing_season: req.body.color_changing_season,
            Flower_Showiness: req.body.Flower_Showiness,
            Flower_Size: req.body.Flower_Size,
            Flower_Type: req.body.Flower_Type,
            Flower_Scent: req.body.Flower_Scent,
            Flower_Color: req.body.Flower_Color,
            seasons: req.body.seasons,
            Fruit_Type: req.body.Fruit_Type,
            Fruit_Showiness: req.body.Fruit_Showiness,
            Fruit_Size: req.body.Fruit_Size,
            Fruit_Color: req.body.Fruit_Color,
            Heat_Tolerance: req.body.Heat_Tolerance,
            Drought_Tolerance: req.body.Drought_Tolerance,
            Salt_Tolerance: req.body.Salt_Tolerance,
            Soil_Requirements: req.body.Soil_Requirements,
            Soil_Ph_Requirements: req.body.Soil_Ph_Requirements,
            Water_Requirements: req.body.Water_Requirements,
            Light_Requirements: req.body.Light_Requirements,
            Invasive_Potential: req.body.Invasive_Potential,
            Prunning_Requirements: req.body.Prunning_Requirements,
            Edible_Parts: req.body.Edible_Parts,
            Plant_Propagation: req.body.Plant_Propagation,
            pictures: 1
        }
    );
    p.save()
        .then((result) => {
            res.redirect("/adminOptions");
        })
        .catch((error) => {
            console.log("Mmmmmmmmmmmmmmmmmm");
        })
})



app.get("/send_message", (req, res) => {
    res.render("send_message")
})

app.get("/sendy", (req, res) => {
    var email = req.query.email;
    var message = req.query.message;
    var line = email + ":" + message + "\n";

    fs.appendFile("./messages.txt", line, (err) => {
        if (err) { console.log(err); }
        else res.redirect("/");
    })
    // res.end() ; 
})

app.get("/view_messages", (req, res) => {
    fs.readFile("./messages.txt", "utf8", (err, data) => {
        var lines = data.trim().split("\n");
        console.log(lines.length);
        var messages = [];
        for (let i = 0; i < lines.length; i++) {
            var line = lines[i].split(":");
            console.log(lines[i]);
            console.log("haha");
            messages.push(line[0].trim());
            messages.push(line[1].trim());
        }
        // console.log(messages) ; 
        res.render("view_messages", { messages: messages });
    })
})

app.get("/useful_links", (req, res) => {
    res.render("useful_links");
})

function megaSort(result, req) {
    if (req.query.plantNameSelector == "scientificA") {
        result.sort(function (a, b) {
            if (a.name === b.name) return 0;
            else return (a.scientific_name < b.scientific_name) ? -1 : 1;
        });
        return "scientificA";
    }
    else if (req.query.plantNameSelector == "scientificD") {
        result.sort(function (a, b) {
            if (a.name === b.name) return 0;
            else return (a.scientific_name > b.scientific_name) ? -1 : 1;
        });
        return "scientificD";
    }
    else if (req.query.plantNameSelector == "commonA") {
        result.sort(function (a, b) {
            if (a.name === b.name) return 0;
            else return (a.name < b.name) ? -1 : 1;
        });
        return "commonA";
    }
    else if (req.query.plantNameSelector == "commonD") {
        result.sort(function (a, b) {
            if (a.name === b.name) return 0;
            else return (a.name > b.name) ? -1 : 1;
        });
        return "commonD";
    }
}
app.get("/glossary", (req, res) => {
    res.render("glossary");
})

app.get("/about_us", (req, res) => {
    res.render("about_us");
})

app.post("/filterByCriteria", (req, res) => {
    const parametersTemplate = {
        //tab1 Country
        country: req.body["Country"],   //NA
        //tab2 Basic Info
        type: req.body["Plant-Type"],
        Light_Requirements: req.body["Light"],
        Soil_Requirements: req.body["Soil"],
        Soil_Ph_Requirements: req.body["Soil-pH"],
        Water_Requirements: req.body["Water"],
        Water_Requirements: req.body["Water"],
        Heat_Tolerance: req.body["Tolerance-Heat"],
        Drought_Tolerance: req.body["Tolerance-Drought"],
        Frost_Tolerance: req.body["Tolerance-Frost"],   //NA
        Salt_Tolerance: req.body["Tolerance-Salt"],
        Life_Cycle: req.body["Life-Cycle"], //NA
        //tab3  Uses
        uses: req.body["Outdoor"],
        specialized: req.body["Specialized"],                   //NA
        native_environment: req.body["Native-Environment"],     //NA
        human_use: req.body["Human-Use"],                       //NA
        building: req.body["Building"],                         //NA
        //tab4 Size/Shape
        canopy: req.body["Canopy-Shape"],
        height: req.body["Plant-Height"],
        spread: req.body["Plant-Spread"],
        ultimate_height: req.body["Time-to-Ultimate-Height"],   //NA
        growth_rate: req.body["Growth-Rate"],
        //tab5 Leaf
        color_growing_season: req.body["Color-In-Growing-Season"],
        color_changing_season: req.body["Color-In-Changing-Season"],
        Leaf_Persistance: req.body["Leaf-Persistance"],
        Leaf_Scent: req.body["Leaf-Scent"],
        //tab6 Flower
        Flower_Color: req.body["Flower-Color"],
        Flower_Scent: req.body["Flower-Scent"],
        seasons: req.body["Flower-Season"],
        Flower_Showiness: req.body["Flower-Showiness"],
        //tab7 Fruit
        Fruit_Color: req.body["Fruit-Color"],
        Fruit_Showiness: req.body["Fruit-Showiness"],
        Fruit_Type: req.body["Fruit-Type"],
        Fruit_seasons: req.body["Fruit-Season"],                //NA
        Fruit_Size: req.body["Fruit-Size"],
        //tab8 Trunk
        trunk_Esthetic: req.body["Trunk-Esthetic"],             //NA
        crownshaft: req.body["Crownshaft"],                     //NA
        //tab9 Management
        Edible_Parts: req.body["management-edible"],
        litter: req.body["management-litter"],                  //NA
        rooting: req.body["management-rooting"],                //NA
        toxicity: req.body["management-toxicity"],              //NA
        Invasive_Potential: req.body["management-potential"],
        Prunning_Requirements: req.body["management-pruning"],
        diseases: req.body["management-diseases"],              //NA
        lifespan: req.body["management-lifespan"],              //NA
    };

    //  Copy only existing values from parametersTemplate into callParameters
    let callParameters = {};
    Object.entries(parametersTemplate).forEach(([key, value]) => {
        if (value != undefined) {
            callParameters[key] = value;
        }
    })

    Plant.find(callParameters)
        .then((result) => {
            if (result.length == 0) {
                console.log("No results found")
                //TODO render same page with msg
            }
            else {
                console.log("Plant found");
                //TODO render resulting plants
            }
        })
        .catch((err) => {
            console.error("Error in serach by criteria: ", err);
        })
})
