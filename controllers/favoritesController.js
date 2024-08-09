const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getTopArtists = async (req, res) => {
    const accessToken = req.session.accessToken; // Supondo que o token esteja na sessão

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top artists:', error.message);
        res.status(error.response ? error.response.status : 500).render('error', { message: error.message });
    }
}

const getTopTracks = async (req, res) => {
    const accessToken = req.session.accessToken; // Supondo que o token esteja na sessão

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top tracks:', error.message);
        res.status(error.response ? error.response.status : 500).render('error', { message: error.message });
    }
}

exports.getFavorites = async (req, res) => {
    try{
        const topArtists = await getTopArtists(req, res);
        const topTracks = await getTopTracks(req, res);
        res.render('favorites', { topArtists, topTracks });
    }catch(error){
        res.status(500).render('error', { message: error.message });
    }
}