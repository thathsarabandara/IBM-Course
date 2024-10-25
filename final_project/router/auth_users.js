const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
require('dotenv').config();

let users = [
  {username : "thathsara", password: "123456"},
  {username : "sachintha", password: "987654"},
];

const isValid = (username)=>{ 
 const user = users.some(user => user.username === username)
 if(user){
   return true;
 }else{
   return false;
 }
}

const authenticatedUser = (username,password)=>{
  const user = users.some(user => user.username === username && user.password === password)
 if(user){
   return true;
 }else{
   return false;
 }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username , password } = req.body;
  
  if(!username || !password){
    return res.status(400).json({message: "Username or password is not provided!"});
  }
  const authuser = authenticatedUser(username, password);

  if (authuser){
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    req.session.authorization = { token, username}
    return res.status(200).send("User successfully logged in");
  }else{
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username =  req.session.authorization.username;
  const review = req.body.review;
  const resultBook = books[isbn];

  if(!req.session.authorization){
    return res.status(400).json({books: "User not logged in!"});
  }

  if(!resultBook){
    return res.status(400).json({books: "ISBN not found"});
  }

  if(resultBook.reviews[username]){
    resultBook.reviews[username] = review;
    return res.status(200).json({ message: "Review updated successfully", resultBook });
  }else{
    resultBook.reviews[username] = review;
    return res.status(201).json({ message: "Review added successfully", resultBook });
  }
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username =  req.session.authorization.username;
  const review = req.body.review;
  const resultBook = books[isbn];

  if(!req.session.authorization){
    return res.status(400).json({books: "User not logged in!"});
  }

  if(!resultBook){
    return res.status(400).json({books: "ISBN not found"});
  }

  if(resultBook.reviews[username]){
    resultBook.reviews[username] = review;
    return res.status(200).json({ message: "Review updated successfully", resultBook });
  }else{
    resultBook.reviews[username] = review;
    return res.status(201).json({ message: "Review added successfully", resultBook });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
