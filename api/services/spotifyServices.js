const axios = require('axios');

exports.getMyProfile = async (req, res) => {
    return await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            'Authorization': `Bearer ${req.query.access_token}`
        }
    })
}