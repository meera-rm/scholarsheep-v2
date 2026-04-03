const db = require('../db/dbConfig');

const getLeaderboard = (schoolYear, period, sortBy) => {
  let dateFilter = '';
  if (period === 'weekly') {
    dateFilter = "AND rl.end_date >= CURRENT_DATE - interval '7 days'";
  } else if (period === 'monthly') {
    dateFilter = "AND EXTRACT(MONTH FROM rl.end_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM rl.end_date) = EXTRACT(YEAR FROM CURRENT_DATE)";
  }

  let orderBy = 'books_completed DESC';
  if (sortBy === 'pages') orderBy = 'total_pages DESC';
  if (sortBy === 'streak') orderBy = 'books_completed DESC'; // streak computed separately

  return db.any(`
    SELECT
      u.id AS user_id,
      u.username,
      u.user_avatar AS avatar,
      COUNT(rl.id)::int AS books_completed,
      COALESCE(SUM(bc.page_count), 0)::int AS total_pages
    FROM users u
    LEFT JOIN reading_log rl ON rl.user_id = u.id AND rl.status = 'completed' ${dateFilter}
    LEFT JOIN books_catalog bc ON rl.book_id = bc.id
    WHERE u.user_role = 'student'
    GROUP BY u.id, u.username, u.user_avatar
    HAVING COUNT(rl.id) > 0
    ORDER BY ${orderBy}
    LIMIT 50
  `);
};

const getClassLeaderboard = (teacherId, schoolYear, period, sortBy) => {
  let dateFilter = '';
  if (period === 'weekly') {
    dateFilter = "AND rl.end_date >= CURRENT_DATE - interval '7 days'";
  } else if (period === 'monthly') {
    dateFilter = "AND EXTRACT(MONTH FROM rl.end_date) = EXTRACT(MONTH FROM CURRENT_DATE)";
  }

  let orderBy = 'books_completed DESC';
  if (sortBy === 'pages') orderBy = 'total_pages DESC';

  return db.any(`
    SELECT
      u.id AS user_id,
      u.username,
      u.user_avatar AS avatar,
      COUNT(rl.id)::int AS books_completed,
      COALESCE(SUM(bc.page_count), 0)::int AS total_pages
    FROM class_enrollment ce
    JOIN users u ON ce.student_id = u.id
    LEFT JOIN reading_log rl ON rl.user_id = u.id AND rl.status = 'completed' ${dateFilter}
    LEFT JOIN books_catalog bc ON rl.book_id = bc.id
    WHERE ce.teacher_id = $1
    GROUP BY u.id, u.username, u.user_avatar
    ORDER BY ${orderBy}
    LIMIT 50
  `, [teacherId]);
};

module.exports = { getLeaderboard, getClassLeaderboard };
