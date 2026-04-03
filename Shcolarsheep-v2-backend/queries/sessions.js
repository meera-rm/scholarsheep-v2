const db = require('../db/dbConfig');

const getByUser = (userId) =>
  db.any('SELECT * FROM reading_sessions WHERE user_id=$1 ORDER BY session_date DESC', [userId]);

const getByBook = (userId, bookId) =>
  db.any('SELECT * FROM reading_sessions WHERE user_id=$1 AND book_id=$2 ORDER BY session_date DESC', [userId, bookId]);

const getByDate = (date) =>
  db.any(
    `SELECT rs.*, u.username, bc.title AS book_title
     FROM reading_sessions rs
     JOIN users u ON rs.user_id = u.id
     JOIN books_catalog bc ON rs.book_id = bc.id
     WHERE rs.session_date = $1
     ORDER BY rs.created_at DESC`,
    [date]
  );

const create = ({ user_id, book_id, reading_log_id, session_date, pages_read, minutes_spent, notes }) =>
  db.one(
    `INSERT INTO reading_sessions (user_id, book_id, reading_log_id, session_date, pages_read, minutes_spent, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [user_id, book_id, reading_log_id, session_date || new Date().toISOString().split('T')[0], pages_read || 0, minutes_spent || 0, notes || '']
  );

const getStreak = (userId) =>
  db.oneOrNone(`
    WITH dates AS (
      SELECT DISTINCT session_date FROM reading_sessions WHERE user_id=$1 ORDER BY session_date DESC
    ),
    numbered AS (
      SELECT session_date,
        session_date - (ROW_NUMBER() OVER (ORDER BY session_date DESC))::int AS grp
      FROM dates
    ),
    current_streak AS (
      SELECT COUNT(*)::int AS streak
      FROM numbered
      WHERE grp = (SELECT grp FROM numbered WHERE session_date >= CURRENT_DATE - 1 LIMIT 1)
    ),
    longest_streak AS (
      SELECT MAX(cnt)::int AS longest FROM (
        SELECT grp, COUNT(*)::int AS cnt FROM numbered GROUP BY grp
      ) sub
    )
    SELECT
      COALESCE((SELECT streak FROM current_streak), 0) AS current_streak,
      COALESCE((SELECT longest FROM longest_streak), 0) AS longest_streak
  `, [userId]);

const getDailyStats = (userId) =>
  db.any(`
    SELECT session_date, SUM(pages_read)::int AS total_pages, SUM(minutes_spent)::int AS total_minutes, COUNT(*)::int AS session_count
    FROM reading_sessions WHERE user_id=$1
    GROUP BY session_date ORDER BY session_date DESC LIMIT 365
  `, [userId]);

module.exports = { getByUser, getByBook, getByDate, create, getStreak, getDailyStats };
