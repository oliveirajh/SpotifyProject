const axios = require('axios');

const getHeaders = (access_token) => (
    {'Authorization': access_token}
)
  
//Interações com o Perfil do usuário

exports.getMyProfile = async (access_token) => {
    return await axios.get("https://api.spotify.com/v1/me", {
        headers: getHeaders(access_token)
    })
}

exports.getMyRecommendations = async (access_token, limit = 4, offset = 3) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    })

    const url = `https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3/playlists?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getMyTopArtists = async (access_token, limit = 5, offset = 0) => {
    //Construi um objeto URLSearchParams para adicionar os parâmetros limit e pega os valores default caso nenhum parametro seja passado
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    });
    
    const url = `https://api.spotify.com/v1/me/top/artists?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getMyTopTracks = async (access_token, limit = 5, offset = 0) => {
    //Construi um objeto URLSearchParams para adicionar os parâmetros limit e pega os valores default caso nenhum parametro seja passado
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    });

    const url = `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getSavedTracks = async(access_token, limit = 5, offset = 0) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    })

    const url = `https://api.spotify.com/v1/me/tracks?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getRecentlyPlayed = async(access_token, limit = 5) => {
    const params = new URLSearchParams({
        limit: limit.toString()
    })

    const url = `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getRecentlyPlayed = async(access_token, limit = 5) => {
    const params = new URLSearchParams({
        limit: limit.toString()
    })

    const url = `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getMyPlaylists = async(access_token, limit = 5, offset = 0) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    })

    const url = `https://api.spotify.com/v1/me/playlists?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}


//Interações com o Player

exports.getCurrentTrackPlaying = async(access_token) => {
    return await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: getHeaders(access_token)
    })
}

exports.playAlbum = async(access_token, album_id) => {
    return await axios.put(`https://api.spotify.com/v1/me/player/play`, { 
        context_uri: `spotify:album:${album_id}`,
        offset: { position: 0 } 
    }, {
        headers: getHeaders(access_token)
    })
}

exports.playTrack = async(access_token, track_id) => {
    return await axios.put(`https://api.spotify.com/v1/me/player/play`, {
        uris: [`spotify:track:${track_id}`]
    }, {
        headers: getHeaders(access_token)
    })
}

//Search

exports.search = async (access_token, type, name, limit = 30) => {
    limit = type === 'track' ? 20 : type === 'artist' ? 5 : type === 'album' ? 5 : limit;
    const params = new URLSearchParams({
        q: name,
        type: type,
        limit: limit.toString()
    })
    
    const url = `https://api.spotify.com/v1/search?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

//Interações com os Artistas

exports.getArtist = async (access_token, id) => {
    return await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: getHeaders(access_token)
    })
}

exports.getArtistAlbums = async (access_token, id, limit = 5, offset = 0) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    })

    const url = `https://api.spotify.com/v1/artists/${id}/albums?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getArtistTopTracks = async (access_token, id) => {
    return await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
        headers: getHeaders(access_token)
    })
}

//Interações com os Albuns

exports.getAlbum = async (access_token, id) => {
    return await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: getHeaders(access_token)
    })
}