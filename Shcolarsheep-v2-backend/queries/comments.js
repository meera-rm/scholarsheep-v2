const db = require('../db/dbConfig');

const getAllComments = (logId) => {
  if (logId) return db.any('SELECT * FROM comments WHERE logs_id=$1', [logId]);
  return db.any('SELECT * FROM comments');
};

const getComment = (id) => db.one('SELECT * FROM comments WHERE comment_id=$1', [id]);

const newComment = (c) =>
  db.one(
    'INSERT INTO comments (teacher_comments, logs_id, teachers_id) VALUES ($1,$2,$3) RETURNING *',
    [c.teacher_comments, c.logs_id, c.teachers_id]
  );

const updateComment = (c, id) =>
  db.one(
    'UPDATE comments SET teacher_comments=$1, logs_id=$2, teachers_id=$3 WHERE comment_id=$4 RETURNING *',
    [c.teacher_comments, c.logs_id, c.teachers_id, id]
  );

const deleteComment = (id) => db.one('DELETE FROM comments WHERE comment_id=$1 RETURNING *', [id]);

module.exports = { getAllComments, getComment, newComment, updateComment, deleteComment };
