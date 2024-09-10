const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const userValidationRules = require('../utils/validators');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

async function getHomePage(req, res) {
  res.render('index', { title: 'Home Page' });
}

async function getSignUpPage(req, res) {
  res.render('sign-up', { title: 'Sign Up Page' });
}

async function getMemberJoinPage(req, res) {
  res.render('member-join', { title: 'Join as Member' });
}

async function getLogInPage(req, res) {
  const messages = req.session.messages || [];
  res.render('log-in', { title: 'Log In Page', messages });
}

async function postLogIn(req, res, next) {
  // Use Passport's local strategy to authenticate the user
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err); // If there's an error, pass it to the error handler
    }
    if (!user) {
      // Authentication failed
      // Store the error message in the session
      req.session.messages = [info.message];
      return res.redirect('/log-in');
    }

    // If authentication is successful, log in the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });

    // Redirect to the home page or the user's dashboard after successful login
    res.redirect('/');
  })(req, res, next); // Pass req, res, and next to passport.authenticate
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
  const user = await db.getUserByEmail(email);
  if (!user) return res.status(500).send('Error: User could not be created');

  // Wrap req.login in a Promise so it can be used with async/await
  req.login(user, (err) => {
    if (err) {
      return reject(err); // Pass any errors to the catchAsync utility
    }
    resolve(); // Successfully logged in
  });

  res.redirect('/');
}

async function postJoinClub(req, res) {
  if (req.body.memberPassword === process.env.MEMBER_PASSWORD) {
    await db.makeMember(req.user.id);
    res.render('member-congrats', { title: 'Member Congrats' });
    // render a page or modal saying 'ur now a member'
    // then allow the user to return to home page
    // show their name somewhere in the corner with an indication that
    // they are a member
  } else {
    res.status(403).send('Incorrect member password'); // Handle incorrect member password
  }
}

async function logOut(req, res) {
  await new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        return reject(err); // Reject the promise if an error occurs
      }
      resolve(); // Resolve the promise if logout is successful
    });
  });

  res.redirect('/');
}

module.exports = {
  getHomePage: catchAsync(getHomePage),
  getSignUpPage: catchAsync(getSignUpPage),
  postCreateUser: catchAsync(postCreateUser),
  getMemberJoinPage: catchAsync(getMemberJoinPage),
  postJoinClub: catchAsync(postJoinClub),
  logOut: catchAsync(logOut),
  getLogInPage: catchAsync(getLogInPage),
  postLogIn: catchAsync(postLogIn),
};
