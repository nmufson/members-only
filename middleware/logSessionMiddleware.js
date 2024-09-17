function logSessionMiddleware(req, res, next) {
  // console.log('Current session data:', req.session);
  next();
}

module.exports = logSessionMiddleware;
