const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 10
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000
    }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(10)
      .required(),
    password: Joi.string()
      .min(5)
      .max(20)
      .required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
