const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

router.get('/favorites',verifyAccessToken, favoritesController.getFavorites);

module.exports = router;