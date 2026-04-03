const db = require('../db/dbConfig');

const getAll = () => db.any('SELECT * FROM awards ORDER BY category, criteria_value');

const getEarnedByUser = (userId) =>
  db.any(
    `SELECT sa.*, a.name, a.description, a.category, a.sticker_emoji, a.tier, a.criteria_type, a.criteria_value
     FROM student_awards sa
     JOIN awards a ON sa.award_id = a.id
     WHERE sa.user_id = $1
     ORDER BY sa.earned_date DESC`,
    [userId]
  );

const assignAward = (userId, awardId, schoolYear) =>
  db.one(
    `INSERT INTO student_awards (user_id, award_id, earned_date, school_year, awarded_by)
     VALUES ($1, $2, CURRENT_DATE, $3, 'teacher')
     ON CONFLICT DO NOTHING RETURNING *`,
    [userId, awardId, schoolYear]
  );

const createCustomAward = ({ name, description, category, sticker_emoji, tier, created_by_teacher_id }) =>
  db.one(
    `INSERT INTO awards (name, description, category, criteria_type, criteria_value, sticker_emoji, tier, is_custom, created_by_teacher_id)
     VALUES ($1, $2, $3, 'manual', 0, $4, $5, true, $6) RETURNING *`,
    [name, description, category || 'custom', sticker_emoji, tier || 'gold', created_by_teacher_id]
  );

module.exports = { getAll, getEarnedByUser, assignAward, createCustomAward };
