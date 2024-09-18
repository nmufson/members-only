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
const { setLocalsFormData } = require('../middleware/setLocalsMiddleware');
const clearSessionData = require('../middleware/clearSessionData.js');

router.get('/', clearSessionData, setLocalsMessages, controller.getHomePage);

router.get(
  '/sign-up',
  clearSessionData,
  setLocalsSignUpForm,
  controller.getSignUpPage
);
router.post(
  '/sign-up',
  userValidationRules(),
  clearSessionData,
  setLocalsMessages,
  controller.postCreateUser
);

router.get('/member-join', controller.getMemberJoinPage);
router.post('/member-join', checkAuthenticated, controller.postJoinClub);

router.get(
  '/log-in',
  clearSessionData,
  setLocalsLogInForm,
  controller.getLogInPage
);
router.post(
  '/log-in',
  clearSessionData,
  setLocalsMessages,
  controller.postLogIn
);

router.post(
  '/log-out',
  setLocalsMessages,
  checkAuthenticated,
  controller.logOut
);

router.post(
  '/send-message',
  checkAuthenticated,
  messageValidationRules(),
  controller.sendMessage,
  setLocalsMessages // this should go after the controller
);

router.post('/delete-message', checkAdmin, controller.deleteMessage);

module.exports = router;
