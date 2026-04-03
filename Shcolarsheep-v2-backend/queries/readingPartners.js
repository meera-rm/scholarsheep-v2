const db = require('../db/dbConfig');

const createPartnership = ({ student1_id, student1_name, student2_id, student2_name, book_title, invite_code, assigned_by, status, expires_at }) =>
  db.one(
    `INSERT INTO reading_partners (student1_id, student1_name, student2_id, student2_name, book_title, invite_code, assigned_by, status, expires_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [student1_id, student1_name, student2_id, student2_name, book_title, invite_code, assigned_by, status || 'pending', expires_at]
  );

const getByInviteCode = (inviteCode) =>
  db.oneOrNone("SELECT * FROM reading_partners WHERE invite_code=$1 AND status='pending'", [inviteCode]);

const acceptInvite = (id, student2_id, student2_name) =>
  db.one(
    "UPDATE reading_partners SET student2_id=$2, student2_name=$3, status='active' WHERE id=$1 RETURNING *",
    [id, student2_id, student2_name]
  );

const expireInvite = (id) =>
  db.none("UPDATE reading_partners SET status='expired' WHERE id=$1", [id]);

const getByUser = (userId) =>
  db.any(
    'SELECT * FROM reading_partners WHERE (student1_id=$1 OR student2_id=$1) ORDER BY created_at DESC',
    [userId]
  );

const getAll = () =>
  db.any('SELECT * FROM reading_partners ORDER BY created_at DESC');

const remove = (id) =>
  db.oneOrNone('DELETE FROM reading_partners WHERE id=$1 RETURNING *', [id]);

// ─── Chat ───

const getChat = (partnershipId) =>
  db.any('SELECT * FROM partner_chat WHERE partnership_id=$1 ORDER BY created_at ASC', [partnershipId]);

const sendMessage = ({ partnership_id, user_id, username, message }) =>
  db.one(
    'INSERT INTO partner_chat (partnership_id, user_id, username, message) VALUES ($1,$2,$3,$4) RETURNING *',
    [partnership_id, user_id, username, message]
  );

const deleteMessage = (id) =>
  db.oneOrNone('DELETE FROM partner_chat WHERE id=$1 RETURNING *', [id]);

module.exports = {
  createPartnership, getByInviteCode, acceptInvite, expireInvite,
  getByUser, getAll, remove,
  getChat, sendMessage, deleteMessage,
};
