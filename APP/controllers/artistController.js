const axios = require('axios');
const API_URL = process.env.API_URL;

exports.artistProfile = async (req, res) => {
    try {
        const artistId = req.params.id;
        const accessToken = req.session.accessToken;

        // Buscar informações do artista
        const artist = await axios.get(`${API_URL}/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Buscar os álbuns do artista
        const albums = await axios.get(`${API_URL}/artists/${artistId}/albums`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Buscar as faixas mais populares do artista
        const topTracks = await axios.get(`${API_URL}/artists/${artistId}/top-tracks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.render('artistProfile', {
            artist: artist.data,
            albums: albums.data,
            tracks: topTracks.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching artist profile");
    }
};
