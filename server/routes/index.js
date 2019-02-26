/*
Author : Sushmita Nandalan
Student ID: 300923159
Date: February 25, 2019
File name: COMP308-W2019-Midterm-300923159
Heroku app: https://comp308-w2019midterm-300923159.herokuapp.com/
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
