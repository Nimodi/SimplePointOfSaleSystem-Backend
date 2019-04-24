const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./app/routes/user.routes.js");
const user_auth = require("./app/routes/user_auth.routes.js");
let morgan = require("morgan");
let app = express();
let config = require("config"); //we load the db location from the JSON files
//db options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

// //db connection
const dburl = config.get("dbConfig.url");

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//Configuring the database
//const dbConfig = require("./config/database.config.js");

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dburl, {
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

// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
module.exports = app; // for testing
