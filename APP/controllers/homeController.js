const axios = require('axios');
const API_URL = process.env.API_URL;

exports.index = async (req, res) => {
    try {
        const accessToken = req.session.accessToken;
        const refreshToken = req.session.refreshToken;

        const userData = await axios.get(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //Falta Implementar na API
        const recomendPlaylist = await axios.get(`${API_URL}/me/recommendations`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const recentTracks = await axios.get(`${API_URL}/me/recently-played?limit=4`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const currentTrack = await axios.get(`${API_URL}/player/current-track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const allRecentTracks = await axios.get(`${API_URL}/me/recently-played?limit=50`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.render('home',{
            data: userData.data,
            playlists: recomendPlaylist.data,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data,
            error: req.query.error
        })
    } catch (error) {
        res.send(error);
    }
};

exports.search = async (req, res) => {
    try {
        const search = await axios.get(`${API_URL}/search/${req.query.type}/${req.params.track}`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        switch (req.query.type) {
            case 'track':
                res.render('search', { data: search.data, search: req.params.track, error: req.query.error });
                break;
            case 'artist':
                res.render('searchArtist', { data: search.data, search: req.params.track, error: req.query.error });
                break;
            case 'album':
                res.render('searchAlbum', { data: search.data, search: req.params.track, error: req.query.error });
                break;
            default:
                res.redirect('/home');
        }

    } catch (error) {
        res.redirect("/home");
    }
}

exports.getCurrentTrack = async (req, res) => {
    try {
        const currentTrack = await axios.get(`${API_URL}/player/current-track`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });
        res.json(currentTrack.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};