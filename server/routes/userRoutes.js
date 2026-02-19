const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile/:id', userController.getProfile);
router.put('/profile/:id', userController.updateProfile);
router.post('/upload-photo', userController.uploadPhoto);

module.exports = router;
