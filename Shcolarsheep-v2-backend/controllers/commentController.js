const express = require('express');
const comments = express.Router({ mergeParams: true });
const { getAllComments, getComment, newComment, updateComment, deleteComment } = require('../queries/comments');

comments.get('/', async (req, res) => {
  try {
    const logId = req.params.logId || null;
    const data = await getAllComments(logId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No comments found' });
  }
});

// GET /api/comments/logs/:logId — get comment by log ID
comments.get('/logs/:logId', async (req, res) => {
  try {
    const db = require('../db/dbConfig');
    const data = await db.oneOrNone('SELECT * FROM comments WHERE logs_id=$1', [req.params.logId]);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(200).json({ success: true, payload: null });
  }
});

comments.get('/:commentId', async (req, res) => {
  try {
    const data = await getComment(req.params.commentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Comment not found' });
  }
});

comments.post('/new', async (req, res) => {
  try {
    const data = await newComment(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Comment cannot be added' });
  }
});

comments.put('/:commentId', async (req, res) => {
  try {
    const data = await updateComment(req.body, req.params.commentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Comment cannot be updated' });
  }
});

comments.delete('/:commentId', async (req, res) => {
  try {
    const data = await deleteComment(req.params.commentId);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Comment not found' });
  }
});

module.exports = comments;
