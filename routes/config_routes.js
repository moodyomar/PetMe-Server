const indexR = require("./index");
const usersR = require("./users");
const dogsR = require("./dogs");

exports.originAllow = (app) => {
  // allwoing requests from another domain
  app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // in real domain we would put the real domain instead of the *
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
    next();
  });
}

exports.routerInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/dogs",dogsR);


  app.use((req,res) => {
    res.json({msg:"Url not found , page 404 "})
    console.log("config routes!")
  })
}

