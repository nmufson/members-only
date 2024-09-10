const pool = require('./pool');
const catchQuery = require('../utils/catchQuery');

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1;`;
  console.log('yo');

  return catchQuery(async () => {
    const result = await pool.query(query, [email]);
    console.log('yoo');
    return result.rows[0]; // Returns the first matching user
  });
}

async function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = $1;`;

  return catchQuery(async () => {
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Returns the first matching user
  });
}

async function createUser(firstName, lastName, email, password) {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [firstName, lastName, email, password];

  return catchQuery(async () => {
    await pool.query(query, values);
    console.log('User created successfully');
  });
}

async function makeMember(userId) {
  const query = `UPDATE users
    SET membership_status = true
    WHERE id = $1;`;

  return catchQuery(async () => {
    const result = await pool.query(query, [userId]);
    return result.rowCount; // Number of rows affected
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  makeMember,
};
