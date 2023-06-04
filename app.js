const express = require('express')
const cors = require("cors");
require("dotenv").config()

const app = express();
const router = require('./routes/router')
app.use(cors())
app.post('/batches', router)
app.get('/batches', router)
app.post('/student', router)
app.get('/student', router)

app.post('/studentbatch', router)
app.get('/studentbatch', router)
app.post('/studentattendance', router)
app.get('/studentattendance', router)
app.post('/getStudentAttendance', router)
app.post('/getStudentAbsentDate/:id', router)
app.post('/getStudentPresentDate/:id', router)
app.get('/loadStudentData', router)
app.get('/getOneStudentData/:id', router)
app.post('/deletestudentdata/:id', router)
app.get('/getOneBatchData/:id', router)

app.post('/deletebatchdata/:id', router)


const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))