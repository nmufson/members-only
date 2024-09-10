const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');
const checkAuthenticated = require('../middleware/checkAuthenticated');

router.get('/', controller.getHomePage);
router.get('/sign-up', controller.getSignUpPage);
router.post('/sign-up', controller.postCreateUser);

router.get('/member-join', controller.getMemberJoinPage);
router.post('/member-join', checkAuthenticated, controller.postJoinClub);

router.get('/log-in', controller.getLogInPage);
router.post('/log-in', controller.postLogIn);

router.post('/log-out', checkAuthenticated, controller.logOut);

module.exports = router;
