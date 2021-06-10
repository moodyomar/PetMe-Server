const express = require("express");
const path = require("path");
const http = require("http");

const mongodb = require("./db/mongoConnect");
const {routerInit, originAllow} = require("./routes/config_routes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

// solve the security problem of send payload from another domain
originAllow(app);
routerInit(app);

const server = http.createServer(app);

let port = process.env.PORT || "3000";
server.listen(port);