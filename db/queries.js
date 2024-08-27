const pool = require('./pool');

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1;`;

  try {
    const result = await pool.query(query, [email]);
    return result.rows[0]; // Returns first matching user
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err; // throws error after logging it
  }
}

async function createUser(firstName, lastName, email, password) {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
  `;
  values = [firstName, lastName, email, password];

  try {
    await pool.query(query, values);
    console.log('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err.message);
  }
}

module.exports = {
  createUser,
};
