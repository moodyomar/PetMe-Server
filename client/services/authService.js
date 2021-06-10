// checking if there is a token and its valid, otherwise send us to the login page
const checkToken = async(_url) => {
// check if the token is actually 
  if(!localStorage["tok"]){
   return window.location.href = "login.html"
  }
  // let url = "http://localhost:3000/users/userInfo";
  try{
    let data = await doApiMethod(_url,"GET");
    // token invalid
    if(!data._id){
      // deleting the token + sending uawe to home page
//  inorder to avoid bugs
      localStorage.removeItem("tok");
      window.location.href = "login.html"
    }
    console.log("you logged");
    return data;
  } 
  catch(err){
    console.log(err);
    return err;
  }
  // console.log(data);

}