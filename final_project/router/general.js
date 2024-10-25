const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body;

  if(!username|| !password){
    return res.status(400).json({message:"Username or Password  are not provided"})
  }
  const validUsername = isValid(username);
  if(validUsername){
    return res.status(400).json({message : "User name is already exists"})
  }
  return res.status(200).json({message: "User Registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  if(books){
    return res.status(200).json({books : books})
  }else{
    return res.status(400).json({books: "Books not found"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const isbnBooks = books[isbn]
  if(isbnBooks){
    return res.status(200).json({books: isbnBooks});
  }else{
    return res.status(400).json({books: "Invalid ISBN number"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const auther = req.params.author.toLowerCase();
  const resultBooks = Object.values(books).filter(book => book.author.toLowerCase() === auther);

  if(resultBooks.length > 0 ){
    return res.status(200).json({books: resultBooks});
  }else{
    return res.status(400).json({books: "Author not found"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title.toLowerCase();
  const resultBooks = Object.values(books).filter(book => book.title.toLowerCase() === title);

  if(resultBooks.length > 0 ){
    return res.status(200).json({books: resultBooks});
  }else{
    return res.status(400).json({books: "Title not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn.toLowerCase();
  const resultBooks = books[isbn];

  if(resultBooks ){
    return res.status(200).json({reviews: resultBooks.reviews});
  }else{
    return res.status(400).json({books: "ISBN not found"});
  }
});

module.exports.general = public_users;
