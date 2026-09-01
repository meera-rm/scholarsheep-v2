const express = require('express');
const books = express.Router();
const { getAllBooks, getABook, createBook, updateBook, deleteBook } = require('../queries/books');

const checkPicture = (req, res, next) => {
  if (!req.body.book_picture) {
    req.body.book_picture = 'https://covers.openlibrary.org/b/isbn/placeholder-M.jpg';
  }
  next();
};

// GET /api/books
books.get('/', async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.status(200).json({ success: true, payload: allBooks });
  } catch (error) {
    console.error('GET /api/books failed:', error);
    res.status(404).json({ success: false, message: 'No books found' });
  }
});

// GET /api/books/:bookId
books.get('/:bookId', async (req, res) => {
  try {
    const book = await getABook(req.params.bookId);
    res.status(200).json({ success: true, payload: book });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Cannot find the book with the given id' });
  }
});

// POST /api/books/new
books.post('/new', checkPicture, async (req, res) => {
  try {
    const addBook = await createBook(req.body);
    res.status(200).json({ success: true, payload: addBook[0] });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Book cannot be added' });
  }
});

// PUT /api/books/:bookId
books.put('/:bookId', async (req, res) => {
  try {
    const updatedBook = await updateBook(req.body, req.params.bookId);
    res.status(200).json({ success: true, payload: updatedBook });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Book info cannot be updated' });
  }
});

// DELETE /api/books/:bookId
books.delete('/:bookId', async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);
    res.status(200).json({ success: true, payload: deletedBook });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Book not found' });
  }
});

module.exports = books;
