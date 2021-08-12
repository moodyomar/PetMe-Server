const express = require("express");
const {
  DogModel,
  validDog
} = require('../models/dogsModel')
const { authToken } = require("../middlewares/auth")
const router = express.Router();



router.get("/", async(req, res) => {
  try {
    let data = await DogModel.find({})
    res.json(data)

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

})
router.post("/", authToken, async(req,res) => {
  let validBody = validDog(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let dog = new DogModel(req.body);
    // ill add a prop for the id of the user
    // before saving in DB
    dog.user_id = req.tokenData._id;
    await dog.save();
    res.status(201).json(dog);

  } catch(err) {
      console.log(err);
      res.status(400).json(err);
  }
})
  router.delete("/:idDel", authToken, async (req, res) => {
    let idDel = req.params.idDel;
    try {
      let data = await DogModel.deleteOne({ _id:idDel , user_id:req.tokenData._id });
      // if success we recived n:1
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  })

  router.put("/:idEdit", authToken, async (req, res) => {
    let idEdit = req.params.idEdit;
    let validBody = validDog(req.body)
    if(validBody.error){
      return res.status(400).json(validBody.error.details)
    }

    try {
      let data = await DogModel.updateOne({ _id: idEdit , user_id:req.tokenData._id }, req.body);
      console.log("edit - in try block!",req.body)
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  })
  



module.exports = router;