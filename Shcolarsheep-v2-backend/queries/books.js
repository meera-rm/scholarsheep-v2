const db = require('../db/dbConfig');

const getAllBooks = () => db.any('SELECT * FROM books ORDER BY book_id');

const getABook = (bookId) => db.one('SELECT * FROM books WHERE book_id=$1', [bookId]);

const createBook = (book) =>
  db.any(
    'INSERT INTO books (book_title, book_author, isbn_number, publication, book_picture, grade, reading_level) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [book.book_title, book.book_author, book.isbn_number, book.publication, book.book_picture, book.grade, book.reading_level]
  );

const updateBook = (book, bookId) =>
  db.one(
    'UPDATE books SET book_title=$1, book_author=$2, isbn_number=$3, publication=$4, book_picture=$5, grade=$6, reading_level=$7 WHERE book_id=$8 RETURNING *',
    [book.book_title, book.book_author, book.isbn_number, book.publication, book.book_picture, book.grade, book.reading_level, bookId]
  );

const deleteBook = (bookId) =>
  db.one('DELETE FROM books WHERE book_id=$1 RETURNING *', [bookId]);

module.exports = { getAllBooks, getABook, createBook, updateBook, deleteBook };
