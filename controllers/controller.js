const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { userValidationRules, getError } = require('../utils/validators');
const { validationResult } = require('express-validator');
const passport = require('passport');

async function getHomePage(req, res) {
  res.render('index', { title: 'Home Page' });
}

async function getSignUpPage(req, res) {
  res.render('sign-up', {
    title: 'Sign Up Page',
    getError: getError,
  });
}

async function checkEmail(req, res) {
  const { email } = req.body;

  const user = await db.getUserByEmail(email);

  if (user) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
}

async function getMemberJoinPage(req, res) {
  res.render('member-join', { title: 'Join as Member', passcodeError: '' });
}

async function getLogInPage(req, res) {
  res.render('log-in', { title: 'Log In Page', getError });
}

async function postLogIn(req, res, next) {
  // Use Passport's local strategy to authenticate the user
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err); // If there's an error, pass it to the error handler
    }
    if (!user) {
      // Authentication failed
      // Store the error message in the session (can pull from session in ejs)
      req.session.logInErrors = {
        email: info.message.includes('email') ? info.message : '',
        password: info.message.includes('password') ? info.message : '',
      };
      req.session.logInEmail = req.body.email;
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
    req.session.signUpErrors = errors.array();
    req.session.signUpData = req.body;
    return res.redirect('/sign-up');
  }

  const { firstName, lastName, email, password, adminCode } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const isAdmin = process.env.ADMIN_CODE === adminCode ? true : false;

  await db.createUser(firstName, lastName, email, hashedPassword, isAdmin);
  const user = await db.getUserByEmail(email);
  if (!user) return res.status(500).send('Error: User could not be created');

  // Wrap req.login in a Promise so it can be used with async/await
  await new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) {
        return reject(err); // Pass any errors to the catchAsync utility
      }
      resolve(); // Successfully logged in
    });
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
    res.render('member-join', {
      title: 'Member Join',
      passcodeError: 'Incorrect passcode',
    });
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

async function deleteMessage(req, res) {
  db.deleteMessage(req.body.messageId);

  res.redirect('/');
}

async function sendMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.formErrors = errors.array();
    return res.redirect('/');
  }

  const { message } = req.body;
  const userId = req.user.id;

  await db.newMessage(userId, message);
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
  sendMessage: catchAsync(sendMessage),
  deleteMessage: catchAsync(deleteMessage),
  checkEmail: catchAsync(checkEmail),
};
