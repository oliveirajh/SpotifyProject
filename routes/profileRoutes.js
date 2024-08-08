const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middlewares/verifyToken');

router.get("/profile/tops",verifyToken, profileController.tops);