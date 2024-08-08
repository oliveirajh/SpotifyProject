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

        const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
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
