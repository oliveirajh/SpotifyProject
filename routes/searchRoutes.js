const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/',verifyToken, searchController.search);

module.exports = router;