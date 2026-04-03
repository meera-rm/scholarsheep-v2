const express = require('express');
const router = express.Router();
const Recommendations = require('../queries/recommendations');
const { authenticate, authorize } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/recommendations/for-me — personalized recommendations
router.get('/for-me', async (req, res) => {
  try {
    const books = await Recommendations.getForUser(req.user.id);
    res.json({ recommendations: books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/recommendations/:bookId — recommendations for a specific book
router.get('/:bookId', async (req, res) => {
  try {
    const books = await Recommendations.getForBook(req.params.bookId);
    res.json({ recommendations: books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/recommendations/refresh — recompute recommendations (admin/teacher)
router.post('/refresh', authorize('teacher'), async (req, res) => {
  try {
    await Recommendations.refreshRecommendations();
    res.json({ success: true, message: 'Recommendations refreshed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
