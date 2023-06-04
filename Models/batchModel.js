const mongoose=require("mongoose")

const batchSchema=new  mongoose.Schema({
    batchCode:{
        type:String
    },
    batchTimingFrom:{
        type:String
    },
    batchTimingTo:{
        type:String
    }

})
module.exports=mongoose.model("batchSchema",batchSchema)