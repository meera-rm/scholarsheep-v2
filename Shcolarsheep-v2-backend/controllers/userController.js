const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const Users = require('../queries/users');
const generateTokens = require('../utils/jwt-helpers');
const validateEmail = require('../utils/emailValidation');
const { authenticate } = require('../middleware/authenticate');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GET /api/users — list all users
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await Users.allUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/users/me — get current user from token
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await Users.oneUser(req.user.id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/users/login — username + password login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = await Users.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Username not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/users — register new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, userrole, useravatar } = req.body;

    if (!username || username.length < 4) {
      return res.status(400).json({ message: 'Username must be 4+ characters' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be 6+ characters' });
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Valid email required' });
    }

    // Check if username or email already exists
    const existing = await Users.findByUsername(username);
    if (existing) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    const existingEmail = await Users.findByEmail(email.toLowerCase());
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.createUser({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      user_role: userrole || 'student',
      user_avatar: useravatar || '',
    });

    const tokens = generateTokens(user);
    res.status(201).json(tokens);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/users/google-login — Google OAuth login/register
router.post('/google-login', async (req, res) => {
  try {
    const { credential, role } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential required' });
    }

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists by google_id
    let user = await Users.findByGoogleId(googleId);

    if (!user) {
      // Check if user exists by email
      user = await Users.findByEmail(email);
      if (user) {
        // Link Google account to existing user
        const db = require('../db/dbConfig');
        await db.none('UPDATE users SET google_id=$1 WHERE id=$2', [googleId, user.id]);
      } else {
        // Create new user
        const username = name.replace(/\s+/g, '_').toLowerCase() + '_' + Math.floor(Math.random() * 1000);
        user = await Users.createUser({
          username,
          email,
          password: null,
          user_role: role || 'student',
          user_avatar: picture || '',
          google_id: googleId,
        });
      }
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

module.exports = router;
