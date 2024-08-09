const axios = require('axios');
const dotenv = require('dotenv');
const querystring = require('querystring');

dotenv.config();

exports.spotifyLogin = (req, res) => {
    try {
        const scopes = 'user-read-private user-read-email user-read-currently-playing user-top-read playlist-read-collaborative playlist-read-private user-follow-read user-library-read user-read-recently-played';
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const clientId = process.env.SPOTIFY_CLIENT_ID;

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: clientId,
                scope: scopes,
                redirect_uri: redirectUri,
        }));
        
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
        const access_token = response.data.access_token;
        res.status(200).json({ access_token: access_token });
        
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
