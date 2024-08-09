const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/",verifyToken, favoritesController.getFavorites);

module.exports = router;