const express = require('express');
const router = express.Router();
const meController = require('../controllers/meController');

router.get("/", meController.getProfile);
router.get('/top-artists', meController.getMyTopArtists);
router.get('/top-tracks', meController.getMyTopTracks);

module.exports = router;