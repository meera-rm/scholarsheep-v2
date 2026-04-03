const db = require('../db/dbConfig');

const getAllSubscriptions = () => db.any('SELECT * FROM email_subscriptions');

const getASubscription = (email) => db.oneOrNone('SELECT * FROM email_subscriptions WHERE email=$1', [email]);

const createSubscription = (s) =>
  db.one(
    'INSERT INTO email_subscriptions (firstname, email) VALUES ($1,$2) RETURNING *',
    [s.firstname || s.fullName, s.email]
  );

const updateSubscription = (s, email) =>
  db.one(
    'UPDATE email_subscriptions SET firstname=$1, email=$2 WHERE email=$3 RETURNING *',
    [s.firstname || s.fullName, s.newEmail || s.email, email]
  );

const deleteSubscription = (email) =>
  db.one('DELETE FROM email_subscriptions WHERE email=$1 RETURNING *', [email]);

module.exports = { getAllSubscriptions, getASubscription, createSubscription, updateSubscription, deleteSubscription };
