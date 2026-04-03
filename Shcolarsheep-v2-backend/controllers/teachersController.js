const express = require('express');
const teachers = express.Router();
const { allTeachers, oneTeacher, createTeacher, updateTeacher, deleteTeacher } = require('../queries/teachers');

teachers.get('/', async (req, res) => {
  try {
    const data = await allTeachers();
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No teachers found' });
  }
});

teachers.get('/:id', async (req, res) => {
  try {
    const data = await oneTeacher(req.params.id);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Teacher not found' });
  }
});

teachers.post('/new', async (req, res) => {
  try {
    const data = await createTeacher(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Teacher cannot be added' });
  }
});

teachers.put('/:teacherId', async (req, res) => {
  try {
    const data = await updateTeacher(req.body, req.params.teacherId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Teacher info cannot be updated' });
  }
});

teachers.delete('/:id', async (req, res) => {
  try {
    const data = await deleteTeacher(req.params.id);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Teacher not found' });
  }
});

module.exports = teachers;
