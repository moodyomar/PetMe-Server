const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData")

exports.authToken = (req,res,next) => {
  let validToken = req.header("x-auth-token");
  if(!validToken){
    return res.status(401).json({msg:"Invalid attempt to log in , Token is needed"});
  }
  try{
    let decodeToken = jwt.verify(validToken,config.jwtSecret);
    req.tokenData = decodeToken;
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({err:"token invalid or expired"});
  }
}