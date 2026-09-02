const express = require('express');
const axios = require('axios');
const dictionary = express.Router();
const { allWords, getAWord, createWord, updateWord, deleteWord } = require('../queries/dictionary');
const { authenticate } = require('../middleware/authenticate');

// Proxies the free Dictionary API (which has no CORS headers) so the frontend can call it.
dictionary.get('/lookup/:word', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(req.params.word)}`,
      { timeout: 8000 }
    );
    res.status(200).json(data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    res.status(502).json({ title: 'Lookup failed', message: 'Could not reach dictionary service' });
  }
});

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

dictionary.post('/', authenticate, async (req, res) => {
  try {
    const data = await createWord(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word cannot be added' });
  }
});

dictionary.put('/:dictionaryId', authenticate, async (req, res) => {
  try {
    const data = await updateWord(req.body, req.params.dictionaryId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word cannot be updated' });
  }
});

dictionary.delete('/:id', authenticate, async (req, res) => {
  try {
    const data = await deleteWord(req.params.id);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Word not found' });
  }
});

module.exports = dictionary;
