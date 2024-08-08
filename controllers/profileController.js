const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.topArtists = async (req, res) => {
    const accessToken = req.session.accessToken; // Supondo que o token esteja na sessão

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.send(response.data); // FRONT-END
    } catch (error) {
        console.error('Error fetching top artists:', error.message);
        res.status(error.response ? error.response.status : 500).render('error', { message: error.message });
    }
}

exports.topTracks = async (req, res) => {
    const accessToken = req.session.accessToken; // Supondo que o token esteja na sessão

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.send(response.data); // FRONT-END
    } catch (error) {
        console.error('Error fetching top tracks:', error.message);
        res.status(error.response ? error.response.status : 500).render('error', { message: error.message });
    }
}
