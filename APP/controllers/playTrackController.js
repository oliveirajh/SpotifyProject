const axios = require('axios');
const dotenv = require('dotenv');
const API_URL = process.env.API_URL;

dotenv.config();

exports.play = async (req, res) => {
    try{
        const { search } = req.params;
        const { accessToken }  = req.session;
        const { type } = req.query;

        const playMusic = await axios.get(`${API_URL}/player/play/${search}?type=${type}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if(playMusic.status === 200) {
            if(playMusic.data == 'playing') {
                res.redirect(`${decodeURIComponent(req.query.redirect)}`);
            }
        }
    }catch(err){
        if(req.query.redirect == '/home' || req.query.redirect == undefined){
            res.redirect(`${decodeURIComponent(req.query.redirect)}?error=device_not_found`);
        }else{
            res.redirect(`${decodeURIComponent(req.query.redirect)}&error=device_not_found`);
        }
    }
}; 
