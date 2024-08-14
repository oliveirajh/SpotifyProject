const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get("/", homeController.index);
router.post('/', homeController.search);
router.post('/search/:track', homeController.search);
router.get('/search/:track', homeController.search);
router.get('/current-track', homeController.getCurrentTrack);
router.get('/artist/:id', homeController.artistProfile);


module.exports = router;