const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.search = async (req, res) => {
    try {
        const search = await axios.get(`https://api.spotify.com/v1/search?q=${req.body.search}&type=track&limit=30`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.render('search', { data: search.data, search: req.body.search });

    } catch (error) {
        res.status(500).send(error.message);
    }
}