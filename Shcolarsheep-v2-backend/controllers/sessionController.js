const express = require('express');
const router = express.Router();
const Sessions = require('../queries/sessions');
const ReadingLog = require('../queries/readingLog');
const Notifications = require('../queries/notifications');
const SessionComments = require('../queries/sessionComments');
const ClassEnrollment = require('../queries/classEnrollment');
const { checkAndAwardStickers } = require('../services/awardService');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/sessions — get current user's sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Sessions.getByUser(req.user.id);
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/streak — get current user's streak
router.get('/streak', async (req, res) => {
  try {
    const streak = await Sessions.getStreak(req.user.id);
    res.json({ streak: streak || { current_streak: 0, longest_streak: 0 } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/heatmap — get daily stats for heatmap
router.get('/heatmap', async (req, res) => {
  try {
    const data = await Sessions.getDailyStats(req.user.id);
    res.json({ heatmap: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/daily/:date — get all sessions for a date (teacher view)
router.get('/daily/:date', async (req, res) => {
  try {
    const sessions = await Sessions.getByDate(req.params.date);
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/book/:bookId — get sessions for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const sessions = await Sessions.getByBook(req.user.id, req.params.bookId);
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/student/:studentId — teacher view of one enrolled student's sessions
router.get('/student/:studentId', async (req, res) => {
  try {
    const teachers = await ClassEnrollment.getTeachersOfStudent(req.params.studentId);
    const isMyStudent = teachers.some((t) => t.teacher_id === req.user.id);
    if (!isMyStudent) {
      return res.status(403).json({ message: 'Not your student' });
    }
    const sessions = await Sessions.getByUser(req.params.studentId);
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sessions/:id/comments — comments on a session
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await SessionComments.getBySession(req.params.id);
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sessions/:id/comments — teacher comments on a student's session
router.post('/:id/comments', async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can comment' });
    }
    const comment = await SessionComments.create({
      session_id: req.params.id,
      teacher_id: req.user.id,
      comment: req.body.comment,
    });
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sessions — log a reading session
router.post('/', async (req, res) => {
  try {
    const { book_id, reading_log_id, session_date, pages_read, minutes_spent, notes } = req.body;

    const session = await Sessions.create({
      user_id: req.user.id,
      book_id,
      reading_log_id,
      session_date,
      pages_read,
      minutes_spent,
      notes,
    });

    // Update current page on the reading log entry
    if (reading_log_id && pages_read > 0) {
      const entry = await ReadingLog.getOne(reading_log_id);
      if (entry) {
        await ReadingLog.update(reading_log_id, {
          current_page: (entry.current_page || 0) + pages_read,
        });
      }
    }

    // Notify teachers
    await Notifications.notifyTeachersOfStudent(req.user.id, {
      type: 'reading_session',
      title: `${req.user.username} logged a reading session`,
      message: `Read ${pages_read} pages (${minutes_spent} min)`,
      student_id: req.user.id,
      student_name: req.user.username,
      metadata: { book_id, pages_read, minutes_spent, session_date },
    });

    // Check awards
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

    res.status(201).json({ session, newAwards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
