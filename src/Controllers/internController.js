
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const createIntern = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;
//=================== DB Call ========================================================================================================
  // Check for collegeName is valid or not
    //data = { name, email, mobile, collegeName }
    let collegeDetails = await collegeModel.findOne({ name:collegeName });
    if (!collegeDetails) {
      return res.status(400).send({ status: false, msg: "NO such college" });
    }

    let collegeId = collegeDetails._id.toString();

    data.collegeId = collegeId

    let savedata = await internModel.create(data);

    res.status(201).send({ status: true, data: savedata });

  } 
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createIntern };

   
