function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500).render('error', {
    title: 'Error',
    message: err.message || 'An unexpected error occurred',
  });
}

module.exports = errorHandler;
