const axios = require('axios');
const spotifyServices = require('../services/spotifyServices');
const sendError = require('../utils/sendError');

//Pega a música que está tocando no momento
exports.getCurrentTrack = async (req, res) => {
    try{
        const access_token = req.headers.authorization;
        const currentTrack = await spotifyServices.getCurrentTrackPlaying(access_token);
        if(!currentTrack.data.item){
            return res.status(204).json({
                message: 'No content'
            });
        }else{
            res.status(200).json({
                name: currentTrack.data.item.name,
                artists: currentTrack.data.item.artists.map(artist => ({
                    name: artist.name,
                    url: artist.external_urls.spotify
                })),
                album: {
                    name: currentTrack.data.item.album.name,
                    images: currentTrack.data.item.album.images,
                    url: currentTrack.data.item.album.external_urls.spotify
                },
                duration_ms: currentTrack.data.item.duration_ms,
                popularity: currentTrack.data.item.popularity,
                url: currentTrack.data.item.external_urls.spotify,
                is_playing: currentTrack.data.is_playing,
                progress_ms: currentTrack.data.progress_ms
            });
        }
    }catch(err){
        sendError(res,err);
    }
}