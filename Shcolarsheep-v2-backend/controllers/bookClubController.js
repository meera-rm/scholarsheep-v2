const express = require('express');
const router = express.Router();
const Clubs = require('../queries/bookClubs');
const { authenticate } = require('../middleware/authenticate');
const crypto = require('crypto');

const generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

router.use(authenticate);

// GET /api/book-clubs — list user's clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Clubs.getClubsByUser(req.user.id);
    res.json({ clubs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/book-clubs/all — list all clubs (teacher/admin)
router.get('/all', async (req, res) => {
  try {
    const clubs = await Clubs.getAllClubs();
    res.json({ clubs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/book-clubs/:id — club detail with members + posts
router.get('/:id', async (req, res) => {
  try {
    const club = await Clubs.getClubById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    const members = await Clubs.getMembers(req.params.id);
    const posts = await Clubs.getPosts(req.params.id);
    res.json({ club, members, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/book-clubs — create a club
router.post('/', async (req, res) => {
  try {
    const { name, description, book_title, book_cover_url } = req.body;
    if (!name) return res.status(400).json({ message: 'Club name required' });

    const club = await Clubs.createClub({
      name, description, book_title, book_cover_url,
      invite_code: generateCode(),
      created_by: req.user.id,
    });

    // Add creator as leader
    await Clubs.addMember(club.id, req.user.id, req.user.username, 'leader');

    res.status(201).json({ club });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/book-clubs/join — join by invite code
router.post('/join', async (req, res) => {
  try {
    const { invite_code } = req.body;
    if (!invite_code) return res.status(400).json({ message: 'Invite code required' });

    const club = await Clubs.getClubByInvite(invite_code.toUpperCase());
    if (!club) return res.status(404).json({ message: 'Invalid invite code' });

    const member = await Clubs.addMember(club.id, req.user.id, req.user.username);
    if (!member) return res.status(409).json({ message: 'Already a member' });

    res.json({ club, member });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/book-clubs/:id/leave — leave a club
router.delete('/:id/leave', async (req, res) => {
  try {
    await Clubs.removeMember(req.params.id, req.user.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/book-clubs/:id/posts — get posts
router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Clubs.getPosts(req.params.id);
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/book-clubs/:id/posts — add a post
router.post('/:id/posts', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const post = await Clubs.addPost({
      club_id: req.params.id,
      user_id: req.user.id,
      username: req.user.username,
      content,
    });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/book-clubs/:id/posts/:postId — delete a post
router.delete('/:id/posts/:postId', async (req, res) => {
  try {
    await Clubs.deletePost(req.params.postId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
