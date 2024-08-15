const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');


router.get("/",verifyAccessToken, homeController.index);
router.post('/',verifyAccessToken, homeController.search);
router.post('/search/:track',verifyAccessToken, homeController.search);
router.get('/search/:track',verifyAccessToken, homeController.search);
router.get('/current-track',verifyAccessToken, homeController.getCurrentTrack);



module.exports = router;