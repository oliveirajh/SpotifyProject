const axios = require('axios');
const spotifyServices = require('../services/spotifyServices');

exports.getProfile = async (req, res) => {
    try{
        const profileData = await spotifyServices.getMyProfile(req.query.access_token);
        res.status(200).json({
            name: profileData.data.display_name,
            email: profileData.data.email,
            country: profileData.data.country,
            link: profileData.data.external_urls.spotify,
            product: profileData.data.product,
            followers: profileData.data.followers.total,
            images: profileData.data.images
        });
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}