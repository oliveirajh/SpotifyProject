const axios = require('axios');
const dotenv = require('dotenv');
const querystring = require('querystring');

dotenv.config();


exports.spotifyLogin = (req, res) => {
    try {
        const scopes = 'user-read-private user-read-email user-read-currently-playing user-top-read playlist-read-collaborative playlist-read-private user-follow-read user-library-read user-read-recently-played user-modify-playback-state';
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
        res.status(500).send('Internal Server Error: ' + err);
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
        const refresh_token = response.data.refresh_token;
        if(process.env.FRONTEND_URL) {
            res.redirect(`${process.env.FRONTEND_URL}/redirect?access_token=${access_token}&refresh_token=${refresh_token}`);
        }else{
            res.status(200).json({ access_token: access_token, refresh_token: refresh_token });
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error: ' + err);
    }
}

exports.getRefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    'Authorization': `Basic ${authHeader}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        res.json({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token || refreshToken, // Atualiza o refresh token, se necessário
        });
    } catch (error) {
        console.error('Erro ao atualizar o token', error.response.data);
        throw error;
    }
}