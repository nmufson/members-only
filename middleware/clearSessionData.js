function clearSessionData(req, res, next) {
  if (!req.path.startsWith('/sign-up')) {
    req.session.signUpErrors = []; // Clear sign-up errors
    req.session.signUpData = {}; // Clear sign-up form data
  }
  if (!req.path.startsWith('/log-in')) {
    req.session.logInErrors = []; // Clear sign-up errors
    req.session.logInEmail = ''; // Clear sign-up form data
  }

  next();
}

module.exports = clearSessionData;
