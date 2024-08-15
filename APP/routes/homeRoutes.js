const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');


router.get("/", homeController.index);
router.post('/', homeController.search);
router.post('/search/:track',verifyAccessToken, homeController.search);
router.get('/search/:track',verifyAccessToken, homeController.search);
router.get('/current-track', homeController.getCurrentTrack);



module.exports = router;