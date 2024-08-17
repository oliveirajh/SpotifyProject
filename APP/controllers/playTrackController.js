const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.play = async (req, res) => {
    const { search } = req.params;
    const { accessToken } = req.session;
    const { type } = req.query;

    switch(type) {
        case 'track':
            try {

                const response = await axios.put(
                    `https://api.spotify.com/v1/me/player/play`,
                    { uris: [`spotify:track:${search}`] },
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
            break;
        case 'album':
            try {

                const response = await axios.put(
                    `https://api.spotify.com/v1/me/player/play`,
                    { 
                        context_uri: `spotify:album:${search}`,
                        offset: { position: 0 } 
                    },
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
            break;
        case 'artist':
            // Redirecionar para página do artista
            break;
        default:
            res.redirect('/spotify/auth');
    }
}; 