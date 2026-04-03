const db = require('../db/dbConfig');

const getStudentsByTeacher = (teacherId, schoolYear) =>
  db.any(
    `SELECT ce.*, u.username, u.email, u.user_avatar
     FROM class_enrollment ce
     JOIN users u ON ce.student_id = u.id
     WHERE ce.teacher_id=$1 AND ($2::text IS NULL OR ce.school_year=$2)
     ORDER BY u.username`,
    [teacherId, schoolYear || null]
  );

const enroll = ({ student_id, teacher_id, class_name, school_year }) =>
  db.one(
    `INSERT INTO class_enrollment (student_id, teacher_id, class_name, school_year)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (student_id, teacher_id, school_year) DO UPDATE SET class_name=EXCLUDED.class_name
     RETURNING *`,
    [student_id, teacher_id, class_name, school_year]
  );

const unenroll = (studentId, teacherId, schoolYear) =>
  db.oneOrNone(
    'DELETE FROM class_enrollment WHERE student_id=$1 AND teacher_id=$2 AND school_year=$3 RETURNING *',
    [studentId, teacherId, schoolYear]
  );

const getTeachersOfStudent = (studentId) =>
  db.any(
    `SELECT ce.teacher_id, u.username AS teacher_name, ce.class_name, ce.school_year
     FROM class_enrollment ce
     JOIN users u ON ce.teacher_id = u.id
     WHERE ce.student_id=$1`,
    [studentId]
  );

module.exports = { getStudentsByTeacher, enroll, unenroll, getTeachersOfStudent };
