/*
Author : Sushmita Nandalan
Student ID: 300923159
Date: February 25, 2019
File name: COMP308-W2019-Midterm-300923159
Heroku app: https://comp308-w2019midterm-300923159.herokuapp.com/
*/

// required modules for our User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//create model class
let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "Username is required!"
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "Email is required!"
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required!"
    },
    created: {
      type: Date,
      default: Date.now
    },
    update: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "users"
  }
);

// configure options for UserSchema

let options = ({
    missingPasswordError: "Wrong / Missing Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User',userSchema);