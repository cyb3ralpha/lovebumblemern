const express = require('express');
const router = express.Router();
const discoverController = require('../controllers/discoverController');

router.get('/recommendations', discoverController.getRecommendations);
router.post('/filter', discoverController.filterProfiles);

module.exports = router;
