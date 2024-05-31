
const express = require('express');
const router = express.Router();
const Admin = require('./../controllers/admin');
const Auth = require('./../controllers/auth');
const User = require('../controllers/users');

router.post('/admin/login',Admin.login); 
router.post('/admin/register',Admin.register);
router.post('/admin/forgotpassword',Admin.forgotpassword);
router.post('/admin/resetpassword/:id/:token',Admin.resetpassword);
router.post('/user/login',User.login);
router.post('/user/register',User.register);
router.post('/user/forgotpassword',User.forgotpassword);
router.post('/user/resetpassword/:id/:token',User.resetpassword);
router.post('/check-token-expiration', Auth.checkTokenExpiration);

module.exports = router;