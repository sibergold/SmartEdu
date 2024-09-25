const express = require('express');
const pageController = require('../controllers/pageControllers');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();
router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/contact').get(redirectMiddleware, pageController.getContactPage);
router.route('/contact').post(redirectMiddleware, pageController.sendEmail);

module.exports = router;
