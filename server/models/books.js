/*
Author : Sushmita Nandalan
Student ID: 300923159
Date: February 25, 2019
File name: COMP308-W2019-Midterm-300923159
Heroku app: https://comp308-w2019midterm-300923159.herokuapp.com/
*/

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
