const axios = require('axios');
const API_URL = process.env.API_URL;

exports.getAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { accessToken } = req.session;

        const getAlbum = await axios.get(`${API_URL}/albums/${albumId}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.render('album',{
            album: getAlbum.data,
            albumID: req.params.id
        })
    } catch (err) {
        res.send(err);
    };
};