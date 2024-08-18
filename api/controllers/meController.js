const axios = require('axios');
const spotifyServices = require('../services/spotifyServices');
const sendError = require('../utils/sendError');

exports.getProfile = async (req, res) => {
    try{
        const profileData = await spotifyServices.getMyProfile(req.headers.authorization);
        res.status(200).json({
            id: profileData.data.id,
            name: profileData.data.display_name,
            email: profileData.data.email,
            country: profileData.data.country,
            link: profileData.data.external_urls.spotify,
            product: profileData.data.product,
            followers: profileData.data.followers.total,
            images: profileData.data.images
        });
    }catch(err){
        sendError(res,err);
    }
}

exports.getMyRecommendations = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const recommendations = await spotifyServices.getMyRecommendations(access_token, limit, offset);
        res.status(200).json(
            recommendations.data.playlists.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
                images: playlist.images,
                url: playlist.external_urls.spotify
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}

exports.getMyTopArtists = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const topArtists = await spotifyServices.getMyTopArtists(access_token, limit, offset);
        res.status(200).json(
            topArtists.data.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                genres: artist.genres,
                followers: artist.followers.total,
                popularity: artist.popularity,
                images: artist.images,
                url: artist.external_urls.spotify
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}

exports.getMyTopTracks = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const topTracks = await spotifyServices.getMyTopTracks(access_token, limit, offset);
        res.status(200).json(
            topTracks.data.items.map(track => ({
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

exports.getSavedTracks =  async (req,res) => {
    try{
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const savedTracks = await spotifyServices.getSavedTracks(access_token, limit, offset)
        res.status(200).json(
            savedTracks.data.items.map(track => ({
                name: track.track.name,
                artists: track.track.artists.map(artist => {
                    return {
                        name: artist.name,
                        url: artist.external_urls.spotify
                    }
                }),
                album: {
                    name: track.track.album.name,
                    images: track.track.album.images,
                    url: track.track.album.external_urls.spotify,
                },
                duration: track.track.duration_ms,
                popularity: track.track.popularity,
                url: track.track.external_urls.spotify
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}

exports.getRecentlyPlayed = async (req, res) => {
    try{
        const { limit } = req.query;
        const access_token = req.headers.authorization;
        const recentlyPlayed = await spotifyServices.getRecentlyPlayed(access_token, limit);
        res.status(200).json(
            recentlyPlayed.data.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artists: track.track.artists.map(artist => {
                    return {
                        name: artist.name,
                        url: artist.external_urls.spotify
                    }
                }),
                album: {
                    name: track.track.album.name,
                    images: track.track.album.images,
                    url: track.track.album.external_urls.spotify,
                },
                duration_ms: track.track.duration_ms,
                popularity: track.track.popularity,
                url: track.track.external_urls.spotify,
                played_at: track.played_at
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}

exports.getMyPlaylists = async (req, res) => {
    try{
        const { limit, offset } = req.query;
        const access_token = req.headers.authorization;
        const myPlaylists = await spotifyServices.getMyPlaylists(access_token, limit, offset);
        res.status(200).json(
            myPlaylists.data.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
                images: playlist.images,
                url: playlist.external_urls.spotify
            }))
        );
    }catch(err){
        sendError(res,err);
    }
}
