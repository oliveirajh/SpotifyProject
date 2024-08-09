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

        const recentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=4', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        // Nova chamada para obter os dados de reprodução do mês
        const allRecentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        // Calcular o tempo total escutado no mês
        const currentMonth = new Date().getMonth();
        let totalMinutes = 0;

        allRecentTracks.data.items.forEach(item => {
            const playedAt = new Date(item.played_at);
            if (playedAt.getMonth() === currentMonth) {
                const trackDurationMs = item.track.duration_ms;
                totalMinutes += trackDurationMs / 60000; // Converter ms para minutos
            }
        });

        res.render('home', { 
            data: userData.data,
            playlist: recomendPlaylist.data.playlists,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data,
            totalMinutes: Math.round(totalMinutes) // Passar o total de minutos para a view
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
