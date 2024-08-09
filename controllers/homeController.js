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

        const recomendPlaylist = await axios.get(`https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3/playlists?limit=4&offset=3`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        
        });

        const recentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=4  ', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.render('home', { 
            data: userData.data,
            playlist: recomendPlaylist.data.playlists,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data
        });
    } catch (error) {
        res.send(error);
    }
};

exports.getCurrentTrack = async (req, res) => {
    try {
        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.json(currentTrack.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
