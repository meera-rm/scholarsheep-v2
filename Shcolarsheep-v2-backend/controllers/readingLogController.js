const express = require('express');
const router = express.Router();
const ReadingLog = require('../queries/readingLog');
const BooksCatalog = require('../queries/booksCatalog');
const Notifications = require('../queries/notifications');
const { checkAndAwardStickers, getSchoolYear } = require('../services/awardService');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/reading-log — get current user's reading log
router.get('/', async (req, res) => {
  try {
    const books = await ReadingLog.getByUser(req.user.id);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reading-log/stats — get current user's stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await ReadingLog.getStats(req.user.id);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reading-log/user/:userId — get another user's log (for teachers/parents)
router.get('/user/:userId', async (req, res) => {
  try {
    const books = await ReadingLog.getByUser(req.params.userId);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reading-log/:id — get single reading log entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await ReadingLog.getOne(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reading-log — add a book to reading log
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, cover_url, page_count, genre, open_library_id, status } = req.body;

    // Ensure book exists in catalog
    let book;
    if (isbn) {
      book = await BooksCatalog.findByISBN(isbn);
    }
    if (!book) {
      book = await BooksCatalog.createBook({
        title, author, isbn, cover_url, page_count, genre,
        open_library_id, description: null, publish_year: null, reading_level: null,
      });
    }

    // Create reading log entry
    const entry = await ReadingLog.create({
      user_id: req.user.id,
      book_id: book.id,
      status: status || 'want_to_read',
      school_year: getSchoolYear(),
    });

    // Check awards
    const newAwards = await checkAndAwardStickers(req.user.id);

    res.status(201).json({ entry, newAwards });
  } catch (error) {
    if (error.message?.includes('unique')) {
      return res.status(409).json({ message: 'Book already in your reading log' });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/reading-log/:id — update status, rating, review, page
router.put('/:id', async (req, res) => {
  try {
    const { status, current_page, rating, review } = req.body;
    const entry = await ReadingLog.update(req.params.id, { status, current_page, rating, review });

    // Notify teachers if book completed
    if (status === 'completed') {
      await Notifications.notifyTeachersOfStudent(req.user.id, {
        type: 'book_completed',
        title: `${req.user.username} finished a book!`,
        message: `Completed "${entry.title || 'a book'}"${rating ? ` — rated ${rating}/5` : ''}`,
        student_id: req.user.id,
        student_name: req.user.username,
        metadata: { book_id: entry.book_id, rating },
      });
    }

    const newAwards = await checkAndAwardStickers(req.user.id);

    // Notify teachers of new awards
    for (const award of newAwards) {
      await Notifications.notifyTeachersOfStudent(req.user.id, {
        type: 'award_earned',
        title: `${req.user.username} earned a sticker!`,
        message: `${award.sticker_emoji} ${award.name}`,
        student_id: req.user.id,
        student_name: req.user.username,
        metadata: { award_id: award.id, award_name: award.name },
      });
    }

    res.json({ entry, newAwards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/reading-log/:id — remove book from log
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ReadingLog.remove(req.params.id);
    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
