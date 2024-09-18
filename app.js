const express = require('express');
const path = require('node:path');
const pool = require('./db/pool');
const db = require('./db/queries');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const router = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler');
const logSessionMiddleware = require('./middleware/logSessionMiddleware');
const ejsLayouts = require('express-ejs-layouts');
const { setUncaughtExceptionCaptureCallback } = require('node:process');
const setLocalsMiddleware = require('./middleware/setLocalsMiddleware');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const app = express();

const sessionStore = new pgSession({
  pool: pool, // Connection pool
  tableName: 'session',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  //config object for the express-session middleware
  session({
    store: sessionStore,
    // used to sign and secure session cookies
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // set to true for production (for using HTTPS)
    cookie: { secure: process.env.NODE_ENV === 'production' }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport calls this when user logs in to determine data to store
// in the session (we're just storing the user.id)
passport.serializeUser((user, done) => {
  done(null, user.id); // Only store the user ID in the session
});

// passport uses this func to retrieve the full user object from
// the db using the stored user ID in the session
// user obj gets attached to req.user
// basically abstracts away the querying
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id); // Fetch the full user object using the ID
    done(null, user); // Attach the full user object to req.user
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    //Passport LocaclStrat looks for 'username' and 'password' by default
    // need to specify if our form uses other name like 'email'
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await db.getUserByEmail(email);
        console.log('Retrieved user:', user); // Debug statement
        if (!user) return done(null, false, { message: 'Incorrect email.' });

        console.log(password, user.password);
        // user.password is the hashed pw
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        console.log('Password match result:', isPasswordValid); // Debug statement
        if (!isPasswordValid)
          return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.use(setLocalsMiddleware.setLocalsUser);

// app.use(logSessionMiddleware);

// static files, parsing
app.use(express.static('public'));

// sets the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Use express-ejs-layouts middleware
app.use(ejsLayouts);

app.use('/', router);
// error handler should be last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
