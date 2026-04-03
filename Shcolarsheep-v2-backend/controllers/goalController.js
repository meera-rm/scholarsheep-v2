const express = require('express');
const router = express.Router();
const Goals = require('../queries/goals');
const { authenticate, authorize } = require('../middleware/authenticate');
const { getSchoolYear } = require('../services/awardService');

router.use(authenticate);

// GET /api/goals — get goals for current user (student sees their goals, teacher sees goals they set)
router.get('/', async (req, res) => {
  try {
    const role = req.user.role || req.user.user_role;
    const schoolYear = req.query.year || getSchoolYear();

    let goals;
    if (role === 'teacher') {
      goals = await Goals.getByTeacher(req.user.id, schoolYear);
    } else {
      goals = await Goals.getByStudent(req.user.id, schoolYear);
    }
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/goals/student/:studentId — get goals for a student (teacher/parent)
router.get('/student/:studentId', async (req, res) => {
  try {
    const schoolYear = req.query.year || getSchoolYear();
    const goals = await Goals.getByStudent(req.params.studentId, schoolYear);
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/goals — set a reading goal (teacher only)
router.post('/', authorize('teacher'), async (req, res) => {
  try {
    const { student_id, goal_type, goal_value } = req.body;
    if (!goal_type || !goal_value) {
      return res.status(400).json({ message: 'goal_type and goal_value required' });
    }
    const goal = await Goals.create({
      teacher_id: req.user.id,
      student_id: student_id || null,
      goal_type,
      goal_value,
      school_year: getSchoolYear(),
    });
    res.status(201).json({ goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/goals/:id — remove a goal (teacher only)
router.delete('/:id', authorize('teacher'), async (req, res) => {
  try {
    const deleted = await Goals.remove(req.params.id);
    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
