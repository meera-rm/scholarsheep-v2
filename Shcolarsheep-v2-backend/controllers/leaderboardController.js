const express = require('express');
const router = express.Router();
const Leaderboard = require('../queries/leaderboard');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/leaderboard?period=weekly|monthly|alltime&sort=books|pages
router.get('/', async (req, res) => {
  try {
    const { period, sort, year } = req.query;
    const schoolYear = year || null;
    const data = await Leaderboard.getLeaderboard(schoolYear, period || 'alltime', sort || 'books');

    const ranked = data.map((student, i) => ({
      rank: i + 1,
      ...student,
    }));

    res.json({ leaderboard: ranked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leaderboard/class — class-specific leaderboard (teacher)
router.get('/class', async (req, res) => {
  try {
    const { period, sort, year } = req.query;
    const data = await Leaderboard.getClassLeaderboard(
      req.user.id, year || null, period || 'alltime', sort || 'books'
    );

    const ranked = data.map((student, i) => ({
      rank: i + 1,
      ...student,
    }));

    res.json({ leaderboard: ranked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
