const express = require('express');
const students = express.Router({ mergeParams: true });
const { getAllStudents, getAStudent, createStudent, updateStudent, deleteStudent } = require('../queries/students');

students.get('/', async (req, res) => {
  try {
    const teacherId = req.params.teacherId || null;
    const data = await getAllStudents(teacherId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No students found' });
  }
});

students.get('/:studentId', async (req, res) => {
  try {
    const data = await getAStudent(req.params.studentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Student not found' });
  }
});

students.post('/new', async (req, res) => {
  try {
    const data = await createStudent(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Student cannot be added' });
  }
});

students.put('/:studentId', async (req, res) => {
  try {
    const data = await updateStudent(req.body, req.params.studentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Student info cannot be updated' });
  }
});

// GET /api/students/:studentId/logs — get reading logs for a student
students.get('/:studentId/logs', async (req, res) => {
  try {
    const db = require('../db/dbConfig');
    const logs = await db.any(
      'SELECT * FROM logs WHERE students_id=$1 ORDER BY date_read DESC',
      [req.params.studentId]
    );
    res.status(200).json({ success: true, payload: logs });
  } catch (error) {
    res.status(200).json({ success: true, payload: [] });
  }
});

students.delete('/:studentId', async (req, res) => {
  try {
    const data = await deleteStudent(req.params.studentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Student not found' });
  }
});

module.exports = students;
