const express = require('express');
const router = express.Router();
const meController = require('../controllers/meController');

router.get("/", meController.getProfile);
router.get('/top-artists', meController.getMyTopArtists);
router.get('/top-tracks', meController.getMyTopTracks);
router.get('/saved-tracks', meController.getSavedTracks);

module.exports = router;