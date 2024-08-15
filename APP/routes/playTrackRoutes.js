const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const playTrackController = require('../controllers/playTrackController');

router.get("/:search",verifyAccessToken, playTrackController.play);

module.exports = router;