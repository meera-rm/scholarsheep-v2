const db = require('../db/dbConfig');

const getAllNotes = () => db.any('SELECT * FROM notes ORDER BY created_at DESC');

const getANote = (id) => db.one('SELECT * FROM notes WHERE note_id=$1', [id]);

const createNote = (n) =>
  db.one(
    'INSERT INTO notes (note_title, textnotes, users_id) VALUES ($1,$2,$3) RETURNING *',
    [n.note_title, n.textnotes, n.users_id]
  );

const updateNote = (n, id) =>
  db.one(
    'UPDATE notes SET note_title=$1, textnotes=$2, updated_at=NOW() WHERE note_id=$3 RETURNING *',
    [n.note_title, n.textnotes, id]
  );

const deleteNote = (id) => db.one('DELETE FROM notes WHERE note_id=$1 RETURNING *', [id]);

module.exports = { getAllNotes, getANote, createNote, updateNote, deleteNote };
