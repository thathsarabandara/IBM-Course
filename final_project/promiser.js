const axios = require('axios');

// Base URL for your local server (adjust the port if needed)
const BASE_URL = 'http://localhost:5001';

// Task 10: Get the list of books
async function getBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("List of Books:", response.data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
}

// Task 11: Get book details based on ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(`Book Details for ISBN ${isbn}:`, response.data);
  } catch (error) {
    console.error("Error fetching book by ISBN:", error.message);
  }
}

// Task 12: Get book details based on Author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(`Books by Author ${author}:`, response.data);
  } catch (error) {
    console.error("Error fetching books by author:", error.message);
  }
}

// Task 13: Get book details based on Title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(`Books with Title ${title}:`, response.data);
  } catch (error) {
    console.error("Error fetching books by title:", error.message);
  }
}


getBooks();                     
getBookByISBN(1);              
getBooksByAuthor("Chinua Achebe"); 
getBooksByTitle("Things Fall Apart"); 
