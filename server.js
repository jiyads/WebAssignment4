/********************************************************************************* 
Add the following declaration at the top of your server.js file:
/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jiyad Mohammed Arif Shaikh Student ID: 149307233 Date: 07/16/2024
*
* Online (Heroku) Link: https://fast-journey-04365-561f7408635d.herokuapp.com/
*
********************************************************************************/

const express = require("express");
const path = require("path");
const data = require("./modules/collegeData.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

app.get("/students", (req, res) => {
    if (req.query.course) {
        data.getStudentsByCourse(req.query.course).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        data.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

app.get("/students/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});


app.post("/students/add", (req, res) => {
    data.addStudent(req.body).then(()=>{
      res.redirect("/students");
    });
  });

app.get("/student/:studentNum", (req, res) => {
    data.getStudentByNum(req.params.studentNum).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message:"no results"});
    });
});

app.get("/tas", (req,res) => {
    data.getTAs().then((data)=>{
        res.json(data);
    });
});

app.get("/courses", (req,res) => {
    data.getCourses().then((data)=>{
        res.json(data);
    });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
});


data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});
