// const { Client } = require('pg');
// require('dotenv').config();

const pool = require('./pool');
const hashedPasswordUsers = require('../utils/hashPasswords');
const { users, messages } = require('./usersData');

const SQL = `

 -- Drop existing tables if they exist
  DROP TABLE IF EXISTS messages;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS session;

  -- Create the session table
  CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL COLLATE "default",
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    PRIMARY KEY ("sid")
  );

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
  );

  CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_content VARCHAR(300) NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE SET NULL
  );
`;
// sets messages.user_id to NULL if user is deleted
// ON DELETE CASCADE would removes messages if user is deleted

function generateInsertUsersQuery(users) {
  const values = users.flatMap((user) => [
    user.firstName,
    user.lastName || '', // Default to empty string if lastName is null
    user.email,
    user.password,
    user.membershipStatus,
    user.isAdmin,
  ]);

  const query = `
    INSERT INTO users (first_name, last_name, email, password, membership_status, is_admin)
    VALUES ${users
      .map(
        (user, index) =>
          `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`
      )
      .join(', ')};`;

  return { query, values };
}

// creates temporary m table
// for each row in temp m table, query matches email with email column in
// the users table to find the corresponding user_id
// thne inserts msgcontent, user_id, and timestamp into the messages table

async function main() {
  console.log('Seeding database...');
  const client = await pool.connect(); // Get a client from the pool
  try {
    await client.query('BEGIN'); // Start a transaction

    await client.query(SQL); // Execute the table creation SQL script
    console.log('Database tables created successfully!');

    // insert users with hashes pws
    const hashedUsers = await hashedPasswordUsers(users);

    const { query: insertUsersQuery, values: userValues } =
      generateInsertUsersQuery(hashedUsers);
    await client.query(insertUsersQuery, userValues);
    console.log('Users inserted successfully!');

    // await client.query(INSERT_MESSAGES);
    for (const message of messages) {
      await client.query(
        `INSERT INTO messages (message_content, user_id, timestamp)
         SELECT $1, u.id, $2
         FROM users u
         WHERE u.email = $3`,
        [message.message_content, message.timestamp, message.email]
      );
    }
    console.log('Messages inserted successfully!');

    await client.query('COMMIT'); // Commit the transaction
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction on error
    console.error('Error seeding the database:', error.message || error);
  } finally {
    client.release(); // Release the client back to the pool
    await pool.end(); // Close the pool
    console.log('Database connection closed.');
    process.exit(); // Exit the process
  }
}
main();
