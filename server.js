const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const express = require("express");
const bodyParser = require("body-parser");
const users = require("./app/routes/user.routes.js");
const user_auth = require("./app/routes/user_auth.routes.js");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Simple POS app" });
});

// Require  routes
require("./app/routes/order.routes.js")(app);
app.use("/users", users);
app.use("/user_auth", user_auth);

//require('./app/routes/user.routes.js')(app);
//app.use(require('./routes/user.routes.js'));

/*
var http = require("http");

app.options("/url...", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");
  return res.sendStatus(200);
});
*/

// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
