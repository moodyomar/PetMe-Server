const mongoose = require("mongoose");
const Joi = require("joi");
// const {random} = require("lodash")


const dogsSchema = new mongoose.Schema({
  name:String,
  description:String,
  age:Number,
  size:String,
  breed:String,
  gender:String,
  image:String,
  createdAt: { 
    type: Date, default: Date.now()
  },
  user_id:String
})

exports.DogModel = mongoose.model("dogs",dogsSchema);

exports.validDog = (_dataBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    description:Joi.string().min(10).max(500).required(),
    age:Joi.number().min(1).max(200).required(),
    size:Joi.string().min(2).max(200).required(),
    breed:Joi.string().min(2).max(200).required(),
    gender:Joi.string().min(2).max(20).required(),
    image:Joi.string().min(2).max(200)
    
  })

  return joiSchema.validate(_dataBody)
}
