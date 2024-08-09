const axios = require('axios');
const spotifyServices = require('../services/spotifyServices');

exports.getProfile = async (req, res) => {
    try{
        const profileData = await spotifyServices.getMyProfile(req, res);
        res.status(200).json(profileData.data);
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}