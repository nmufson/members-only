const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');
const checkAuthenticated = require('../middleware/checkAuthenticated');
const { setLocalsMessages } = require('../middleware/setLocalsMiddleware');
const {
  userValidationRules,
  messageValidationRules,
} = require('../utils/validators');

router.get('/', setLocalsMessages, controller.getHomePage);
router.get('/sign-up', controller.getSignUpPage);
router.post(
  '/sign-up',
  setLocalsMessages,
  userValidationRules(),
  controller.postCreateUser
);

router.get('/member-join', controller.getMemberJoinPage);
router.post('/member-join', checkAuthenticated, controller.postJoinClub);

router.get('/log-in', controller.getLogInPage);
router.post('/log-in', setLocalsMessages, controller.postLogIn);

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

module.exports = router;
