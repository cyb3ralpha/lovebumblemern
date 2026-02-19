const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/reports', adminController.getReports);
router.post('/ban/:userId', adminController.banUser);
router.get('/statistics', adminController.getStatistics);

module.exports = router;
