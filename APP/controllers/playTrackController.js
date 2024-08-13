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
            if (req.query.track == 'auth') {
                res.redirect(`/spotify/auth`);
            } else {
                res.redirect(req.query.track ? `/home/${req.params.URI}/${req.query.track}` : `/${req.params.URI}`);
            }
        } else {
            res.status(response.status).send('Unable to play track');
        }

    } catch (error) {
        if (error.response.data.error.reason === 'NO_ACTIVE_DEVICE') {
            res.redirect(`/home/search/${req.query.track}?error=NO_ACTIVE_DEVICE`);
        } else {
            res.status(500).send('Unable to play track');
        }
    }
}; 