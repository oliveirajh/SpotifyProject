const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get("/", authController.spotifyLogin);
router.get('/callback', authController.spotifyCallback);
router.post('/refresh', authController.getRefreshToken);

module.exports = router;