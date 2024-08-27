const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

router.get('/', controller.getHomePage);
router.get('/sign-up', controller.getSignUpPage);
router.post('/sign-up', controller.postCreateUser);

module.exports = router;
