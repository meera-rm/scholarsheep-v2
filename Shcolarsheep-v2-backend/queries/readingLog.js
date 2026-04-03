const db = require('../db/dbConfig');

const getByUser = (userId) =>
  db.any(
    `SELECT rl.*, bc.title, bc.author, bc.isbn, bc.cover_url, bc.page_count, bc.genre
     FROM reading_log rl
     JOIN books_catalog bc ON rl.book_id = bc.id
     WHERE rl.user_id = $1
     ORDER BY rl.updated_at DESC`,
    [userId]
  );

const getByUserAndStatus = (userId, status) =>
  db.any(
    `SELECT rl.*, bc.title, bc.author, bc.isbn, bc.cover_url, bc.page_count, bc.genre
     FROM reading_log rl
     JOIN books_catalog bc ON rl.book_id = bc.id
     WHERE rl.user_id = $1 AND rl.status = $2
     ORDER BY rl.updated_at DESC`,
    [userId, status]
  );

const getOne = (id) =>
  db.oneOrNone(
    `SELECT rl.*, bc.title, bc.author, bc.isbn, bc.cover_url, bc.page_count, bc.genre
     FROM reading_log rl
     JOIN books_catalog bc ON rl.book_id = bc.id
     WHERE rl.id = $1`,
    [id]
  );

const create = ({ user_id, book_id, status, school_year }) =>
  db.one(
    `INSERT INTO reading_log (user_id, book_id, status, start_date, school_year)
     VALUES ($1, $2, $3, CASE WHEN $3='reading' THEN CURRENT_DATE ELSE NULL END, $4)
     RETURNING *`,
    [user_id, book_id, status || 'want_to_read', school_year]
  );

const update = (id, fields) => {
  const sets = [];
  const values = [id];
  let idx = 2;

  const allowed = ['status', 'current_page', 'rating', 'review', 'start_date', 'end_date'];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key}=$${idx}`);
      values.push(fields[key]);
      idx++;
    }
  }
  sets.push('updated_at=NOW()');

  // Auto-set dates
  if (fields.status === 'reading') {
    sets.push(`start_date=COALESCE(start_date, CURRENT_DATE)`);
  }
  if (fields.status === 'completed') {
    sets.push(`end_date=COALESCE(end_date, CURRENT_DATE)`);
  }

  return db.one(
    `UPDATE reading_log SET ${sets.join(', ')} WHERE id=$1 RETURNING *`,
    values
  );
};

const remove = (id) =>
  db.one('DELETE FROM reading_log WHERE id=$1 RETURNING *', [id]);

const getStats = (userId) =>
  db.one(`
    SELECT
      COUNT(*) FILTER (WHERE status='completed')::int AS total_books,
      COUNT(*) FILTER (WHERE status='reading')::int AS currently_reading,
      COUNT(*) FILTER (WHERE status='want_to_read')::int AS want_to_read,
      COALESCE(SUM(bc.page_count) FILTER (WHERE rl.status='completed'), 0)::int AS total_pages,
      COALESCE(AVG(rl.rating) FILTER (WHERE rl.rating IS NOT NULL), 0) AS avg_rating
    FROM reading_log rl
    JOIN books_catalog bc ON rl.book_id = bc.id
    WHERE rl.user_id = $1
  `, [userId]);

module.exports = { getByUser, getByUserAndStatus, getOne, create, update, remove, getStats };
