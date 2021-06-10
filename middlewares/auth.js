const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData")

exports.authToken = (req,res,next) => {
  let validToken = req.header("x-auth-token");
  if(!validToken){
    return res.status(401).json({msg:"you must send token ! ,read the docs of the api !!!!"});
  }
  try{
    let decodeToken = jwt.verify(validToken,config.jwtSecret);
    // sending to req the variable as a prop
    // so the other func in route can take the data in id of the user
    req.tokenData = decodeToken;
    // all go next() wil go to the next func
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({err:"token invalid or expired"});
  }
}