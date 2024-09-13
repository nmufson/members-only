const bcrypt = require('bcryptjs');

async function hashedPasswordUsers(users) {
  return Promise.all(
    users.map(async (user) => {
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(hashedPassword);

      // Return a new user object with the hashed password
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );
}

module.exports = hashedPasswordUsers;
