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

    res.render("home") ; 

});

app.get("/plant",(req,res) => 
{
    Plant.find({"name":"Abelia x grandiflora"}) 
    .then((result)=> {
        console.log("This isss the result : "+(result[0].name)) ; 
        res.render("plant_profile", {plant: result[0]}) ; 
    });
   
});

app.get("/ByLetter",(req,res) =>
{   
    let letter = url.parse(req.url,true).query.letter; //get letter from url

    if(!letter.match(/^[a-zA-Z]{1}$/)){   //check if it is a singular letter
        res.render("home");             //render home if not
        // console.log(letter);
    }
    else{
        res.render("filter", {firstLetter: letter});
    }

});

app.listen(8080);
console.log("server started");