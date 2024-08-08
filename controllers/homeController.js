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

        res.render('home', { 
            data: userData.data,
        });
    } catch (error) {
        res.render('error', {
            error: "You need to log in again"
        });
    }
};
