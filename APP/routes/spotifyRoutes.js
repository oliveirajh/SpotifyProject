const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get("/auth", spotifyController.auth);

module.exports = router;