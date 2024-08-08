const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.home = async (req, res) => {
    const accessToken = req.session.accessToken;
    const refreshToken = req.session.refreshToken;

    if (!accessToken || !refreshToken) {
        return res.render('index', {
            error: 'You need to be logged in'
        });
    }

    try {
        const userData = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.render('home', { 
            data: userData.data,
            currentTrack: currentTrack.data
        });
    } catch (error) {
        res.send(error);
    }
};
