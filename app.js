const express = require('express');
const path = require('node:path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const router = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler');
const ejsLayouts = require('express-ejs-layouts');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// serve static files from public directory
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
