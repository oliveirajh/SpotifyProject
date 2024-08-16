const express = require('express');
const router = express.Router();
const meController = require('../controllers/meController');

router.get("/", meController.getProfile);
router.get('/top-artists', meController.getMyTopArtists);
router.get('/top-tracks', meController.getMyTopTracks);
router.get('/saved-tracks', meController.getSavedTracks);
router.get('/recently-played', meController.getRecentlyPlayed);
router.get('/recommendations', meController.getMyRecommendations);
router.get('/playlists', meController.getMyPlaylists);

module.exports = router;