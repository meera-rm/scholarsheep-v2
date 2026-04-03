const db = require('../db/dbConfig');

// ─── Clubs ───

const createClub = ({ name, description, book_title, book_cover_url, invite_code, created_by }) =>
  db.one(
    `INSERT INTO book_clubs (name, description, book_title, book_cover_url, invite_code, created_by)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, description, book_title, book_cover_url, invite_code, created_by]
  );

const getAllClubs = () =>
  db.any(`SELECT bc.*,
    (SELECT COUNT(*) FROM book_club_members WHERE club_id=bc.id)::int AS member_count
    FROM book_clubs bc ORDER BY bc.created_at DESC`);

const getClubById = (id) =>
  db.oneOrNone('SELECT * FROM book_clubs WHERE id=$1', [id]);

const getClubByInvite = (inviteCode) =>
  db.oneOrNone('SELECT * FROM book_clubs WHERE invite_code=$1', [inviteCode]);

const getClubsByUser = (userId) =>
  db.any(
    `SELECT bc.*, bcm.role,
      (SELECT COUNT(*) FROM book_club_members WHERE club_id=bc.id)::int AS member_count
     FROM book_clubs bc
     JOIN book_club_members bcm ON bc.id = bcm.club_id
     WHERE bcm.user_id=$1 ORDER BY bc.created_at DESC`,
    [userId]
  );

// ─── Members ───

const addMember = (clubId, userId, username, role = 'member') =>
  db.one(
    `INSERT INTO book_club_members (club_id, user_id, username, role)
     VALUES ($1,$2,$3,$4) ON CONFLICT (club_id, user_id) DO NOTHING RETURNING *`,
    [clubId, userId, username, role]
  );

const getMembers = (clubId) =>
  db.any('SELECT * FROM book_club_members WHERE club_id=$1 ORDER BY joined_at', [clubId]);

const removeMember = (clubId, userId) =>
  db.oneOrNone('DELETE FROM book_club_members WHERE club_id=$1 AND user_id=$2 RETURNING *', [clubId, userId]);

// ─── Posts ───

const getPosts = (clubId) =>
  db.any('SELECT * FROM book_club_posts WHERE club_id=$1 ORDER BY created_at DESC', [clubId]);

const addPost = ({ club_id, user_id, username, content }) =>
  db.one(
    'INSERT INTO book_club_posts (club_id, user_id, username, content) VALUES ($1,$2,$3,$4) RETURNING *',
    [club_id, user_id, username, content]
  );

const deletePost = (postId) =>
  db.oneOrNone('DELETE FROM book_club_posts WHERE id=$1 RETURNING *', [postId]);

module.exports = {
  createClub, getAllClubs, getClubById, getClubByInvite, getClubsByUser,
  addMember, getMembers, removeMember,
  getPosts, addPost, deletePost,
};
