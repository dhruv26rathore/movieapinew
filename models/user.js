const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};


const User = mongoose.model('User', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      }
  }));

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(15).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).label("password must contain number, symbol, uppercase letter, lowercase letter, min 5 character and max 15 characters")
    };

    // "password must contain number, symbol, uppercase letter, lowercase letter, min 5 character and max 15 characters"

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;