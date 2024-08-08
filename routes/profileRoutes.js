const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/topArtists",verifyToken, profileController.topArtists);
router.get("/topTracks",verifyToken, profileController.topTracks);

module.exports = router;