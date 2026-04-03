const db = require('../db/dbConfig');

const allWords = () => db.any('SELECT * FROM personal_dictionary ORDER BY created_at DESC');

const getAWord = (word) => db.oneOrNone('SELECT * FROM personal_dictionary WHERE word=$1', [word]);

const createWord = (w) =>
  db.one(
    'INSERT INTO personal_dictionary (word, grade, partsofSpeech, phonetic, definitions, example, synonyms, antonyms, users_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
    [w.word, w.grade, w.partsofSpeech, w.phonetic, w.definitions, w.example, w.synonyms || [], w.antonyms || [], w.users_id]
  );

const updateWord = (w, id) =>
  db.one(
    'UPDATE personal_dictionary SET word=$1, grade=$2, partsofSpeech=$3, phonetic=$4, definitions=$5, example=$6, synonyms=$7, antonyms=$8, updated_at=NOW() WHERE dictionary_id=$9 RETURNING *',
    [w.word, w.grade, w.partsofSpeech, w.phonetic, w.definitions, w.example, w.synonyms || [], w.antonyms || [], id]
  );

const deleteWord = (id) => db.one('DELETE FROM personal_dictionary WHERE dictionary_id=$1 RETURNING *', [id]);

module.exports = { allWords, getAWord, createWord, updateWord, deleteWord };
