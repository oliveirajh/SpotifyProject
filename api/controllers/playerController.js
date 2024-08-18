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

exports.playTrack = async (req, res) => {
    const { search } = req.params;
    const access_token = req.headers.authorization;
    const { type } = req.query;

    try{
        switch(type) {
            case 'track':
                try {
                    const response = await spotifyServices.playTrack(access_token, search);
                    if(response.status === 204){
                        res.status(200).send('playing');
                    }
                } catch (error) {
                    if (error.response.status === 404) {
                        res.status(404).send('error_device')
                    }
                }
                break;
            case 'album':
                try {
                    const response = await spotifyServices.playAlbum(access_token, search);
                    if(response.status === 204){
                        res.status(200).send('playing');
                    }
                } catch (error) {
                    if (error.response.status === 404) {
                        res.status(404).send('error_device')
                    }
                }
                break;
            default:
                res.status(400).json({
                    message: 'Bad request'
                });
                break;
        }
    }catch(err){
        sendError(res,err);
    }
}