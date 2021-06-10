const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  birth: String,
  City:String,
  createdAt: { 
    type: Date, default: Date.now()
  },
  role:{
    type:String, default:"regular"
  },
  // favorite:Array => maybe later on ill add it
});

exports.UserModel = mongoose.model("users",userSchema);

// making a token 
exports.getToken = (_userId) => {
  let token = jwt.sign({_id:_userId}, config.jwtSecret,{expiresIn:"60mins"});
  return token;
}

exports.validUser = (_dataBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    phone:Joi.string().min(6).max(99).required(),
    birth:Joi.string().min(4).max(99).required(),
    city:Joi.string().min(2).max(99).required(),
    email:Joi.string().min(2).max(99).email().required(),
    password:Joi.string().min(2).max(99).required()
  })

  return joiSchema.validate(_dataBody)
}

exports.validLogin = (_dataBody) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(99).email().required(),
    password:Joi.string().min(2).max(99).required()
  })

  return joiSchema.validate(_dataBody)
}


// exports.validCardsArray = (_dataBody) => {
//   let joiSchema = Joi.object({
//     cards:Joi.array().min(1).required()
//   })

//   return joiSchema.validate(_dataBody)
// }

