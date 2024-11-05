const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/userProfile', authController.userProfile);
router.put('/updateUserProfile', authController.updateUserProfile);


module.exports = router;
