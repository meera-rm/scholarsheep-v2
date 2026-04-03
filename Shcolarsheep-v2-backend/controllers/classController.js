const express = require('express');
const router = express.Router();
const ClassEnrollment = require('../queries/classEnrollment');
const ReadingLog = require('../queries/readingLog');
const Sessions = require('../queries/sessions');
const { authenticate, authorize } = require('../middleware/authenticate');
const { getSchoolYear } = require('../services/awardService');

router.use(authenticate);
router.use(authorize('teacher'));

// GET /api/class/students — get all students in teacher's class
router.get('/students', async (req, res) => {
  try {
    const schoolYear = req.query.year || getSchoolYear();
    const students = await ClassEnrollment.getStudentsByTeacher(req.user.id, schoolYear);
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/class/stats — aggregate class stats
router.get('/stats', async (req, res) => {
  try {
    const schoolYear = req.query.year || getSchoolYear();
    const students = await ClassEnrollment.getStudentsByTeacher(req.user.id, schoolYear);

    const stats = {
      total_students: students.length,
      total_books: 0,
      total_pages: 0,
      avg_books: 0,
      students_data: [],
    };

    for (const student of students) {
      const studentStats = await ReadingLog.getStats(student.student_id);
      const streak = await Sessions.getStreak(student.student_id);

      const data = {
        student_id: student.student_id,
        username: student.username,
        ...studentStats,
        current_streak: streak?.current_streak || 0,
        longest_streak: streak?.longest_streak || 0,
      };

      stats.total_books += studentStats.total_books;
      stats.total_pages += studentStats.total_pages;
      stats.students_data.push(data);
    }

    stats.avg_books = students.length > 0
      ? Math.round((stats.total_books / students.length) * 10) / 10
      : 0;

    // Sort by total_books desc
    stats.students_data.sort((a, b) => b.total_books - a.total_books);

    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/class/daily/:date — get reading activity for a date
router.get('/daily/:date', async (req, res) => {
  try {
    const sessions = await Sessions.getByDate(req.params.date);

    // Filter to only students in this teacher's class
    const schoolYear = getSchoolYear();
    const students = await ClassEnrollment.getStudentsByTeacher(req.user.id, schoolYear);
    const studentIds = new Set(students.map((s) => s.student_id));

    const filtered = sessions.filter((s) => studentIds.has(s.user_id));

    const totalPages = filtered.reduce((sum, s) => sum + (s.pages_read || 0), 0);
    const totalMinutes = filtered.reduce((sum, s) => sum + (s.minutes_spent || 0), 0);
    const uniqueReaders = new Set(filtered.map((s) => s.user_id)).size;

    res.json({
      date: req.params.date,
      sessions: filtered,
      summary: { total_sessions: filtered.length, unique_readers: uniqueReaders, total_pages: totalPages, total_minutes: totalMinutes },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/class/enroll — enroll a student
router.post('/enroll', async (req, res) => {
  try {
    const { student_id, class_name } = req.body;
    const schoolYear = getSchoolYear();
    const enrollment = await ClassEnrollment.enroll({
      student_id, teacher_id: req.user.id, class_name, school_year: schoolYear,
    });
    res.status(201).json({ enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/class/enroll/:studentId — unenroll a student
router.delete('/enroll/:studentId', async (req, res) => {
  try {
    const schoolYear = getSchoolYear();
    const result = await ClassEnrollment.unenroll(req.params.studentId, req.user.id, schoolYear);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
