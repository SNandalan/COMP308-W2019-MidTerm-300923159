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

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render('books/details',{
      title: 'Add New Book',
      books: ''
      });      
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    //new book object created  
    book.create(newBook, (err, book) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //refresh book list
        res.redirect("/books");
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id=req.params.id;
    
    //finds book using id
    book.findById(id,(err, bookObject)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
          //show edit view
          res.render('books/details',{
            title:'Edit Book',
            books:bookObject
      });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    let updateBook = book({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.update({_id:id}, updateBook, (err) =>{
      if(err){
        console.log(err);
        res.end(err);
      }else{
        //refresh book list
        res.redirect('/books');
      }
    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id=req.params.id;
    book.remove({_id:id}, (err)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{
            //refresh page
            res.redirect('/books');
    
        }
    }); 
});


module.exports = router;
