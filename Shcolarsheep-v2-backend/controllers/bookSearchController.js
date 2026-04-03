const express = require('express');
const router = express.Router();
const { searchBooks, getBookByISBN } = require('../services/openLibraryService');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/book-search?q=query&limit=12
router.get('/', async (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }
    const results = await searchBooks(q.trim(), parseInt(limit) || 12);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Book search failed: ' + error.message });
  }
});

// GET /api/book-search/isbn/:isbn
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
