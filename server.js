const express = require("express") ; 
const mongoose = require("mongoose") ; 
const Plant = require("./models/plant") ; 
const url = require("url") ;
const ejs = require("ejs");

const app = new express() ; 
app.use(express.urlencoded({extended:true})) ; 
app.set("view engine","ejs") ; 
app.use(express.static("public"))  ;


const URI = "mongodb+srv://jamal:j1a2m3a4l5@cluster0.6vwvu.mongodb.net/firstDB?retryWrites=true&w=majority" ; 
app.use(express.urlencoded({extended:true})) ; 

mongoose.connect(URI) 
    .then((result) => {
        app.listen(3000) ; 
    })
    .catch((error) => {
        console.log("This is the error"+error) ; 
    })

// app.listen(3000) ; 

app.get("/",(req,res) => 
{
    Plant.find()
    .then((result)=> {
        var theRandomNumber = Math.floor(Math.random() * result.length) ;
        var spotLight = result[theRandomNumber] ; 
        res.render("home",{spotLight}) ; 
    })
    // const p = new Plant(
    //     {
    //         name : "Acer davidii" ,
    //         scientific_name : "Snakebark Maple",
    //         description : "Snakebark maple got its name from its snake-like bark.It is an upright tree , often multi-trunked tree",
    //         french_name : "Érable de David",
    //         pronounciation: "AY-ser dah-VID-ee-eye" ,
    //         type : "Tree" ,
    //         origin : "China, Myanmar" ,
    //         heat : "1 to 7",
    //         hardiness :  "5 to 9",
    //         uses : "Topiary, Bonsai, Espalier, Border Plant, Shade, Street",
    //         growth_rate : "Slow" ,
    //         tree_shape : "Round" ,
    //         canopy : "Coarse",
    //         height :  "5 to 8 m",
    //         spread  :  "3 to 5 meters, 5 to 8 meters"
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

app.get("/plant",(req,res) => 
{
    Plant.find({"name":"Abelia x grandiflora"}) 
    .then((result)=> {
        console.log("This isss the result : "+(result[0].name)) ; 
        res.render("plant_profile", {plant: result[0]}) ; 
    });
   
});


app.get("/ByLetter",(req,res) => {
    var letter = req.query.letter ; 
    Plant.find() 
    .then((result) => 
    {
        var plants = [] ; 
        for(let i = 0 ; i<result.length ; i++)
        {
            if(result[i].name[0]==letter)
            {
                plants.push(result[i]) ; 
            }
        }

        res.render("plants_by_letter",{plants:plants, firstLetter: letter}) ; 
    })
})


app.get("/ByName",(req,res) => {

    //Search 
    if(req.query.name!="" && req.query.scientific_name=="")
    {
        Plant.find({"name": req.query.name})
        .then((result) => {
            res.render("plant_profile", {plant: result[0]}) ;
        })
    }
    else if(req.query.name=="" && req.query.scientific_name!="")
    {
        Plant.find({"scientific_name": req.query.scientific_name})
        .then((result) => {
            res.render("plant_profile", {plant: result[0]}) ;
        })
    }

    //Get profile by clicking on check its profile
    else
    {
        Plant.find({"name": req.query.name})
        .then((result) => {
            res.render("plant_profile", {plant: result[0]}) ;
        })
        
    }
   
   
})
//To get the page with input fields 
app.get("/searchName",(req,res)=> {
    res.render("search_by_name");
})

app.get("/searchCriteria",(req,res)=> {
    res.render("search_by_criteria");
})

app.get("/adminCheck",(req,res)=> {
    res.render("admin_check") ; 
})


app.post("/adminCheck",(req,res)=> {
    var real_name = "myAdmin" ; 
    var real_password = "12345" ; 


    var name = req.body.name ; 
    var password = req.body.password ; 

    if(name.trim()==real_name && password.trim()==real_password)
    {
        res.json({"answer":"yes"}) ; 
        // res.render("admin_options") ; 
    }
    else
    {
        res.json({"answer":"no"}) ; 
    }

})

app.get("/adminOptions", (req, res)=>{
    console.log("Marilyn") ; 
    res.render("admin_options") ; 
    console.log("Melsiiiiiiiiiiiiiio") ; 
})

app.get("/add_plant",(req,res) => {
    res.render("add_plant") ;
})

app.get("/edit_plant",(req,res) => {
    res.render("edit_plant") ;
})

app.post("/edit_plant",(req,res) => {

    var name = req.body.name ; 
    var property = req.body.property ; 
    var value = req.body.newProperty ;


    switch(property) 
    {
        case "french_name": 
            Plant.findOneAndUpdate({ "name":name}, { "french_name":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "pronounciation": 
            Plant.findOneAndUpdate({ "name":name}, { "pronounciation":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "type": 
            Plant.findOneAndUpdate({ "name":name}, { "type":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "origin": 
            Plant.findOneAndUpdate({ "name":name}, { "origin":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ;
            
        case "heat": 
            Plant.findOneAndUpdate({ "name":name}, { "heat":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "hardiness": 
            Plant.findOneAndUpdate({ "name":name}, { "hardiness":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "uses": 
            Plant.findOneAndUpdate({ "name":name}, { "uses":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "growth_rate": 
            Plant.findOneAndUpdate({ "name":name}, { "growth_rate":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "tree_shape": 
            Plant.findOneAndUpdate({ "name":name}, { "tree_shape":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "canopy": 
            Plant.findOneAndUpdate({ "name":name}, { "canopy":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "height": 
            Plant.findOneAndUpdate({ "name":name}, { "height":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "spread": 
            Plant.findOneAndUpdate({ "name":name}, { "spread":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "Leaf_Arrangement": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Arrangement":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 
            
        case "Leaf_Venation": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Venation":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "Leaf_Persistance": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Persistance":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "Leaf_Type": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Type":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

        case "Leaf_Blade": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Blade":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 
            
            case "Leaf_Shape": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Shape":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Leaf_Margins": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Margins":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Leaf_Texture": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Texture":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Leaf_Scent": 
            Plant.findOneAndUpdate({ "name":name}, { "Leaf_Scent":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "color_growing_season": 
            Plant.findOneAndUpdate({ "name":name}, { "color_growing_season":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "color_changing_season": 
            Plant.findOneAndUpdate({ "name":name}, { "color_changing_season":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Flower_Showiness": 
            Plant.findOneAndUpdate({ "name":name}, { "Flower_Showiness":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Flower_Size": 
            Plant.findOneAndUpdate({ "name":name}, { "Flower_Size":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Flower_Type": 
            Plant.findOneAndUpdate({ "name":name}, { "Flower_Type":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Flower_Scent": 
            Plant.findOneAndUpdate({ "name":name}, { "Flower_Scent":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Flower_Color": 
            Plant.findOneAndUpdate({ "name":name}, { "Flower_Color":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "seasons": 
            Plant.findOneAndUpdate({ "name":name}, { "seasons":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Fruit_Type": 
            Plant.findOneAndUpdate({ "name":name}, { "Fruit_Type":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Fruit_Showiness": 
            Plant.findOneAndUpdate({ "name":name}, { "Fruit_Showiness":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Fruit_Size": 
            Plant.findOneAndUpdate({ "name":name}, { "Fruit_Size":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Fruit_Color": 
            Plant.findOneAndUpdate({ "name":name}, { "Fruit_Color":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Heat_Tolerance": 
            Plant.findOneAndUpdate({ "name":name}, { "Heat_Tolerance":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Drought_Tolerance": 
            Plant.findOneAndUpdate({ "name":name}, { "Drought_Tolerance":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Salt_Tolerance": 
            Plant.findOneAndUpdate({ "name":name}, { "Salt_Tolerance":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Soil_Requirements": 
            Plant.findOneAndUpdate({ "name":name}, { "Soil_Requirements":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Soil_Ph_Requirements": 
            Plant.findOneAndUpdate({ "name":name}, { "Soil_Ph_Requirements":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 
            
            case "Water_Requirements": 
            Plant.findOneAndUpdate({ "name":name}, { "Water_Requirements":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Light_Requirements": 
            Plant.findOneAndUpdate({ "name":name}, { "Light_Requirements":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Invasive_Potential": 
            Plant.findOneAndUpdate({ "name":name}, { "Invasive_Potential":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Prunning_Requirements": 
            Plant.findOneAndUpdate({ "name":name}, { "Prunning_Requirements":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Edible_Parts": 
            Plant.findOneAndUpdate({ "name":name}, { "Edible_Parts":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 

            case "Plant_Propagation": 
            Plant.findOneAndUpdate({ "name":name}, { "Plant_Propagation":value }, null, function (err, docs) {res.render("admin_options") ; })
            break ; 
    }

   
})

app.get("/delete_plant",(req,res) => {
    res.render("delete_plant")
})

app.post("/delete_plant",(req,res) => {
    var name = req.body.name ;
    Plant.findOneAndRemove({ "name": name }, function(err, member) { res.render("admin_options") } ) 
})





