const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.topArtists = async (req, res) => {
    await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        res.send(response.data); //FRONT-END
    })
    .catch(error => {
        res.send(error);
    });
}

exports.topTracks = async (req, res) => {
    await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            'Authorization' : `Bearer ${req.session.accessToken}`
        }
    })
    .then(response => {
        res.send(response.data); //FRONT-END
    })
    .catch(error => {
        res.send(error);
    });
}
