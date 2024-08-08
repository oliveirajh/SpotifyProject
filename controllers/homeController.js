const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.home = async (req, res) => {
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        const genre_seeds = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        const recomendPlaylist = await axios.get(`https://api.spotify.com/v1/recommendations?seed_genres=${genre_seeds}`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        const recentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=3', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.render('home', { 
            data: userData.data,
            playlist: recomendPlaylist.data,
            recentTracks: recentTracks.data
        });
    } catch (error) {
        res.render('error', {
            error: "You need to log in again"
        });
    }
};
