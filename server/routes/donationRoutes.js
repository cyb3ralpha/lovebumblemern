const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/donate', donationController.processDonation);
router.get('/history', donationController.getDonationHistory);

module.exports = router;
