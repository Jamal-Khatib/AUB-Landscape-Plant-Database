const mongoose = require("mongoose") ; 

const Schema = mongoose.Schema ; 


const plantSchema = new Schema(
    {
        name : { type: String, required: true} , 
        scientific_name : { type: String}, 
        description : {type:String},
        french_name : {type:String},
        pronounciation: {type:String},
        type : {type:String},
        origin :  {type:String},
        heat :  {type:String},
        hardiness : {type:String}, 
        uses : {type:String},
        growth_rate : {type:String},
        tree_shape : {type:String},
        canopy : {type:String},
        height : {type:String},
        spread : {type:String},

    }, 
    {timestamps: true}
) ; 

const Plant = new mongoose.model("plant",plantSchema)

module.exports = Plant ; 
