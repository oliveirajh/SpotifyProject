const express = require('express');
const router = express.Router();

const redirectController = require('../controllers/redirectController');

router.get('/', redirectController.redirect);

module.exports = router;