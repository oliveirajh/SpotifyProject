const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get("/spotify", loginController.spotifyLogin);
router.get('/spotify/callback', loginController.spotifyCallback);

module.exports = router;
