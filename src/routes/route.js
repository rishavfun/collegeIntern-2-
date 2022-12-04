
const express = require("express")
const router = express.Router()
const collegeController = require("../Controllers/collegeController")
const internController= require("../Controllers/internController")
const validation =require("../validation/valid")  

router.get("/test", function(req,res){
    res.send("Connected")
})

router.post("/functionup/colleges",collegeController.CreateCollege)

router.post("/functionup/interns",validation.internValidation, internController.createIntern)

router.get("/functionup/collegeDetails",collegeController.collegeDetails)

router.all("/*", function (req, res) {
    res.status(400).send({status: false, message: "Make Sure Your Endpoint is Correct !!!"
    });
});

module.exports=router