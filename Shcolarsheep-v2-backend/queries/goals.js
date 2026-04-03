const db = require('../db/dbConfig');

const getByStudent = (studentId, schoolYear) =>
  db.any(
    `SELECT rg.*, u.username AS teacher_name
     FROM reading_goals rg
     LEFT JOIN users u ON rg.teacher_id = u.id
     WHERE (rg.student_id=$1 OR rg.student_id IS NULL)
       AND ($2::text IS NULL OR rg.school_year=$2)
     ORDER BY rg.created_at DESC`,
    [studentId, schoolYear || null]
  );

const getByTeacher = (teacherId, schoolYear) =>
  db.any(
    `SELECT rg.*, u.username AS student_name
     FROM reading_goals rg
     LEFT JOIN users u ON rg.student_id = u.id
     WHERE rg.teacher_id=$1 AND ($2::text IS NULL OR rg.school_year=$2)
     ORDER BY rg.created_at DESC`,
    [teacherId, schoolYear || null]
  );

const create = ({ teacher_id, student_id, goal_type, goal_value, school_year }) =>
  db.one(
    `INSERT INTO reading_goals (teacher_id, student_id, goal_type, goal_value, school_year)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [teacher_id, student_id || null, goal_type, goal_value, school_year]
  );

const remove = (id) =>
  db.one('DELETE FROM reading_goals WHERE id=$1 RETURNING *', [id]);

module.exports = { getByStudent, getByTeacher, create, remove };
