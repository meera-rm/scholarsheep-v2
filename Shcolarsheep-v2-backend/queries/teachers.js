const db = require('../db/dbConfig');

const allTeachers = () => db.any('SELECT * FROM teachers');
const oneTeacher = (id) => db.one('SELECT * FROM teachers WHERE teacher_id=$1', [id]);

const createTeacher = (t) =>
  db.one(
    'INSERT INTO teachers (teacher_name, school_name, school_district, school_address, zipcode, state_name, class_subject, teaching_grade, teacher_avatar) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
    [t.teacher_name, t.school_name, t.school_district, t.school_address, t.zipcode, t.state_name, t.class_subject, t.teaching_grade, t.teacher_avatar]
  );

const updateTeacher = (t, id) =>
  db.one(
    'UPDATE teachers SET teacher_name=$1, school_name=$2, school_district=$3, school_address=$4, zipcode=$5, state_name=$6, class_subject=$7, teaching_grade=$8, teacher_avatar=$9 WHERE teacher_id=$10 RETURNING *',
    [t.teacher_name, t.school_name, t.school_district, t.school_address, t.zipcode, t.state_name, t.class_subject, t.teaching_grade, t.teacher_avatar, id]
  );

const deleteTeacher = (id) => db.one('DELETE FROM teachers WHERE teacher_id=$1 RETURNING *', [id]);

module.exports = { allTeachers, oneTeacher, createTeacher, updateTeacher, deleteTeacher };
