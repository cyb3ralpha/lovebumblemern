const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches', matchController.getMatches);
router.post('/unmatch/:matchId', matchController.unmatchUser);

module.exports = router;
