const { body, validationResult } = require('express-validator');
const db = require('../db/queries');

const userValidationRules = () => [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    // check for existing user in validation rather than in controller for
    // separation of concerns
    .custom(async (email) => {
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[@$!%*?&#]/)
    .withMessage('Password must contain a special character'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

module.exports = userValidationRules;
