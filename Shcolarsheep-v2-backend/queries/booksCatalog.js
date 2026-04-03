const db = require('../db/dbConfig');

const findByISBN = (isbn) =>
  db.oneOrNone('SELECT * FROM books_catalog WHERE isbn=$1', [isbn]);

const findById = (id) =>
  db.oneOrNone('SELECT * FROM books_catalog WHERE id=$1', [id]);

const createBook = (book) =>
  db.one(
    `INSERT INTO books_catalog (title, author, isbn, cover_url, page_count, genre, reading_level, open_library_id, description, publish_year)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (isbn) DO UPDATE SET title=EXCLUDED.title
     RETURNING *`,
    [book.title, book.author, book.isbn, book.cover_url, book.page_count, book.genre, book.reading_level, book.open_library_id, book.description, book.publish_year]
  );

const allBooks = () => db.any('SELECT * FROM books_catalog ORDER BY created_at DESC');

module.exports = { findByISBN, findById, createBook, allBooks };
