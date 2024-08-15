const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

router.get('/favorites', favoritesController.getFavorites);

module.exports = router;