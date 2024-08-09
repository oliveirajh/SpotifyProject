const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/",verifyToken, homeController.home);
router.get('/current-track',verifyToken, homeController.getCurrentTrack);

module.exports = router;