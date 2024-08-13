const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get("/current-track", playerController.getCurrentTrack);

module.exports = router;