const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.auth = async (req, res) => {
    res.redirect('http://localhost:3000/auth');
};

