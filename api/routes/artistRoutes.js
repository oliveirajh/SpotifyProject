const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/:id', artistController.getArtist);
router.get('/:id/albums', artistController.getArtistAlbums);
router.get('/:id/top-tracks', artistController.getArtistTopTracks);

module.exports = router;