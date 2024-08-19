const spotifyServices = require('../services/spotifyServices');
const sendError = require('../utils/sendError');

exports.getArtist = async (req, res) => {
    try{
        const { id } = req.params;
        const access_token = req.headers.authorization;
        const artist = await spotifyServices.getArtist(access_token, id);
        res.status(200).json({
            name: artist.data.name,
            genres: artist.data.genres,
            followers: artist.data.followers.total,
            popularity: artist.data.popularity,
            images: artist.data.images,
            url: artist.data.external_urls.spotify,
            id: artist.data.id
        });
    }catch(err){
        sendError(res,err);
    }
}

exports.getArtistAlbums = async (req, res) => {
    try{
        const { id } = req.params;
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const albums = await spotifyServices.getArtistAlbums(access_token, id, limit, offset);
        res.status(200).json(
            albums.data.items.map(album => ({
                id: album.id,
                name: album.name,
                release_date: album.release_date,
                total_tracks: album.total_tracks,
                images: album.images,
                url: album.external_urls.spotify
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}

exports.getArtistTopTracks = async (req, res) => {
    try{
        const { id } = req.params;
        const access_token = req.headers.authorization;
        const topTracks = await spotifyServices.getArtistTopTracks(access_token, id);
        res.status(200).json(
            topTracks.data.tracks.map(track => ({
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
        );
    }catch(err){
        sendError(res,err);
    }
}