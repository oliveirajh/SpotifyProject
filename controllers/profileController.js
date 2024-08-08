const axios = require('axios');
const dotenv = require('dotenv');

exports.tops = async (req, res) => {
    await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            'Authorization': `Bearer ${req.session.acessToken}`
        }
    })
    .then(response => {
        res.send('top Songs', { data: response.data });
    })
    .catch(error => {
        res.send('error', { error: error });
    });
}