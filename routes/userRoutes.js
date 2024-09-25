const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../models/User')
const { body } = require('express-validator')

const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user=>{
                if(user){
                    return Promise.reject('Email Already Exist')
                }
            })
        })       
        ,
        body('password').not().isEmpty().withMessage('Please Enter Your Password'),

    ]    
    ,authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);


module.exports = router;
