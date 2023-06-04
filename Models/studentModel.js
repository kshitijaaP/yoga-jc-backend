// fullName: '', phoneNum: '',batchTiming:'', alternatePhNum: '', address: '', age: '', weight: '', height: '',isMedicalCondition:'' ,medicalCondition: '', dateOfJoining: '', feesPaid: '', feeDate: '', batch: '' 

const mongoose=require("mongoose")

const studentSchema=new  mongoose.Schema({
    fullName:{
        type:String
    },
    phoneNum:{
        type:String
    }, alternatePhNum:{
        type:String
    },
    address:{
        type:String
    },
    age:{
        type:String
    },
     weight:{
        type:String
    },
    height:{
        type:String
    }, 
    isMedicalCondition:{
        type:Boolean
    },
    medicalCondition:{
        type:String
    },
    dateOfJoining:{
        type:String
    }, feesPaid:{
        type:Boolean
    }
    ,
    feeDate:{
        type:String
    },
    batch:{
        type:String
    }
})
module.exports=mongoose.model("studentSchema",studentSchema)