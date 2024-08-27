const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const userValidationRules = require('../utils/validators/');
const { body, validationResult } = require('express-validator');

async function getHomePage(req, res) {
  res.render('index', { title: 'Home Page' });
}

async function getSignUpPage(req, res) {
  res.render('sign-up', { title: 'Sign Up Page' });
}

async function postCreateUser(req, res, next) {
  // promise.all waits for validation to complete, validation.run returns promise
  // that resolves once validation is done
  await Promise.all(
    userValidationRules().map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser(firstName, lastName, email, hashedPassword);
  res.redirect('/');
}

module.exports = {
  getHomePage: catchAsync(getHomePage),
  getSignUpPage: catchAsync(getSignUpPage),
  postCreateUser: catchAsync(postCreateUser),
};
