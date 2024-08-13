const express = require('express');
const router = express.Router();
const playTrackController = require('../controllers/playTrackController');

router.get("/:track/:URI", playTrackController.play);

module.exports = router;