const axios = require('axios');
const API_URL = process.env.API_URL;

exports.index = async (req, res) => {
    try {
        req.session.accessToken = req.query.access_token;
        req.session.refreshToken = req.query.refresh_token;

        const accessToken = req.query.access_token;
        const refreshToken = req.query.refresh_token;

        const userData = await axios.get(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //Falta Implementar na API
        const recomendPlaylist = await axios.get(`https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3/playlists?limit=4&offset=3`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

         //Falta Implementar
        const recentTracks = await axios.get(`${API_URL}/me/recently-played?limit=4`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //Falta Implementar
        const currentTrack = await axios.get(`${API_URL}/player/current-track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //Falta Implementar
        const allRecentTracks = await axios.get(`${API_URL}/me/recently-played?limit=50`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        function getAllMinutes(){
            const currentMonth = new Date().getMonth();
            let totalMinutes = 0;
            allRecentTracks.data.forEach(item => {
                const playedAt = new Date(item.played_at);
                if (playedAt.getMonth() === currentMonth) {
                    const trackDurationMs = item.duration_ms;
                    totalMinutes += trackDurationMs / 60000;
                }
            });
            return Math.round(totalMinutes);
        }

        res.render('home',{
            data: userData.data,
            playlist: recomendPlaylist.data.playlists,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data,
            totalMinutes: getAllMinutes()
        })
    } catch (error) {
        res.send(error);
    }
};

exports.search = async (req, res) => {
    try {
        const search = await axios.get(`https://api.spotify.com/v1/search?q=${req.params.track}&type=track&limit=30`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.render('search', { data: search.data, search: req.params.track, error: req.query.error });

    } catch (error) {
        res.render('search', { data: search.data, search: req.params.track, error: req.query.error });
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