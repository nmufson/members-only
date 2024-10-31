// update some of these to router.put and router.delete

const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');
const checkAuthenticated = require('../middleware/checkAuthenticated.js');
const checkAdmin = require('../middleware/checkAdmin.js');
const {
  setLocalsMessages,
  setLocalsSignUpForm,
  setLocalsLogInForm,
} = require('../middleware/setLocalsMiddleware');
const {
  userValidationRules,
  messageValidationRules,
} = require('../utils/validators');
const clearSessionData = require('../middleware/clearSessionData.js');

// Home Page Route
router.get('/', clearSessionData, setLocalsMessages, controller.getHomePage);

// Authentication Routes
router.get(
  '/sign-up',
  clearSessionData,
  setLocalsSignUpForm,
  controller.getSignUpPage
);
router.post('/sign-up', userValidationRules(), controller.postCreateUser);

router.post('/check-email', controller.checkEmail);

router.get(
  '/log-in',
  clearSessionData,
  setLocalsLogInForm,
  controller.getLogInPage
);
router.post('/log-in', controller.postLogIn);

router.post('/log-out', checkAuthenticated, controller.logOut);

// Member Join Routes
router.get('/member-join', controller.getMemberJoinPage);
router.post('/member-join', checkAuthenticated, controller.postJoinClub);

// Messaging Routes
router.post(
  '/send-message',
  checkAuthenticated,
  messageValidationRules(),
  controller.sendMessage,
  setLocalsMessages
);

router.post(
  '/delete-message',
  checkAdmin,
  controller.deleteMessage,
  setLocalsMessages
);

module.exports = router;
