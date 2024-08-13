const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.play = async (req, res) => {
    const { track } = req.params;
    const { accessToken } = req.session;

    try {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            { uris: [`spotify:track:${track}`] },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 204) {
            res.redirect(req.query.track ? `/home/${req.params.URI}/${req.query.track}` : `/${req.params.URI}`);
        } else {
            res.status(response.status).send('Unable to play track');
        }
    } catch (error) {
        console.error('Error playing track:', error.response ? error.response.data : error.message);
        res.status(500);
    }
}; 