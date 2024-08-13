const axios = require('axios');

exports.index = async (req, res) => {
    try {
        const accessToken = req.query.access_token;
        const refreshToken = req.query.refresh_token;
        const userData = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const recomendPlaylist = await axios.get(`https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3/playlists?limit=4&offset=3`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const recentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=4', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const allRecentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const currentMonth = new Date().getMonth();
        let totalMinutes = 0;

        allRecentTracks.data.items.forEach(item => {
            const playedAt = new Date(item.played_at);
            if (playedAt.getMonth() === currentMonth) {
                const trackDurationMs = item.track.duration_ms;
                totalMinutes += trackDurationMs / 60000;
            }
        });

        res.render('home', { 
            data: userData.data,
            playlist: recomendPlaylist.data.playlists,
            recentTracks: recentTracks.data,
            currentTrack: currentTrack.data,
            totalMinutes: Math.round(totalMinutes)
        });
    } catch (error) {
        res.send(error);
    }
};