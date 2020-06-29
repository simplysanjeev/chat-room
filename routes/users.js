const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersControllers = require('../controllers/users');
//User model
const User = require('../models/User');
//Login page
router.get('/login', usersControllers.getLogin);

//Register page
router.get('/register', usersControllers.getRegister);

//Register handler
router.post('/register', usersControllers.postRegister);


//Login Handle
router.post('/login', usersControllers.postLogin);

//Logout handler
router.get('/logout', usersControllers.logout);

//Change Password handler
router.get('/change-password', usersControllers.getChangePassword);

router.post('/change-password', usersControllers.postChangePassword);

//google auth
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersControllers.postRegisterGoogle);

module.exports = router;