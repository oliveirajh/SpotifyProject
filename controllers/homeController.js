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

        res.render('home', { 
            data: userData.data,
        });
    } catch (error) {
        res.render('error', {
            error: "You need to log in again"
        });
    }
};
