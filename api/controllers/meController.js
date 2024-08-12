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

exports.getMyTopArtists = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const topArtists = await spotifyServices.getMyTopArtists(req.query.access_token, limit, offset);
        res.status(200).json(
            topArtists.data.items.map(artist => ({
                name: artist.name,
                genres: artist.genres,
                followers: artist.followers.total,
                popularity: artist.popularity,
                images: artist.images,
                url: artist.external_urls.spotify
            }))
        );
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getMyTopTracks = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const topTracks = await spotifyServices.getMyTopTracks(req.query.access_token, limit, offset);
        res.status(200).json(
            topTracks.data.items.map(track => ({
                name: track.name,
                artists: {
                    name: track.artists.name,
                    url: track.artists.external_urls.spotify
                },
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
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}