const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/topArtists",verifyToken, favoritesController.topArtists);
router.get("/topTracks",verifyToken, favoritesController.topTracks);

module.exports = router;