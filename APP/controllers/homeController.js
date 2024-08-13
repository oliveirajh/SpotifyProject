const axios = require('axios');

exports.index = async (req, res) => {
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

        const allRecentTracks = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
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

exports.search = async (req, res) => {
    try {
        const search = await axios.get(`https://api.spotify.com/v1/search?q=${req.params.track}&type=track&limit=30`, {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.render('search', { data: search.data, search: req.params.track });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

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