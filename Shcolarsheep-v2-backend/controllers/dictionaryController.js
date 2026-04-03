const express = require('express');
const dictionary = express.Router();
const { allWords, getAWord, createWord, updateWord, deleteWord } = require('../queries/dictionary');

dictionary.get('/', async (req, res) => {
  try {
    const data = await allWords();
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No words found' });
  }
});

dictionary.get('/:word', async (req, res) => {
  try {
    const data = await getAWord(req.params.word);
    if (!data) return res.status(404).json({ success: false, message: 'Word not found' });
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word not found' });
  }
});

dictionary.post('/', async (req, res) => {
  try {
    const data = await createWord(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word cannot be added' });
  }
});

dictionary.put('/:dictionaryId', async (req, res) => {
  try {
    const data = await updateWord(req.body, req.params.dictionaryId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word cannot be updated' });
  }
});

dictionary.delete('/:id', async (req, res) => {
  try {
    const data = await deleteWord(req.params.id);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word not found' });
  }
});

module.exports = dictionary;
