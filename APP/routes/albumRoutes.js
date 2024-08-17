const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

router.get('/:id',verifyAccessToken, albumController.getAlbum);

module.exports = router;