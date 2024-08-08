const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.spotifyLogin = (req, res) => {
    try {
        const scope = 'user-read-private user-read-email user-top-read playlist-read-collaborative playlist-read-private user-follow-read user-library-read user-read-recently-played';
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const clientId = process.env.SPOTIFY_CLIENT_ID;

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        
        res.redirect(authUrl);
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.spotifyCallback = async (req, res) => {
    try {
        const code = req.query.code;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            }).toString(),
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        res.redirect('/home');
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
