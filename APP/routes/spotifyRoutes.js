const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get("/auth", spotifyController.auth);
router.get('/callback', spotifyController.callback);

module.exports = router;