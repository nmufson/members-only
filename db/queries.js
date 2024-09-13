const pool = require('./pool');
const catchQuery = require('../utils/catchQuery');

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1;`;

  return catchQuery(async () => {
    const result = await pool.query(query, [email]);
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

async function newMessage(userId, message) {
  const query = `
  INSERT INTO messages (user_id, message_content, timestamp)
  VALUES ($1, $2, NOW());
  
  `;
  const values = [userId, message];

  return catchQuery(async () => {
    const result = await pool.query(query, values);
    console.log('Message created successfully:', result.rows[0]);
    return result.rows[0];
  });
}

// caching messages? so that it only has to query new ones?
async function getAllMessages() {
  const query = `
    SELECT message_content, timestamp, users.first_name, users.last_name
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.timestamp DESC
  `;

  return catchQuery(async () => {
    const result = await pool.query(query);
    console.log('Messages retrieved successfully:', result.rows);
    return result.rows;
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  makeMember,
  newMessage,
  getAllMessages,
};
