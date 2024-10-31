const bcrypt = require('bcryptjs');

async function hashedPasswordUsers(users) {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return {
        ...user,
        password: hashedPassword,
      };
    })
  );
}

module.exports = hashedPasswordUsers;
