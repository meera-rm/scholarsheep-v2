const pgp = require('pg-promise')();
require('dotenv').config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

const isLocalDb = DATABASE_URL && /^(localhost|127\.0\.0\.1)$/.test(new URL(DATABASE_URL).hostname);

const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30,
      ...(isLocalDb ? {} : { ssl: { rejectUnauthorized: false } }),
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };

const dbHost = DATABASE_URL ? new URL(DATABASE_URL).hostname : PG_HOST;
console.log(`[db] connecting to: ${dbHost}`);

const db = pgp(cn);

module.exports = db;
