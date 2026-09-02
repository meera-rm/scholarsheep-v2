const db = require('../db/dbConfig');

const getBySession = (sessionId) =>
  db.any(
    `SELECT sc.*, u.username AS teacher_name
     FROM session_comments sc
     JOIN users u ON sc.teacher_id = u.id
     WHERE sc.session_id=$1
     ORDER BY sc.created_at`,
    [sessionId]
  );

const create = ({ session_id, teacher_id, comment }) =>
  db.one(
    'INSERT INTO session_comments (session_id, teacher_id, comment) VALUES ($1, $2, $3) RETURNING *',
    [session_id, teacher_id, comment]
  );

module.exports = { getBySession, create };
