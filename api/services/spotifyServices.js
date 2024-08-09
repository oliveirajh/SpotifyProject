const axios = require('axios');

const getHeaders = (access_token) => (
    {'Authorization': `Bearer ${access_token}`}
)
    

exports.getMyProfile = async (access_token) => {
    return await axios.get("https://api.spotify.com/v1/me", {
        headers: getHeaders(access_token)
    })
}