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
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log(response.data);

        res.render('home', { 
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};
