const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // Validate The HTTP Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //  Find the user by their email address
  let user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send("Incorrect name or password.");
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  //adding json web tokens
  const token = jwt.sign({ _id: user._id }, "PrivateKey");
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  res.send(token);
});

function validate(req) {
  const schema = {
    name: Joi.string()
      .required()
      .name(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
