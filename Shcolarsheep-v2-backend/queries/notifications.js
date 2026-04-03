const db = require('../db/dbConfig');

const getByTeacher = (teacherId, limit = 50) =>
  db.any(
    'SELECT * FROM teacher_notifications WHERE teacher_id=$1 ORDER BY created_at DESC LIMIT $2',
    [teacherId, limit]
  );

const getUnreadCount = (teacherId) =>
  db.one(
    'SELECT COUNT(*)::int AS count FROM teacher_notifications WHERE teacher_id=$1 AND is_read=false',
    [teacherId]
  );

const create = ({ teacher_id, type, title, message, student_id, student_name, metadata }) =>
  db.one(
    `INSERT INTO teacher_notifications (teacher_id, type, title, message, student_id, student_name, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [teacher_id, type, title, message, student_id, student_name, JSON.stringify(metadata || {})]
  );

const markAsRead = (id) =>
  db.none('UPDATE teacher_notifications SET is_read=true WHERE id=$1', [id]);

const markAllAsRead = (teacherId) =>
  db.none('UPDATE teacher_notifications SET is_read=true WHERE teacher_id=$1', [teacherId]);

// Notify all teachers of a class about a student's activity
const notifyTeachersOfStudent = async (studentId, notification) => {
  const teachers = await db.any(
    'SELECT DISTINCT teacher_id FROM class_enrollment WHERE student_id=$1',
    [studentId]
  );
  for (const { teacher_id } of teachers) {
    await create({ ...notification, teacher_id });
  }
};

module.exports = { getByTeacher, getUnreadCount, create, markAsRead, markAllAsRead, notifyTeachersOfStudent };
