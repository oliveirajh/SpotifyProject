const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const API_URL = process.env.API_URL

exports.auth = async (req, res) => {
    res.redirect(`${API_URL}/auth`);
};

