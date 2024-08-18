const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get("/current-track", playerController.getCurrentTrack);
router.get("/play/:search", playerController.playTrack);

module.exports = router;