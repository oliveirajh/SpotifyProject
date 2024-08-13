const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get("/", homeController.index);
router.post('/search/:track', homeController.search);
router.get('/search/:track', homeController.search);
router.get('/current-track', homeController.getCurrentTrack);

module.exports = router;