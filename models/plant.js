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
        pictures: {type: Number},

        Leaf_Arrangement : {type:String},
        Leaf_Venation : {type:String},
        Leaf_Persistance : {type:String},
        Leaf_Type : {type:String},
        Leaf_Blade : {type:String},
        Leaf_Shape : {type:String},
        Leaf_Margins: {type:String},
        Leaf_Texture: {type:String},
        Leaf_Scent: {type:String},
        color_growing_season: {type:String}, 
        color_changing_season: {type:String}, 

       
        Flower_Showiness : {type:String},
        Flower_Size : {type:String},
        Flower_Type : {type:String},
        Flower_Scent : {type:String},
        Flower_Color : {type:String},
        seasons: {type:String},
        Fruit_Type : {type:String},
        Fruit_Showiness : {type:String},
        Fruit_Size : {type:String},
        Fruit_Color: {type:String},
        Heat_Tolerance : {type:String},
        Drought_Tolerance : {type:String},
        Salt_Tolerance : {type:String},
        Soil_Requirements : {type:String},
        Soil_Ph_Requirements : {type:String},
        Water_Requirements : {type:String},
        Light_Requirements : {type:String},
        Invasive_Potential : {type:String},
        Prunning_Requirements : {type:String},
        Edible_Parts : {type:String},
        Plant_Propagation : {type:String},

        Category :  {type:String},
        Country : {type:String} 
    }, 
    {timestamps: true}
) ; 

const Plant = new mongoose.model("plant",plantSchema)

module.exports = Plant ; 
