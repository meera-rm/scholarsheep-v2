const db = require('../db/dbConfig');

const allUsers = () => db.any('SELECT id, username, email, user_role, user_avatar, created_at FROM users');

const oneUser = (id) => db.one('SELECT id, username, email, user_role, user_avatar, created_at FROM users WHERE id=$1', [id]);

const findByUsername = (username) => db.oneOrNone('SELECT * FROM users WHERE username=$1', [username]);

const findByEmail = (email) => db.oneOrNone('SELECT * FROM users WHERE email=$1', [email]);

const findByGoogleId = (googleId) => db.oneOrNone('SELECT * FROM users WHERE google_id=$1', [googleId]);

const createUser = ({ username, email, password, user_role, user_avatar, google_id }) =>
  db.one(
    'INSERT INTO users (username, email, password, user_role, user_avatar, google_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, user_role, user_avatar',
    [username, email, password, user_role || 'student', user_avatar || '', google_id || null]
  );

const updateUser = (id, { username, email, user_role, user_avatar }) =>
  db.one(
    'UPDATE users SET username=COALESCE($2, username), email=COALESCE($3, email), user_role=COALESCE($4, user_role), user_avatar=COALESCE($5, user_avatar) WHERE id=$1 RETURNING id, username, email, user_role, user_avatar',
    [id, username, email, user_role, user_avatar]
  );

const deleteUser = (id) => db.one('DELETE FROM users WHERE id=$1 RETURNING *', [id]);

module.exports = { allUsers, oneUser, findByUsername, findByEmail, findByGoogleId, createUser, updateUser, deleteUser };
