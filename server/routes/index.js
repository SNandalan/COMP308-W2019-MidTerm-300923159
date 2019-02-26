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

/* GET display the login page */
router.get('/login', (req, res, next) => {
  
  //checks if user is logged in
  if(!req.user){
    res.render('auth/login', {
      title: 'Login',
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : ""
    });
  }else{
    return res.redirect('/');
  }

});

/* POST process the login page */
router.post('/login',(req, res, next) => {
  passport.authenticate('local',
  (err, user, info) =>{
      //checks for a server error?
      if(err){
          return next(err);
      }
      //checks for a user login error?
      if(!user){
          req.flash("loginMessage", "Authentication Error");
          return res.redirect('/login');
      }
      req.logIn(user, (err) => {
          //checks for a server error?
          if(err){
              return next(err);
          }
          return res.redirect('/books');
      });
  })(req, res, next);
});

/* GET display the user registration page */
router.get('/register', (req, res, next) => {
  if(!req.user){
    res.render('auth/register', {
        title: 'Register',
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : '',
        username: req.user ? req.user.username : ""
      });
  }else{
    return res.redirect('/');
  }
});

/* POST processes the user registration page */
router.post('/register', (req, res, next) => {
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
  });

  //password encryption
  User.register(newUser,req.body.password, err =>{
        if(err){
            console.log('Error: Cannot register user');
            if(err.name == "UserExistsError"){
                req.flash('registerMessage', 'Error: User Already Exists!');
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : '',
                username: req.user ? req.user.username : ""
            });
        }else{
            // if there are no errors, registration is successful
            // redirects user
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('/books');
            });
        }
    });
});

/* GET user logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
