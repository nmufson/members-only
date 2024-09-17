const checkAuthenticated = require('./checkAuthenticated');

function checkAdmin(req, res, next) {
  if (checkAuthenticated && req.user.is_admin) {
    return next(); // proceed to the next middleware/controller
  } else {
    return res.status(403).send('Forbidden');
  }
}

module.exports = checkAdmin;
