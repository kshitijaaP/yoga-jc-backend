const mongoose=require("mongoose")

const attendanceSchema=new  mongoose.Schema({
    fullName:{
        type:String
    },
    batch:{
        type:String
    },
    attendanceDate:{
        type:String
    },
    isPresentAbsent:{
        type:String
    },
    studentId:{
        type:String
    }

})
module.exports=mongoose.model("attendanceSchema",attendanceSchema)