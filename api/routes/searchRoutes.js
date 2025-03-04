const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get("/:type/:name", searchController.search);

module.exports = router;