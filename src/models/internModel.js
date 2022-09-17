
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema ({
name :{
    type : String,
    required : "Name is required",
    lowercase : true,
    trim: true
},
email :{
    type :String,
    required : "Email is required",
    unique : true,
    lowercase : true,
    trim: true
},
mobile :{
    type : String,
    required : "Mobile Number is required",
    unique : true,
},
collegeId : {
    type : ObjectId,
    ref : "College",
    trim: true
},
isDeleted : {
    type : Boolean,
    default : false
}

},{timestamps:true})

module.exports = mongoose.model("Intern",internSchema)

//{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}