const express = require('express');
const notes = express.Router();
const { getAllNotes, getANote, createNote, updateNote, deleteNote } = require('../queries/notes');

notes.get('/', async (req, res) => {
  try {
    const data = await getAllNotes();
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No notes found' });
  }
});

notes.get('/:noteId', async (req, res) => {
  try {
    const data = await getANote(req.params.noteId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Note not found' });
  }
});

notes.post('/new', async (req, res) => {
  try {
    const data = await createNote(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Note cannot be added' });
  }
});

notes.put('/:noteId', async (req, res) => {
  try {
    const data = await updateNote(req.body, req.params.noteId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Note cannot be updated' });
  }
});

notes.delete('/:noteId', async (req, res) => {
  try {
    const data = await deleteNote(req.params.noteId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Note not found' });
  }
});

module.exports = notes;
