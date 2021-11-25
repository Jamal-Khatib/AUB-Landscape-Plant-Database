const express = require("express") ; 
const mongoose = require("mongoose") ; 
const Plant = require("./models/plant") ; 
const url = require("url") ;

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

        res.render("filter",{plants:plants, firstLetter: letter}) ; 
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
    res.render("searchName");
})


