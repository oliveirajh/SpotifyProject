const express = require('express');
const router = express.Router();
const playTrackController = require('../controllers/playTrackController');

router.get("/:search", playTrackController.play);

module.exports = router;