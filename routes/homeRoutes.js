const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/",verifyToken, homeController.home);
router.post('/search', homeController.search);
router.get('/current-track', homeController.getCurrentTrack);

module.exports = router;