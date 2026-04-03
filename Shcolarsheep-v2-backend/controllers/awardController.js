const express = require('express');
const router = express.Router();
const Awards = require('../queries/awards');
const { checkAndAwardStickers, getSchoolYear } = require('../services/awardService');
const { authenticate, authorize } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/awards — list all available awards
router.get('/', async (req, res) => {
  try {
    const awards = await Awards.getAll();
    res.json({ awards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/awards/earned — get current user's earned awards
router.get('/earned', async (req, res) => {
  try {
    const earned = await Awards.getEarnedByUser(req.user.id);
    res.json({ earned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/awards/earned/:userId — get a specific user's earned awards
router.get('/earned/:userId', async (req, res) => {
  try {
    const earned = await Awards.getEarnedByUser(req.params.userId);
    res.json({ earned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/awards/check — check and award new stickers for current user
router.post('/check', async (req, res) => {
  try {
    const newAwards = await checkAndAwardStickers(req.user.id);
    res.json({ newAwards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/awards/custom — create a custom award (teacher only)
router.post('/custom', authorize('teacher'), async (req, res) => {
  try {
    const { name, description, category, sticker_emoji, tier } = req.body;
    if (!name) return res.status(400).json({ message: 'Award name required' });

    const award = await Awards.createCustomAward({
      name, description, category, sticker_emoji, tier,
      created_by_teacher_id: req.user.id,
    });
    res.status(201).json({ award });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/awards/assign — manually assign an award to a student (teacher only)
router.post('/assign', authorize('teacher'), async (req, res) => {
  try {
    const { student_id, award_id } = req.body;
    if (!student_id || !award_id) {
      return res.status(400).json({ message: 'student_id and award_id required' });
    }
    const result = await Awards.assignAward(student_id, award_id, getSchoolYear());
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
