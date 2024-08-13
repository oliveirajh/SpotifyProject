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

        res.redirect(decodeURIComponent(req.query.redirect));

    } catch (error) {
        if (error.response.status === 404) {
            res.redirect(`${decodeURIComponent(req.query.redirect)}?error=device_not_found`);
        }
    }
}; 