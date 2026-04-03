const express = require('express');
const router = express.Router();
const Partners = require('../queries/readingPartners');
const { authenticate, authorize } = require('../middleware/authenticate');
const crypto = require('crypto');

const generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

router.use(authenticate);

// GET /api/reading-partners — get my partnerships
router.get('/', async (req, res) => {
  try {
    const role = req.user.role || req.user.user_role;
    let partnerships;
    if (role === 'teacher' || role === 'admin') {
      partnerships = await Partners.getAll();
    } else {
      partnerships = await Partners.getByUser(req.user.id);
    }
    res.json({ partnerships });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reading-partners — create a partnership (teacher pairs or student invites)
router.post('/', async (req, res) => {
  try {
    const { student1_name, student2_name, student2_id, book_title } = req.body;

    const partnership = await Partners.createPartnership({
      student1_id: req.user.id,
      student1_name: student1_name || req.user.username,
      student2_id: student2_id || null,
      student2_name: student2_name || null,
      book_title: book_title || null,
      invite_code: generateCode(),
      assigned_by: req.user.username,
      status: student2_id ? 'active' : 'pending',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(201).json({ partnership });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reading-partners/accept — accept invite code
router.post('/accept', async (req, res) => {
  try {
    const { invite_code } = req.body;
    if (!invite_code) return res.status(400).json({ message: 'Invite code required' });

    const pair = await Partners.getByInviteCode(invite_code.toUpperCase());
    if (!pair) return res.status(404).json({ message: 'Invalid or expired invite code' });

    if (pair.expires_at && new Date(pair.expires_at) < new Date()) {
      await Partners.expireInvite(pair.id);
      return res.status(410).json({ message: 'This invite code has expired. Ask your friend for a new one.' });
    }

    if (pair.student1_id === req.user.id) {
      return res.status(400).json({ message: 'You cannot partner with yourself' });
    }

    const partnership = await Partners.acceptInvite(pair.id, req.user.id, req.user.username);
    res.json({ partnership });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/reading-partners/:id — remove a partnership
router.delete('/:id', async (req, res) => {
  try {
    await Partners.remove(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reading-partners/:id/chat — get chat messages
router.get('/:id/chat', async (req, res) => {
  try {
    const messages = await Partners.getChat(req.params.id);
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reading-partners/:id/chat — send a message
router.post('/:id/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });

    const msg = await Partners.sendMessage({
      partnership_id: req.params.id,
      user_id: req.user.id,
      username: req.user.username,
      message,
    });
    res.status(201).json({ message: msg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
