const internModel = require("../models/internModel");

const internValidation = async (req, res, next) => {
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;
    //====================checking the data in req.body=======================================================================================

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Please Insert Every Intern Details That's Required",
        });
    }
//=======================Name validation========================================================================================

    if (!name) {
      return res.status(400).send({ status: false, msg: "Please Insert Your Name" });
    }

    if (typeof (name)!== "string" || name.trim().length==0) {
      return res
        .status(400)
        .send({ status: false, msg: "Name must contain valid data / String only" });
    }
//=============================E-Mail validation==================================================================================================

    if (!email)
      return res
        .status(400)
        .send({ status: false, msg: "Please Insert E-mailId" });

    if (typeof email !== "string" || email.trim().length==0 )
      return res
        .status(400)
        .send({ status: false, msg:  "email must contain valid data / String only" });

    //---------------------------Email Validation Thorugh REGEX--------------------------------------------------------------------------------- 
    email=email.trim()
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res.status(400).send({ status: false, msg: "Invalid Email Id" });



 //==================================Mobile Validation==============================================================================     

    if (!mobile)
      return res
        .status(400)
        .send({ status: false, msg: "Please Input Mobile Number" });
    if (typeof mobile !== "string" || mobile.length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please Input Valid Number" });

 //------------------------------Mobile Validation Through REGEX ------------------------------------------------------------------------
    mobile=mobile.trim()
     if (!/^[6-9]\d{9}$/.test(mobile))
     return res
       .status(400)
       .send({ status: false, msg: "Wrong Mobile Number" });


//============== College Name validation===========================================================================================
    
  if (!collegeName)
      return res
        .status(400)
        .send({ status: false, msg: "Please Input collegeName" });

  if(typeof collegeName != "string" || collegeName.trim().length==0){
    res.status(400).send({status:false, msg:"collegeName must contain valid data / String only"})
    return
  }


 //------------------------DB call for Email ---------------------------------------------------------------------------------------      

 let emaiId = await internModel.findOne({ email: data.email });

 if (emaiId)
   return res
     .status(401)
     .send({
       status: false,
       msg: `${email} is already taken`,
     });


//-------------------------DB Call for Mobile Number-------------------------------------------------------------------------------------       

let validMobileNo = await internModel.findOne({ mobile: data.mobile });
if (validMobileNo)
  return res
    .status(403)
    .send({ status: false, msg: `${mobile} number is already taken` });

    next();
  } 
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.internValidation = internValidation;
