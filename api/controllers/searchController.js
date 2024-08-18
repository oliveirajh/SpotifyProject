const axios = require('axios');
const spotifyServices = require('../services/spotifyServices');
const sendError = require('../utils/sendError');

exports.search = async (req, res) => {
    try{
        const { type, name } = req.params;
        const { limit } = req.query;
        const access_token = req.headers.authorization;
        const response = await spotifyServices.search(access_token, type, name, limit);

        if(Object.keys(response.data).length === 0){
            res.status(404).json({message: 'Track not found'});
        }

        if(type === 'track' && Object.keys(response.data).length > 0){
            res.status(200).json({
                type: 'track',
                results: response.data.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map(artist => {
                        return {
                            name: artist.name,
                            url: artist.external_urls.spotify
                        }
                    }),
                    album: {
                        name: track.album.name,
                        images: track.album.images,
                        url: track.album.external_urls.spotify,
                    },
                    duration: track.duration_ms,
                    popularity: track.popularity,
                    url: track.external_urls.spotify
                }))
            });
        }

        if(type === 'artist' && Object.keys(response.data).length > 0){
            res.status(200).json({
                type: 'artist',
                results: response.data.artists.items.map(artist => ({
                    id: artist.id,
                    name: artist.name,
                    followers: artist.followers.total,
                    popularity: artist.popularity,
                    images: artist.images.map(image => image.url),
                    genres: artist.genres,
                    url: artist.external_urls.spotify
                }))
            });
        }

        if(type === 'album' && Object.keys(response.data).length > 0){
            res.status(200).json({
                type: 'album',
                results: response.data.albums.items.map(album => ({
                    id: album.id,
                    name: album.name,
                    images: album.images,
                    artists: album.artists.map(artist => {
                        return {
                            name: artist.name,
                            url: artist.external_urls.spotify
                        }
                    }),
                    url: album.external_urls.spotify
                }))
        });
        }

        
    }catch(err){
        sendError(res,err);
    }
}