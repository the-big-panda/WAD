const express = require("express");
const fs = require("fs")
const path = require("path")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    const data = fs.readFileSync("student_data.json","utf-8");
    const studentData = JSON.parse(data).students;
    return res.json(studentData);
})

app.post("/",(req,res)=>{
    const rollNum = req.body.rollNum;
    const data = fs.readFileSync("student_data.json","utf-8");
    const studentData = JSON.parse(data).students;
    const student = studentData.find(student => student.roll_number == rollNum);

    if (student) {
        return res.status(200).json(student);
    } else {
        return res.status(404).json({ message: "The student doesn't exist" });
    }
})

app.listen(8000,(req,res) => {
    console.log("Server running on port 8000");
})
