-- ===== SEED BOOKS CATALOG (real ISBNs, cover/page data from OpenLibrary) =====
INSERT INTO books_catalog (title, author, isbn, cover_url, page_count, genre, reading_level, open_library_id, publish_year) VALUES
('Night Owl', 'Kim C. Lee', '9780578712697', 'https://covers.openlibrary.org/b/isbn/9780578712697-M.jpg', 28, 'Picture Book', 'Early Reader', '/books/OL32190356M', 2020),
('Cookies Week', 'Cindy Ward', '9780399243267', 'https://covers.openlibrary.org/b/isbn/9780399243267-M.jpg', NULL, 'Picture Book', 'Early Reader', NULL, NULL),
('Daddy Hugs', 'Karen Katz', '9781416941200', 'https://covers.openlibrary.org/b/isbn/9781416941200-M.jpg', 32, 'Board Book', 'Early Reader', '/books/OL8458919M', 2007),
('Charlotte''s Web', 'E.B. White', '9780064400558', 'https://covers.openlibrary.org/b/isbn/9780064400558-M.jpg', 184, 'Fiction', 'Middle Grade', '/books/OL61062640M', 1952),
('Matilda', 'Roald Dahl', '9780142410370', 'https://covers.openlibrary.org/b/isbn/9780142410370-M.jpg', 240, 'Fiction', 'Middle Grade', '/books/OL9737402M', 2007),
('Diary of a Wimpy Kid', 'Jeff Kinney', '9780810993136', 'https://covers.openlibrary.org/b/isbn/9780810993136-M.jpg', 226, 'Fiction', 'Middle Grade', '/books/OL36660032M', 2007),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '9780590353427', 'https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg', NULL, 'Fantasy', 'Middle Grade', '/books/OL61088892M', 1999),
('The Lightning Thief', 'Rick Riordan', '9780786838653', 'https://covers.openlibrary.org/b/isbn/9780786838653-M.jpg', 416, 'Fantasy', 'Middle Grade', '/books/OL42476783M', 2006),
('Wonder', 'R.J. Palacio', '9780375869020', 'https://covers.openlibrary.org/b/isbn/9780375869020-M.jpg', 315, 'Fiction', 'Middle Grade', '/books/OL25025136M', 2012),
('The One and Only Ivan', 'Katherine Applegate', '9780061992278', 'https://covers.openlibrary.org/b/isbn/9780061992278-M.jpg', 336, 'Fiction', 'Middle Grade', '/books/OL27319786M', 2015),
('Dog Man', 'Dav Pilkey', '9780545581608', 'https://covers.openlibrary.org/b/isbn/9780545581608-M.jpg', NULL, 'Graphic Novel', 'Early Reader', '/books/OL27916229M', 2016),
('The Bad Guys', 'Aaron Blabey', '9780545912402', 'https://covers.openlibrary.org/b/isbn/9780545912402-M.jpg', NULL, 'Graphic Novel', 'Early Reader', '/books/OL26212056M', 2017)
ON CONFLICT (isbn) DO NOTHING;
