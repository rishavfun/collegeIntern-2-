const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const urlRegex = /(https?:\/\/.*\.(?:png|jpg))/;
 //  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

//================Create College API===============================================//
const CreateCollege = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  try {
  
    let { name, fullName, logoLink } = req.body;
    let data = req.body;

//============Check Data in Req.Body====================//
    if (Object.keys(req.body).length == 0) {
      res.status(400)
        .send({ status: false, msg: "Please provide College details" });
        return
    }

//==============Name Validation==========================//

    if (!name) {
      res.status(400).send({ status: false, msg: "Please provide Name" });
      return
    }
   
    if(typeof name !== "string" || name.trim().length == 0) { 
      res.status(400).send({ status: false, msg:  "Name must contain valid data / String only" });
      return
    }
    let validName = await collegeModel.find({ name });   /// object ShortHand property

    if (validName.length !== 0) {
      res
        .status(400)
        .send({ status: false, msg: "This name is already taken" });
      return;
    }

    //=============validation on fullName=====================//
    if (!fullName) {
      res.status(400).send({ status: false, msg: "Please provide fullName" });
      return
    }
    if (typeof fullName !== "string" || fullName.trim().length == 0) {
      res.status(400).send({ staues: false, msg:  "fullName must contain valid data / String only" });
      return
    }

    //=============validation on logoLink=====================//

    if (!logoLink) {
      res.status(400).send({ status: false, msg: "Please provide logoLink" });
      return
    }
    if (typeof logoLink !== "string" || logoLink.trim().length == 0) {
      res.status(400).send({ staues: false, msg:  "logoLink must contain valid data / String only" });
      return
    }
    logoLink=logoLink.trim()
    if(!urlRegex.test(logoLink)){
      res.status(400).send({status:false, msg:"Invalid logoLink"})
      return
    }
  
    //====================CreateCollege========================//
    let savedata = await collegeModel.create(data);

    res.status(201).send({ status: true, data: savedata });

  } 
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//==================================College Details API==========================================//




const collegeDetails = async function(req,res){
  res.setHeader('Access-Control-Allow-Origin','*')
  try{
    
     /// Check if query param is given or not
     if(Object.keys(req.query).length==0){
      res.status(400).send({status:false,msg:"Pls give query param"})
      return
     }


     /// Check for valid query Params
      let reqParamArray = ["collegeName"]
      for(let key in req.query){
          if(!reqParamArray.includes(key)){
              res.status(400).send({status:false, msg:`query parameters can be only - ${reqParamArray.join(",")}`})
              return
          }
      }
      


      /// Check for value given in queryParam
      if(req.query["collegeName"].length==0){
          res.status(400).send({status:false, msg:"Invalid queryParam value"})
          return
      }

      /// Check if given collegeName is valid or not
      
      const collegeNameFromQuery = req.query.collegeName
      let college = await collegeModel.findOne({name:collegeNameFromQuery}).select({_id:0, name:1, fullName:1, logoLink:1})
      if(!college){
          res.status(400).send({status:false, msg:"No college found"})
          return
      }

      //Geeting collegeId
      let collegeIdObj = await collegeModel.findOne({name:collegeNameFromQuery}).select()

      const collegeId = collegeIdObj._id

      college=JSON.parse(JSON.stringify(college))         /// Making deep copy (you can't change 'college' obj data directly)


      //Getting details of interns which are in college collegeName
      let internDetails = await internModel.find({collegeId}).select({name:1,email:1,mobile:1})

      if(internDetails.length==0){
          let interns = "No intern"
          college.interns=interns
          res.status(200).send({status:true, data:college})
      }

      college.interns=internDetails

      res.status(200).send({ data:college})
  }
  catch(err){
      res.status(500).send({status:false, msg:err.message})
  }
}

module.exports = { CreateCollege,collegeDetails };

