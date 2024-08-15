const spotifyServices = require('../services/spotifyServices');
const sendError = require('../utils/sendError');

exports.getAlbum = async (req, res) => {
    try{
        const { id } = req.params;
        const access_token = req.headers.authorization;
        const album = await spotifyServices.getAlbum(access_token, id);
        res.status(200).json({
            name: album.data.name,
            genre: album.data.genres,
            artists: album.data.artists.map(artist => {
                return {
                    id: artist.id,
                    name: artist.name,
                    url: artist.external_urls.spotify
                }
            }),
            release_date: album.data.release_date,
            total_tracks: album.data.total_tracks,
            tracks: album.data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists.map(artist => {
                    return {
                        id: artist.id,
                        name: artist.name,
                        url: artist.external_urls.spotify
                    }
                }),
                url: track.external_urls.spotify
            })),
            images: album.data.images,
            url: album.data.external_urls.spotify
        });
    }catch(err){
        sendError(res,err);
    }
}