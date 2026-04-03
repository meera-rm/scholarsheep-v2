const db = require('../db/dbConfig');

const getAllStudents = (teacherId) => {
  if (teacherId) {
    return db.any('SELECT * FROM students WHERE teachers_id=$1', [teacherId]);
  }
  return db.any('SELECT * FROM students');
};

const getAStudent = (id) => db.one('SELECT * FROM students WHERE student_id=$1', [id]);

const createStudent = (s) =>
  db.one(
    'INSERT INTO students (student_name, parent_email, academic_year, grade, student_image, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [s.student_name, s.parent_email, s.academic_year, s.grade, s.student_image, s.user_id || null]
  );

const updateStudent = (s, id) =>
  db.one(
    'UPDATE students SET student_name=$1, parent_email=$2, academic_year=$3, grade=$4, student_image=$5 WHERE student_id=$6 RETURNING *',
    [s.student_name, s.parent_email, s.academic_year, s.grade, s.student_image, id]
  );

const deleteStudent = (id) => db.one('DELETE FROM students WHERE student_id=$1 RETURNING *', [id]);

module.exports = { getAllStudents, getAStudent, createStudent, updateStudent, deleteStudent };
