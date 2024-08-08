const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.tops = async (req, res) => {
    const accessToken = req.session.accessToken;
    await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
}