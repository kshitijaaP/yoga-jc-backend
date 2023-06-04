const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors");
const router = express()
const batchSchema = require("../Models/batchModel")
const studentSchema = require('../Models/studentModel')
const attendanceSchema = require('../Models/attendancModel')
let dataSaved = false
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://root:root1234@cluster0.w1zxyqo.mongodb.net/test").then(
    console.log("connected"))

router.use(express.json())
router.use(cors())

router.post("/batches", (req, res) => {
    console.log(req.body)
    console.log(req.body._id)
    if(req.body._id !==null && req.body._id !==undefined)
    {
        batchSchema.findOneAndUpdate({_id:req.body._id },req.body,{new:true},(err,data)=>{
            console.log("data updated")
            res.send({data})
        })
    }
    else{
        const { batchCode, batchTimingFrom, batchTimingTo } = req.body
      
        const batchSave = new batchSchema({
            batchCode, batchTimingFrom,batchTimingTo
        })
        batchSave.save((err, data) => {
            if (err) throw err
            else {
                res.send({ data })
            }
        })
    }

   
})
router.get("/batches", (req, res) => {
    batchSchema.find((err, data) => {
        if (err) throw err
        else {
            res.send({ data })
        }
    })
})
router.post('/student', (req, res) => {
    console.log(req.body._id)
    if(req.body._id !==null)
    {
        studentSchema.findOneAndUpdate({_id:req.body._id },req.body,{new:true},(err,data)=>{
            console.log("data updated")
            res.send({data})
        })
    }
    else{
        const { fullName, phoneNum, batchTiming, alternatePhNum, address, age, weight, height, isMedicalCondition, medicalCondition, dateOfJoining, feesPaid, feeDate, batch } = req.body
        const studentSave = new studentSchema({
            fullName, phoneNum, batchTiming, alternatePhNum, address, age, weight, height, isMedicalCondition, medicalCondition, dateOfJoining, feesPaid, feeDate, batch
        })
        studentSave.save((err, data) => {
            if (err) throw err
            else {
                res.send({ data })
                console.log("new data  saved")
            }
        })
    }
   
})
router.get('/student', (req, res) => {
    studentSchema.find((err, data) => {
        if (err) throw err
        else {
            res.send({ data })
        }
    })
})

router.post("/studentbatch", (req, res) => {
    const { batchTiming } = req.body
    console.log(batchTiming)
    studentSchema.find({ batch: batchTiming }, function (err, data) {
        if (err) throw err
        else {
            console.log(data)
            res.send({ data })
        }
    })
})
router.post("/studentattendance", async (req, res) => {
    await req.body.forEach(element => {
        const { studentId, fullName, attendanceDate, isPresentAbsent, batch } = element
        const attendance = new attendanceSchema({
            studentId, fullName, attendanceDate, isPresentAbsent, batch
        })
        attendance.save((err, data) => {
            if (err) throw err
            else {
                dataSaved = true
            }
        })
    });
    if (dataSaved === true) {
        res.send({ message: 'Attendance Saved' })
    }

})
router.post('/getStudentAttendance', (req, res) => {
    const { batchTiming } = req.body
    let storeResult = []
    let storeData = []
    var resultArray = []
    var sendResult = []
    attendanceSchema.aggregate([
         { $match : { batch : batchTiming } } ,
        {  
            $group:
            { 
                _id: { studentId: "$studentId", studentName: "$fullName" }
            }
        }
    ])
        .then(result => {
            storeResult = result

            attendanceSchema.find({ attendanceDate: { $gte: req.body.dateFrom, $lte: req.body.dateTo }, batch: batchTiming }, (err, data) => {
                if (err) throw err
                else {
                    storeData = data
                    // resultArray.push({ studentId: '', studentName: '', absent: 0, present: 0 })
                    storeResult.forEach((result) => {
                        let presentCounter = 0
                        let absentCounter = 0
                        data.forEach((dataItem) => {
                            if (dataItem.studentId === result._id.studentId) {
                                if (dataItem.isPresentAbsent === 'true') {
                                    presentCounter = presentCounter + 1
                                }
                                else {
                                    absentCounter = absentCounter + 1
                                }
                            }
                        })
                        // resultArray.forEach((kshiti) => {
                        //     kshiti.studentId = result._id.studentId
                        //     kshiti.studentName = result._id.studentName
                        //     kshiti.absent = absentCounter
                        //     kshiti.present = presentCounter
                        // })
                        resultArray.push({ studentId: result._id.studentId, studentName: result._id.studentName, absent: absentCounter, present:  presentCounter })
                        
                    })
                    res.send(resultArray)
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
})
router.post('/getStudentPresentDate/:id',(req,res)=>{
   
    attendanceSchema.find({studentId:req.params.id,isPresentAbsent:"true"},(err,data)=>{
        if(err) throw err
        else{

            res.send({data})
        }
       
    })
})
router.post('/getStudentAbsentDate/:id',(req,res)=>{

    attendanceSchema.find({studentId:req.params.id,isPresentAbsent:"false"},(err,data)=>{
        if(err) throw err
        else{
            res.send({data})
        }
       
    })
})
router.get('/loadStudentData',(req,res)=>{
    studentSchema.find((err,data)=>{
        res.send({data})
    })
})
router.get('/getOneStudentData/:id',(req,res)=>{

    studentSchema.find({_id:req.params.id},(err,data)=>{
        res.send(data)
        
    })
})
router.post('/deletestudentdata/:id',(req,res)=>{
    studentSchema.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        else{
            console.log("deleted")
            res.send({message:'Deleted'})
        }
    })
})
router.get('/getOneBatchData/:id',(req,res)=>{
console.log(req.params.id)
    batchSchema.find({_id:req.params.id},(err,data)=>{
        
        res.send(data)
        
    })
})
router.post('/deletebatchdata/:id',(req,res)=>{
    batchSchema.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        else{
            console.log("deleted")
            res.send({message:'Deleted'})
        }
    })
})

module.exports = router