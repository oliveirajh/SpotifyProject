const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const artistController = require('../controllers/artistController');

router.get('/:id',verifyAccessToken, artistController.artistProfile);

module.exports = router;

