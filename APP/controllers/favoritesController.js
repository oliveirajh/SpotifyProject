const axios = require('axios');
const API_URL = process.env.API_URL;

exports.getFavorites = async (req, res) => {
    try {
        const { accessToken } = req.session;

        const userData = await axios.get(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const favoriteArtists = await axios.get(`${API_URL}/me/top-artists?limit=4`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const favoriteSongs = await axios.get(`${API_URL}/me/top-tracks?limit=4`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const favoritePlaylists = await axios.get(`${API_URL}/me/playlists?limit=4`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.render('favorites',{
            user: userData.data,
            artists: favoriteArtists.data,
            songs: favoriteSongs.data,
            playlists: favoritePlaylists.data
        })
    } catch (err) {
        res.send(err);
    };
};