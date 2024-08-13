const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.auth = async (req, res) => {
    res.redirect('http://localhost:3000/auth');
};

exports.callback = async (req, res) => {
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

        req.session.accessToken = response.data.access_token;
        req.session.refreshToken = response.data.access_token;

        res.redirect('/home');
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error:' +err);
    }
}
