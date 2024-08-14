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

        function getAllMinutes(allRecentTracks) {
            const currentMonth = new Date().getMonth();
            let totalMinutes = 0;
            
            if (allRecentTracks && Array.isArray(allRecentTracks.data)) {
                allRecentTracks.data.forEach(item => {
                    const playedAt = new Date(item.played_at);
                    if (playedAt.getMonth() === currentMonth) {
                        const trackDurationMs = item.duration_ms;
                        totalMinutes += trackDurationMs / 60000;
                    }
                });
            }
            
            return Math.round(totalMinutes);
        }

        res.render('home',{
            data: userData.data,
            playlists: recomendPlaylist.data,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data,
            totalMinutes: getAllMinutes(allRecentTracks),
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

        res.render('search', { data: search.data, search: req.params.track, error: req.query.error });

    } catch (error) {
        console.log(error);
        res.render('search', { data: search.data, search: req.params.track, error: req.query.error });
    }
}
exports.artistProfile = async (req, res) => {
    try {
        const artistId = req.params.id;
        const accessToken = req.session.accessToken;

        // Buscar informações do artista
        const artist = await axios.get(`${API_URL}/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Buscar os álbuns do artista
        const albums = await axios.get(`${API_URL}/artists/${artistId}/albums`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Buscar as faixas mais populares do artista
        const topTracks = await axios.get(`${API_URL}/artists/${artistId}/top-tracks?market=US`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.render('artistProfile', {
            artist: artist.data,
            albums: albums.data.items,
            topTracks: topTracks.data.tracks
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching artist profile");
    }
};

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