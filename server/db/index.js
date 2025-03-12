const { Pool } = require('pg');
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* const { DB } = require('../config')

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT
}); */

module.exports = {
  query: (text, params) => pool.query(text, params)
};