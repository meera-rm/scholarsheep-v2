const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

// GET /api/reports/student/:userId/:year — student yearly report
router.get('/student/:userId/:year', async (req, res) => {
  try {
    const { userId, year } = req.params;

    const booksCompleted = await db.any(`
      SELECT rl.*, bc.title, bc.author, bc.cover_url, bc.page_count, bc.genre
      FROM reading_log rl
      JOIN books_catalog bc ON rl.book_id = bc.id
      WHERE rl.user_id=$1 AND rl.school_year=$2 AND rl.status='completed'
      ORDER BY rl.end_date
    `, [userId, year]);

    const totalPages = booksCompleted.reduce((sum, b) => sum + (b.page_count || 0), 0);
    const totalBooks = booksCompleted.length;

    const totalMinutes = await db.one(`
      SELECT COALESCE(SUM(minutes_spent), 0)::int AS total
      FROM reading_sessions
      WHERE user_id=$1 AND session_date >= $2::date AND session_date < ($2::date + interval '1 year')
    `, [userId, `${year.split('-')[0]}-08-01`]);

    const genreBreakdown = await db.any(`
      SELECT bc.genre, COUNT(*)::int AS count
      FROM reading_log rl
      JOIN books_catalog bc ON rl.book_id = bc.id
      WHERE rl.user_id=$1 AND rl.school_year=$2 AND rl.status='completed' AND bc.genre IS NOT NULL
      GROUP BY bc.genre ORDER BY count DESC
    `, [userId, year]);

    const awards = await db.any(`
      SELECT sa.*, a.name, a.sticker_emoji, a.tier
      FROM student_awards sa
      JOIN awards a ON sa.award_id = a.id
      WHERE sa.user_id=$1 AND sa.school_year=$2
      ORDER BY sa.earned_date
    `, [userId, year]);

    const booksPerMonth = await db.any(`
      SELECT TO_CHAR(end_date, 'Mon') AS month, EXTRACT(MONTH FROM end_date) AS month_num, COUNT(*)::int AS count
      FROM reading_log
      WHERE user_id=$1 AND school_year=$2 AND status='completed' AND end_date IS NOT NULL
      GROUP BY month, month_num ORDER BY month_num
    `, [userId, year]);

    res.json({
      year,
      total_books: totalBooks,
      total_pages: totalPages,
      total_hours: Math.round(totalMinutes.total / 60),
      books: booksCompleted,
      genre_breakdown: genreBreakdown,
      awards,
      books_per_month: booksPerMonth,
      favorite_genre: genreBreakdown[0]?.genre || 'N/A',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reports/class/:year — class yearly report (teacher only)
router.get('/class/:year', async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { year } = req.params;

    const classData = await db.any(`
      SELECT ce.student_id, u.username,
        COUNT(rl.id) FILTER (WHERE rl.status='completed')::int AS books_completed,
        COALESCE(SUM(bc.page_count) FILTER (WHERE rl.status='completed'), 0)::int AS total_pages
      FROM class_enrollment ce
      JOIN users u ON ce.student_id = u.id
      LEFT JOIN reading_log rl ON rl.user_id = ce.student_id AND rl.school_year=$2
      LEFT JOIN books_catalog bc ON rl.book_id = bc.id
      WHERE ce.teacher_id=$1 AND ce.school_year=$2
      GROUP BY ce.student_id, u.username
      ORDER BY books_completed DESC
    `, [teacherId, year]);

    const totalBooks = classData.reduce((sum, s) => sum + s.books_completed, 0);
    const avgBooks = classData.length > 0 ? Math.round((totalBooks / classData.length) * 10) / 10 : 0;

    res.json({
      year,
      total_students: classData.length,
      total_books: totalBooks,
      avg_books_per_student: avgBooks,
      students: classData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
